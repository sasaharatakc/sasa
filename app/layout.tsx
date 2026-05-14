import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assam Immersive Tea Story',
  description: 'Scroll-driven cinematic Assam tea experience.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body className="grain vignette">{children}</body></html>;
}
