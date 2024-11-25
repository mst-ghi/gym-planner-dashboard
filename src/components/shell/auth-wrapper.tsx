import { BoxProps, Box } from '@mantine/core';

interface AuthWrapperProps extends BoxProps {
  children?: React.ReactElement;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <Box
      style={{
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
};

export default AuthWrapper;
