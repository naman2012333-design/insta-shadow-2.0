
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { InstaMockDataProvider } from '@/hooks/use-instamock-data';

export const metadata: Metadata = {
  title: 'InstaMock',
  description: 'A mock Instagram profile page built with Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <InstaMockDataProvider>
          <div className="bg-background flex justify-center">
            <div className="w-full max-w-sm min-h-screen bg-background text-foreground flex flex-col">
              {children}
            </div>
          </div>
          <Toaster />
        </InstaMockDataProvider>
      </body>
    </html>
  );
}
