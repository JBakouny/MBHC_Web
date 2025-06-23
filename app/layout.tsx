import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Maria Badari Haute Couture - Luxury Wedding & Evening Dress Rentals',
  description: 'Discover exquisite haute couture wedding and evening dresses for rent. Maria Badari offers luxury fashion rentals with personalized service and custom designs.',
  keywords: 'haute couture, wedding dress rental, evening gown rental, luxury fashion, custom dresses, Maria Badari',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}