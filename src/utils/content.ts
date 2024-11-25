import mime from 'mime-types';
import queryString, { StringifyOptions } from 'query-string';

export function urlQueryString(object: Record<string, any>, options?: StringifyOptions) {
  return queryString.stringify(object, options);
}

export function currency(amount: string | number | undefined): string {
  const value = parseFloat(String(amount)).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return value;
}

export const truncateText = (text: string, length = 180, ending = '...') => {
  if (text.length > length) {
    return (
      text
        .substring(0, length - ending.length)
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .replace(/ +(?= )/g, '') + ending
    );
  }
  return text;
};

export const truncateHtmlText = (text: string, length = 180, ending = '...') => {
  if (text.length > length) {
    return (
      text
        .substring(0, length - ending.length)
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .replace(/ +(?= )/g, '') + ending
    );
  }
  return text;
};

export const formatMobile = (phoneNumber?: string) => {
  if (phoneNumber) {
    const cleaned = `${phoneNumber}`.replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
  }
  return null;
};

export function convertBase64ToImageUrl(base64String: string): string {
  const byteCharacters = window.atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  let image = new Blob([byteArray], { type: 'image/jpeg' });
  let imageUrl = URL.createObjectURL(image);

  return imageUrl;
}

export const uuid = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
  );
};

export const isImageLink = (url?: string) => {
  if (typeof url !== 'string') return false;
  return url.match(/^http[^\\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null;
};

export const isVideoLink = (url?: string) => {
  if (typeof url !== 'string') return false;
  return (
    url.match(
      /^http[^\\?]*.(webm|mpg|mp2|mpeg|mpe|mpv|ogg|mp4|m4p|m4v|api|wmv|mov|flv|swf)(\?(.*))?$/gim,
    ) != null
  );
};

export const isAudioLink = (url?: string) => {
  if (typeof url !== 'string') return false;
  return url.match(/^http[^\\?]*\.(mp3|wav|ogg|flac|aac|m4a|wma|aiff)(\?(.*))?$/gim) != null;
};

export const getExtensionFromUrl = (url?: string) => {
  if (!url) return undefined;
  const tokens = url.match(/(\.[a-zA-Z0-9]+(\?|\#|$))/g);
  if (!tokens || !tokens[0]) return undefined;
  return tokens[0].replace(/[^A-Za-z0-9\.]/g, '');
};

export const getMimeFromExt = (ext: string) => {
  return mime.lookup(ext);
};

export const getMimeExtFromUrl = (url?: string) => {
  if (!url) return undefined;

  const ext = getExtensionFromUrl(url);

  if (!ext) return undefined;

  return {
    ext,
    mimetype: getMimeFromExt(ext),
  };
};
