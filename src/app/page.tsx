'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home () {
  const [ user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    const userSession = sessionStorage.getItem('user')

    if (!user && !userSession) {
      return router.push('/login')
    } else {
      console.log(user);
      
      return router.push('/profile')
    }
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return <h1>Not logged</h1>
}
