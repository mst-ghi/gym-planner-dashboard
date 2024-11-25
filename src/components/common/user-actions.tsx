import Link from 'next/link';
import { useApp, useThemeStyle } from '@/hooks';
import { useLogout } from '@/features/auth/hooks';
import { ChangePasswordForm } from '@/features/auth';
import { Avatar, Text, Menu, Flex, Card, Box } from '@mantine/core';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { IconChevronRight, IconLogout, IconSquareAsterisk, IconUser } from '@tabler/icons-react';

const UserActions = ({ collapsed }: { collapsed?: boolean }) => {
  const { user } = useApp();
  const { logout } = useLogout();
  const { isLightTheme } = useThemeStyle();

  const openChangePasswordDialog = () => {
    openModal({
      title: 'Change Password',
      children: (
        <ChangePasswordForm
          done={() => {
            closeAllModals();
          }}
        />
      ),
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Menu
      withArrow
      position={!collapsed ? 'left-end' : 'right-start'}
      trigger='hover'
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Box>
          {collapsed && (
            <Avatar
              src={user.profile?.avatar_url || '/avatar.webp'}
              radius='lg'
              styles={{
                root: {
                  border: '1px solid var(--mantine-color-gray-4)',
                },
              }}
            />
          )}

          {!collapsed && (
            <Card
              withBorder={false}
              bg={isLightTheme ? 'gray.2' : 'dark.8'}
              w='100%'
              px='xs'
              py={6}
              m={0}
              style={{ cursor: 'pointer', marginInline: '0px !important' }}
            >
              <Flex direction='row' align='center' justify='space-between' w='100%' gap='xs'>
                <Avatar
                  src={user.profile?.avatar_url || '/avatar.webp'}
                  radius='lg'
                  styles={{
                    root: {
                      border: '1px solid var(--mantine-color-gray-4)',
                    },
                  }}
                />

                <Flex direction='column' gap={6} flex={1}>
                  <Text size='xs' fw={600}>
                    {user.fullname}
                  </Text>
                  <Text size='xs' fw={500} fz={12}>
                    {user.mobile}
                  </Text>
                </Flex>

                <IconChevronRight size='0.9rem' stroke={1.5} />
              </Flex>
            </Card>
          )}
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconUser size={18} />}
          component={Link}
          href={`/dashboard/users/${user.id}`}
        >
          <Text size='xs'>Profile</Text>
        </Menu.Item>

        <Menu.Item
          leftSection={<IconSquareAsterisk size={18} />}
          onClick={openChangePasswordDialog}
        >
          <Text size='xs'>Change Password</Text>
        </Menu.Item>

        <Menu.Item
          color='red'
          leftSection={<IconLogout size={18} />}
          onClick={() => {
            openConfirmModal({
              title: 'Logout',
              children: 'Are you sure you want to logout?',
              onConfirm: () => logout(),
            });
          }}
        >
          <Text size='xs'>Logout</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserActions;
