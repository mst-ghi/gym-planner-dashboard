import { Envs } from '@/utils';
import dynamic from 'next/dynamic';

const AppProvider = dynamic(() => import('@/components/app-provider'), { ssr: false });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>Loading...</title>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='description' content={Envs.app.desc} />
        <link rel='icon' href='/favicon.ico' />
      </head>

      <body suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
