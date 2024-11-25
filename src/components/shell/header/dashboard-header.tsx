import { UserActions } from '@/components/common';
import classes from './dashboard-header.module.css';
import { ActionIcon, Box, Group } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';

const DashboardHeader = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <Box px='sm' py='sm' className={classes.header}>
      <Group grow>
        <ActionIcon color='dark' radius='lg' size={40} onClick={handleOpen}>
          <IconMenu2 />
        </ActionIcon>
      </Group>

      <Group>
        <UserActions collapsed />
      </Group>
    </Box>
  );
};

export default DashboardHeader;
