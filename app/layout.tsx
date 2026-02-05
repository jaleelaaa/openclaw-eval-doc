import './global.css';
import type { Viewport } from 'next';
import { baseUrl, createMetadata } from '@/lib/metadata';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

export const metadata = createMetadata({
  title: {
    template: '%s | OpenClaw Docs',
    default: 'OpenClaw Docs',
  },
  description: 'Self-hosted AI Agent Gateway - Connect your AI agents to messaging platforms',
  metadataBase: baseUrl,
});

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const mono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
