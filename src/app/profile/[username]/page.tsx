'use client'

import { signOut } from 'firebase/auth'
import ActionButton from './components/ActionButton'
import Logo from './components/Logo'
import ProfileDetails from './components/ProfileDetails'
import WorkGallery from './components/WorkGallery'
import { auth } from '@/app/firebase/config'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function InkerProfile () {
  const router = useRouter();
  
  const handleLogOut = () => {
    signOut(auth);
    router.push('/');
    sessionStorage.removeItem('user');
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Logo />
      <Button
        onClick={() => handleLogOut()}
      >
        Sair
      </Button>
      <div className='px-6 mt-8'>
        <ProfileDetails />

        <div className='mt-8 space-y-4'>
          <ActionButton
            variant='primary'
            label='Orçamento rápido'
            onClick={() => {}}
          />
          <ActionButton
            variant='secondary'
            label='Enviar mensagem'
            onClick={() => {}}
          />
        </div>

        <div className='mt-10 border-t border-gray-800'></div>

        <WorkGallery />
      </div>
    </div>
  )
}
