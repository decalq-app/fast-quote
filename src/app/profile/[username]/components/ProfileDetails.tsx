import { CheckCircle, MapPin } from 'lucide-react'
import { collection, query, where, type DocumentData } from '@firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useParams } from 'next/navigation'
import React from 'react'
import db from '@/app/firebase/firestore/config'
import ProfilePicture from './ProfilePicture'

export default function ProfileDetails () {
  const { username } = useParams()

  const q = query(collection(db, 'users'), where('username', '==', username))
  const [users, loading, error] = useCollectionData<DocumentData>(q)

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>
  if (!users || users.length === 0) return <div>Usuário não encontrado.</div>

  const user = users[0]

  return (
    <div className='flex flex-col items-start'>
      <ProfilePicture src={user.photoURL} alt='Profile picture' />
      <div className='mt-4 flex items-center gap-2'>
        <h2 className='text-2xl font-medium'>{ user.displayName }</h2>
        <CheckCircle className='h-4 w-4 text-white' />
      </div>
      <div className='mt-1 flex items-center text-gray-400'>
        <MapPin className='h-4 w-4 mr-1' />
        <span className='text-md'>Centro, Curitiba-PR</span>
      </div>
      <p className='mt-2 text-sm text-gray-300'>
        Se você está procurando por uma tatuagem autêntica e com estilo, venha
        visitar meu estúdio e vamos criar algo único e especial para você.
      </p>
    </div>
  )
}
