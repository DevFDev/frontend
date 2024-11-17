import Providers from '@/app/providers'
import '@/styles/globals.css'

import { Modal } from '@/components/common/popup'

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
      </head>
      <body>
        <Providers>
          {children}
          <div id={'portal-root'}></div>
          <Modal />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
