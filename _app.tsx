// pages/_app.tsx
import type { AppProps } from 'next/app'
import Script from 'next/script'
import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZT0ZEEBV8G"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZT0ZEEBV8G');
          `,
        }}
      />
      
      <Component {...pageProps} />
    </>
  )
}
