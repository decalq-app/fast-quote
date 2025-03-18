'use client'

import { signOut } from 'firebase/auth'
import Logo from './components/Logo'
import ProfileDetails from './components/ProfileDetails'
import WorkGallery from './components/WorkGallery'
import { auth } from '@/app/firebase/config'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

export default function InkerProfile () {
  const router = useRouter()

  const handleLogOut = () => {
    signOut(auth)
    router.push('/')
    sessionStorage.removeItem('user')
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Logo />
      <Button onClick={() => handleLogOut()}>Sair</Button>
      <div className='px-6 mt-8'>
        <ProfileDetails />

        <div className='flex flex-col my-4 gap-y-2'>
          <Drawer>
            <DrawerTrigger>
              <Button className='w-full'>Orçamento rápido</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Orçamento rápido</DrawerTitle>
                <DrawerDescription>
                  Envie referencias e detalhes do seu projeto para que possamos
                  te ajudar.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button className='w-full' variant='outline'>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <Separator />

        <WorkGallery />
      </div>
    </div>
  )
}
