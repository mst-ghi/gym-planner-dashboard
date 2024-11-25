import { Flex, FlexProps } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { Envs } from '@/utils';

const EmptyPage = ({
  title,
  children,
  ...props
}: { title?: string; children?: React.ReactNode } & FlexProps) => {
  useDocumentTitle(title ? `${title} - ${Envs.app.name}` : Envs.app.name);

  return (
    <Flex h='100vh' direction='column' {...props}>
      {children}
    </Flex>
  );
};

export default EmptyPage;
