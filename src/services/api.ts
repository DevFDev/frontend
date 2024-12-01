import ky from 'ky'

//Backend API 인스턴스 (백엔드 api)

export const backendApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const proxyApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
