'use client'

import { refreshAuth } from '@/services/auth/auth'

export default function protectedPage(): JSX.Element {
  return (
    <>
      <div>
        인증되어야만 접근 가능한 페이지
        <button
          onClick={() => {
            refreshAuth(
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxOkJCT0dHTyIsImlzcyI6IkRldkZEZXYiLCJpYXQiOjE3MzUwMDQ4NDIsImV4cCI6MTczNTAwNjY0Mn0.rMGaisPexkak1uVFwe3xETaf8__1Pa_TQ2NFNWGsd1bEWHHBYaIg0RXeLnvn53T0cD6TLu91Jg-MyRjkHGllWQ',
              'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJEZXZGRGV2IiwiaWF0IjoxNzM1MDA0MDU3LCJleHAiOjE3MzYyMTM2NTd9.1DXw4D4ioimDCcaMEUiGyl1bNX3Q8LzEXWD36M5LqOWFDXxP8iH_HaIPGNFngmNwiwIap1Vwq2danMPuidesQw'
            )
          }}
        >
          토큰 갱신
        </button>
      </div>
    </>
  )
}
