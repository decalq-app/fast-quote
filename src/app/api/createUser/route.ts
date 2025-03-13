import { NextResponse } from 'next/server';
import db from '@/app/firebase/firestore/config';
import { addDoc, collection } from '@firebase/firestore';

interface CreateUserBody {
  uid: string;
  email: string;
  displayName: string;
  nickname: string;
}

export async function POST(request: Request) {
  const { uid, email, displayName, nickname } = (await request.json()) as CreateUserBody;

  try {
    await addDoc(collection(db, 'users'), {
      uid,
      email,
      displayName,
      nickname,
      createdAt: new Date().toISOString(),
    })
    return NextResponse.json({ message: 'Usuário salvo com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return NextResponse.json({ error: 'Erro ao salvar usuário.', raw: error }, { status: 500 });
  }
}
