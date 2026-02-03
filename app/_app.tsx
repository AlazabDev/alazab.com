// app/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import './globals.css'

// مكون لتتبع تحركات الصفحة
function PageViewTracker() {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('config', 'G-ZT0ZEEBV8G', {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google Analytics Script */}
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
            gtag('config', 'G-ZT0ZEEBV8G', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* تتبع تغيير الصفحات */}
      <PageViewTracker />

      {/* المحتوى الرئيسي */}
      <Component {...pageProps} />
    </>
  )
}
