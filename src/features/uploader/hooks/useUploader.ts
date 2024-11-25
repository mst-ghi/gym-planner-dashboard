import axios, { Canceler } from 'axios';
import { useRequest } from '@/hooks';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

export type MediaUploaderStatusProps = 'idle' | 'uploading' | 'done' | 'error';
const AxiosCancelToken = axios.CancelToken;

interface UseUploaderProps {
  file?: IFile;
  onUpload?: (media: IMedia) => void;
  onDelete?: (media?: IMedia) => void;
}

const useUploader = ({ file, onUpload, onDelete }: UseUploaderProps) => {
  const { apiUrl, getAuthHeaders, callRequest } = useRequest();

  const [state, setState] = useSetState<{
    media?: IMedia;
    progress?: number;
    isCancellable?: boolean;
    cancelToken?: Canceler;
    status?: 'idle' | 'uploading' | 'done' | 'error';
  }>({ status: 'idle' });

  const uploadMedia = async () => {
    if (!state.media?.id && file?.value && !file.url) {
      try {
        if (state.status !== 'uploading') {
          const fileForm = new FormData();
          fileForm.append('file', file.value);

          const updateUploadProgress = (percentage: number) => {
            setState({ status: 'uploading', progress: percentage });
          };

          const response = await axios.post(apiUrl + '/api/v1/uploader', fileForm, {
            timeout: 0,
            headers: {
              'Content-Type': 'multipart/form-data',
              'cache-control': 'no-cache',
              ...getAuthHeaders(),
            },

            cancelToken: new AxiosCancelToken(function executor(c) {
              setState({ cancelToken: c, isCancellable: true });
            }),

            onUploadProgress(progressEvent) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!,
              );
              updateUploadProgress(percentCompleted);
            },
          });

          setState({ media: response.data.media, status: 'done' });

          if (onUpload) {
            onUpload(response.data.media);
          }
        }
      } catch (error) {
        setState({ status: 'error', progress: 0 });
      }
    }
  };

  const deleteMedia = async () => {
    const url = file?.url || state.media?.url;
    if (url) {
      try {
        await callRequest('DELETE', `/api/v1/uploader`, { body: { url } });

        if (onDelete) {
          onDelete(state.media);
        }

        setState({ media: undefined, status: 'idle' });
      } catch (error) {
        showNotification({
          color: 'red',
          title: 'Delete media/file',
          message: 'File/media deletion encountered an error',
        });
      }
    }
  };

  return {
    url: state.media?.url || (file?.value ? URL.createObjectURL(file.value) : file?.url || ''),
    state,
    uploadMedia,
    deleteMedia,
  };
};

export default useUploader;
