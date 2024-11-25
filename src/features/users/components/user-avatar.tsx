import { UserKindDic } from '@/utils/dictionary';
import { Avatar, AvatarProps, Badge, Box } from '@mantine/core';

export interface UserAvatarProps extends AvatarProps {
  src?: string;
  kind?: TUserKind;
}

const UserAvatar = ({ src, kind, ...props }: UserAvatarProps) => {
  return (
    <Box pos='relative'>
      <Avatar
        size={84}
        src={src || '/avatar.webp'}
        style={{ border: '2px solid orange' }}
        {...props}
      />

      {kind && (
        <Badge variant='dot' w='100%' size='xs' pos='absolute' bottom={-8}>
          {UserKindDic[kind]}
        </Badge>
      )}
    </Box>
  );
};

export default UserAvatar;
