import { Center } from '@mantine/core';
import ImageStates, { ImageStatesProps } from './image-states';

const ResultState = ({
  action,
  visible = false,
  name = 'emptyBox1',
  ...props
}: ImageStatesProps & { visible?: boolean; action?: React.ReactElement }) => {
  if (!visible) {
    return null;
  }

  return (
    <Center w='95%' mih='60%' style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <ImageStates name={name} {...props} />
      {action}
    </Center>
  );
};

export default ResultState;
