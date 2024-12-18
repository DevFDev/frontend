import { proxyApi } from '../api'
import { tokenBufferTime, tokenExpiredTime } from '@/constants/auth'

export async function requestNewToken() {
  const response = await proxyApi.post('api/auth/refresh',{})
  if (response.ok){
    console.log('토큰 갱신 요청 성공')
    setTokenTimeout()
  } else {
    console.error('토큰 갱신 요청 실패')
  }
}

/* 서버에서 시간을 가져오는 것이 아니라 그냥 동작해서 1시간 재기 */
export function setTokenTimeout() {
  const timeToRefresh = tokenExpiredTime - tokenBufferTime

  if (timeToRefresh > 0) {
    setTimeout(() => {
      requestNewToken()
    }, timeToRefresh)
  }
}
