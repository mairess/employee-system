/* eslint-disable max-len */

'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';
import store from '../store';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  return (
    <html lang="en">

      <body className={ inter.className }>
        <Provider store={ store }>
          {pathName.includes('dashboard') && <Header />}
          {children}
        </Provider>
      </body>

    </html>
  );
}
