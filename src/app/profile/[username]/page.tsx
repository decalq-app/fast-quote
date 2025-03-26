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
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useState } from 'react'

const formSchema = z.object({
  // references: z.custom<File>(value => value instanceof File, {
  //   message: 'Selecione um arquivo válido'
  // }),
  partOfBody: z.string().min(1, 'Este campo é obrigatório'),
  size: z.coerce.number().min(0, 'Este campo é obrigatório'),
  type: z.enum(['normal', 'cobertura', 'retoque', 'reforma']),
  idea: z.string().min(1, 'Este campo é obrigatório')
})

export default function InkerProfile () {
  const router = useRouter()
  const [drawer, setDrawer] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partOfBody: '',
      size: 0,
      type: 'normal',
      idea: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    toast('Orçamento enviado com sucesso! Aguarde o contato do artista.')
    setDrawer(false)
    console.log(values)

    const payload = {
      messaging_product: 'whatsapp',
      to: '5541988548012',
      type: 'template',
      template: {
        name: 'orcamento_rapido',
        language: { code: 'pt_BR' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', parameter_name: 'part_of_body', text: values.partOfBody },
              { type: 'text', parameter_name: 'size', text: values.size },
              { type: 'text', parameter_name: 'type', text: values.type },
              { type: 'text', parameter_name: 'idea', text: values.idea },
            ]
          }
        ]
      }
    }
    try {
      const res = await fetch('/api/whatsapp/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        toast(`Erro: ${data.error}`)
      } else {
        toast('Orçamento enviado com sucesso! Aguarde o contato do artista.')
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast('Erro ao enviar mensagem')
    }
  }

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
          <Drawer open={drawer} onClose={() => setDrawer(false)}>
            <DrawerTrigger asChild>
              <Button className='w-full' onClick={() => setDrawer(true)}>
                Orçamento rápido
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <DrawerHeader>
                  <DrawerTitle>Orçamento rápido</DrawerTitle>
                  <DrawerDescription>
                    Envie referencias e detalhes do seu projeto para que
                    possamos te ajudar.
                  </DrawerDescription>
                </DrawerHeader>
                <div className='px-4 flex flex-col gap-y-4'>
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name='partOfBody'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parte do corpo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='size'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Tamanho da tatuagem (em centímetros)
                          </FormLabel>
                          <FormControl>
                            <Input type='number' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='type'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo da tatuagem</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Tipo da tatuagem' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='normal'>Normal</SelectItem>
                              <SelectItem value='cobertura'>
                                Cobertura
                              </SelectItem>
                              <SelectItem value='retoque'>Retoque</SelectItem>
                              <SelectItem value='reforma'>Reforma</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='idea'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descreva sua ideia</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='Conte mais sobre sua ideia'
                              className='resize-none'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                </div>
                <DrawerFooter>
                  <Button type='submit'>Submit</Button>
                  <DrawerClose asChild>
                    <Button className='w-full' variant='outline'>
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </div>

        <Separator />

        <WorkGallery />
      </div>
    </div>
  )
}
