import jwt from 'jsonwebtoken'
//이 부부분을 따로 분리새 관리해야할 듯... zustand로 저장해서 ?
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    //임시로 500 에러로 반환
    return res.status(500).json({ message: 'Unauthorized', accessToken: null, refreshToken: null });
  }

  return res.status(200).json({ accessToken, refreshToken });
}

function decodeJWT(accessToken: Token) {
        return jwt.decode(accessToken) as {exp: number}
}

export async function requestNewToken(refreshToken: Token, accessToken:Token) {
    const response = await fetch('/v1/auth/new-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, accessToken }),
    })
    if(!response.ok){
        throw new Error('토큰 갱신 실패')
    }
}

export function setTokenTimeout(accessToken: Token, refreshToken:Token){
    const decodedToken = decodeJWT(accessToken)
    if(!decodeJWT) return
    
    const expirationTime = decodedToken.exp * 1000
    const bufferTime = 5 * 60 * 1000 
    const timeToRefresh = expirationTime -Date.now() - bufferTime

    if(timeToRefresh > 0){
        setTimeout(()=>{
            requestNewToken(accessToken, refreshToken)
        }, timeToRefresh)
    }

}