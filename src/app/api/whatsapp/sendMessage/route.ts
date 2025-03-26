import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const whatsappToken = process.env.NEXT_PRIVATE_WHATSAPP_TOKEN;
    const whatsappPhoneId = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_ID;

    console.log('whatsappToken:', whatsappToken);
    console.log('whatsappPhoneId:', whatsappPhoneId);

    if (!whatsappToken || !whatsappPhoneId) {
      return NextResponse.json(
        { error: 'Credenciais do WhatsApp não configuradas.' },
        { status: 500 }
      );
    }

    const url = `https://graph.facebook.com/v22.0/${whatsappPhoneId}/messages`;

    const whatsappResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await whatsappResponse.json();

    if (!whatsappResponse.ok) {
      return NextResponse.json(
        { error: 'Erro ao enviar mensagem', whatsappResponse: data },
        { status: whatsappResponse.status }
      );
    }

    return NextResponse.json({ success: true, whatsappResponse: data });
  } catch (error) {
    console.error('Erro interno ao enviar mensagem via WhatsApp:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
