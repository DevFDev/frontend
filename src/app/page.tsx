'use client'

import { useSignOutMutation } from 'queries/useSignOut'

export default function Home(): JSX.Element {
  const mutation = useSignOutMutation()

  const handleLogout = async () => {
    mutation.mutate()
  }

  return (
    <>
      <div>홈페이지</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  )
}
