import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SafeRoute Cycle Planner - AI-powered bike route optimization',
  description: 'Value Proposition: Helps cyclists plan routes that prioritize safety, scenic beauty, and enjoyment over directness, leveraging AI to analyze road conditions, traffic data, and user preferences, reducing stress and improving ride quality for a better cycling experience.

Target Customer: Urban and suburban cyclists, cycling clubs, bike tourism operators, local government initiatives promoting cycling.

---
Category: Micro-SaaS
Target Market: Urban and suburban cyclists, cycling clubs, bike tourism operators, local government initiatives promoting cycling.
Source Hypothesis ID: 6ef8c8ea-4494-4bfa-8dfb-e83d0cbe97b4
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">SafeRoute Cycle Planner - AI-powered bike route optimization</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
