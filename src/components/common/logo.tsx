'use client';

import { Avatar, MantineSize } from '@mantine/core';
import Link from 'next/link';

const Logo = ({
  alt = 'Logo',
  size = 'lg',
  className,
}: {
  alt?: string;
  size?: MantineSize;
  className?: string;
}) => {
  return (
    <Link href='/' className={className}>
      <Avatar src='/logo.webp' alt={alt} radius='lg' size={size} />
    </Link>
  );
};

export default Logo;
