import { Badge, Text } from '@mantine/core';

type AllStatus =
  | 'free'
  | 'active'
  | 'suspended'
  | 'ready'
  | 'success'
  | 'failed'
  | 'created'
  | 'paying'
  | 'paid'
  | 'canceled'
  | 'expired'
  | 'reserved';

const Colors: Record<AllStatus, string> = {
  free: 'green',
  active: 'green',
  suspended: 'orange',
  ready: 'blue',
  success: 'green',
  failed: 'red',
  created: 'blue',
  paying: 'purple',
  paid: 'green',
  canceled: 'red',
  expired: 'red',
  reserved: 'gray',
};

interface StatusBadgeProps {
  status: AllStatus;
  label: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <Badge color={Colors[status]} radius='md' variant='light'>
      <Text size='xs' fw={600}>
        {label}
      </Text>
    </Badge>
  );
};

export default StatusBadge;
