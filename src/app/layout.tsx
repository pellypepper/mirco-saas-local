import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MainNavProvider } from '@/hooks/MainNavContext';
import ThemeIcon from '@/component/Theme';
import ReconnectHandler from '@/hooks/dashboard/dashboardReconnect';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Service Hub Saas',
  description: 'built by Pelly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <MainNavProvider>
          <ThemeIcon />
          <ReconnectHandler />
          {children}
        </MainNavProvider>
      </body>
    </html>
  );
}
