//이 부부분을 따로 분리새 관리해야할 듯... zustand로 저장해서 ?
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { proxyApi } from '../api'

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
  const bufferTime = 1 * 60 * 1000
  const timeToRefresh = 2 * 60 * 1000 - bufferTime

  if (timeToRefresh > 0) {
    setTimeout(() => {
      requestNewToken()
    }, timeToRefresh)
  }
}
