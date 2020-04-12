import React from 'react'
import Head from 'next/head'
import '../styles/index.css'

function MyApp ({ Component, pageProps }) {
  const config = {
    title: 'Typings App',
    description: 'Another typings testing app, must try!',
    icon: {
      fav: '/favicon.ico',
      32: '/favicon-32x32.png',
      16: '/favicon-16x16.png',
      appleTouch: '/apple-touch-icon.png'
    },
    url: 'https://typings.app',
    feature: '/assets/sceenshot.png'
  }

  return (
    <React.StrictMode>
      <Head>
        <title>{config.title}</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={config.icon.appleTouch}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={config.icon[32]}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={config.icon[16]}
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='apple-mobile-web-app-title' content={config.title} />
        <meta name='application-name' content={config.title} />
        <meta name='theme-color' content='#ffffff' />

        <meta name='title' content={config.title} />
        <meta name='description' content={config.description} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.url} />
        <meta property='og:title' content={config.title} />
        <meta property='og:description' content={config.description} />
        <meta
          property='og:image'
          content={config.url + 'assets/og-image.png'}
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={config.url} />
        <meta property='twitter:title' content={config.title} />
        <meta property='twitter:description' content={config.description} />
        <meta
          property='twitter:image'
          content={config.url + config.feature}
        />
      </Head>
      <main className='main'>
        <Component {...pageProps} />
      </main>
    </React.StrictMode>
  )
}

export default MyApp
