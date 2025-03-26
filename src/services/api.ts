import { backendUrl, proxiUrl } from '@/constants/api/baseUrl'
import ky from 'ky'

export const backendApi = ky.create({
  prefixUrl: backendUrl,
  headers: { 'Content-Type': 'application/json' },
})

export const proxyApi = ky.create({
  prefixUrl: proxiUrl,
  headers: { 'Content-Type': 'application/json' },
})
