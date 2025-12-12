import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import Footer from '@/components/layout/Footer';
import { getHeader, getFooter } from '@/lib/strapi';
import { getAllPages } from '@/lib/api/pages';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WeCredit - Quick Personal Loans',
  description: 'Get instant access to personal loans with WeCredit. Quick approval, minimal documentation, and competitive rates.',
};

/**
 * Root layout component that fetches header and footer from Strapi
 * Also fetches all pages for comprehensive navigation
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerData, footerData, allPages] = await Promise.all([
    getHeader(),
    getFooter(),
    getAllPages(),
  ]);

  // Convert full Page objects to PageBase for header (only need basic info)
  const pagesList = allPages.map(page => ({
    id: page.id,
    documentId: page.documentId,
    title: page.title,
    slug: page.slug,
    fullPath: page.fullPath,
    useCustomFullPath: page.useCustomFullPath,
    order: page.order,
    pageType: page.pageType,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    publishedAt: page.publishedAt,
  }));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <EnhancedHeader data={headerData} childPages={pagesList} />
        <main className="flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}

