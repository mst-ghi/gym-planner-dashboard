'use client';

import { useThemeStyle } from '@/hooks';
import { DashboardNavbar } from './navbar';
import { DashboardHeader } from './header';
import { useDisclosure } from '@mantine/hooks';
import { BoxProps, AppShell, Drawer } from '@mantine/core';

interface DashboardWrapperProps extends BoxProps {
  children?: React.ReactElement;
}

const DashboardDrawer = ({ opened, handleClose }: { opened: boolean; handleClose: () => void }) => {
  return (
    <Drawer opened={opened} onClose={handleClose} size='auto' withCloseButton={false} padding={0}>
      <DashboardNavbar />
    </Drawer>
  );
};

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  const [opened, handlers] = useDisclosure(false);
  const { isMobile, isDesktop, theme } = useThemeStyle();

  return (
    <AppShell
      style={{
        overflow: 'hidden',
        height: '100vh',
      }}
      styles={{
        main: {
          height: '100%',
          marginLeft: isDesktop ? 248 : undefined,
        },
      }}
    >
      {isMobile && (
        <AppShell.Header withBorder>
          <DashboardHeader handleOpen={handlers.open} />
        </AppShell.Header>
      )}

      {isDesktop ? (
        <AppShell.Navbar p='xs' pb={2} withBorder={false}>
          <DashboardNavbar />
        </AppShell.Navbar>
      ) : (
        <DashboardDrawer opened={opened} handleClose={handlers.close} />
      )}

      <AppShell.Main p='md' pb='sm' mt={isMobile ? '64px' : undefined}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardWrapper;
