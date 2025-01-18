import Providers from '@/app/providers'
import '@/styles/globals.css'
import '@/styles/tiptap.css'

import { Modal } from '@/components/common/popup'
import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element => {
  return (
    <html lang='ko'>
      <head>
        <link
          rel='stylesheet'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          as='style'
          href='https://fonts.cdnfonts.com/css/jetbrains-mono'
          crossOrigin='anonymous'
        />
      </head>
      <body>
        <Providers>
          <Header isAuthenticated={false} />
          {children}
          <Footer />
          <div id={'portal-root'}></div>
          <Modal />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
