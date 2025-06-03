// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://baranwalektasanstha.vercel.app'),
  title: {
    default: 'Baranwal Ekta Sanstha Mumbai - Baranwal Samaj Community',
    template: '%s | Baranwal Ekta Sanstha Mumbai'
  },
  description: 'Baranwal Ekta Sanstha Mumbai - Official website of Baranwal Samaj community. Connect with Baranwal families, events, matrimony, dharmshalas and community services in Mumbai.',
  keywords: [
    'baranwal',
    'baranwal samaj',
    'baranwal ekta',
    'baranwal ekta sanstha',
    'ahibaran',
    'baranwal mumbai',
    'baranwal ekta sanstha mumbai',
    'baranwal community',
    'baranwal matrimony',
    'baranwal events',
    'baranwal committee',
    'baranwal dharmshalas',
    'ahibaran samaj',
    'baranwal families mumbai'
  ],
  authors: [{ name: 'Baranwal Ekta Sanstha Mumbai' }],
  creator: 'Baranwal Ekta Sanstha Mumbai',
  publisher: 'Baranwal Ekta Sanstha Mumbai',
  alternates: {
    canonical: 'https://baranwalektasanstha.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://baranwalektasanstha.vercel.app',
    title: 'Baranwal Ekta Sanstha Mumbai',
    description: 'Official website of Baranwal Ekta Sanstha Mumbai. Connect with Baranwal Samaj community, events, matrimony, and services.',
    siteName: 'Baranwal Ekta Sanstha Mumbai',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Baranwal Ekta Sanstha Mumbai',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'iIkfbcToicPYglLptdhQY6FxXDsztkdst6IzutJACyQ',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Baranwal Ekta Sanstha Mumbai",
              "alternateName": ["Ahibaran Baranwal Samaj", "Baranwal Samaj Mumbai"],
              "url": "https://baranwalektasanstha.vercel.app",
              "description": "Baranwal Ekta Sanstha Mumbai is a community organization serving Ahibaran Baranwal families in Mumbai with events, matrimony services, and community support.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.facebook.com/groups/baranwalworld",
                "https://www.facebook.com/groups/538964769621797",
                "https://www.facebook.com/groups/183478278438669",
                "https://www.youtube.com/@बरनबंधु"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}