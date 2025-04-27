import { Header } from '@/components/app/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { firebase } from '@/lib/firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { BadgePlus, Link, SquarePen, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

interface LinkProps {
  id: string
  name: string
  url: string
  backgroundColor: string
  textColor: string
}

export function Admin() {
  const [nameLink, setNameLink] = useState<string>('')
  const [urlLink, setUrlLink] = useState<string>('')
  const [linkBackground, setLinkBackground] = useState<string>('#E11D48')
  const [linkTextColor, setLinkTextColor] = useState<string>('#FFFFFF')

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const links = collection(firebase, 'links')
    const queryRef = query(links, orderBy('createdAt', 'desc')) // Ordenar por data de criação descrescente para exibir os links mais recentes primeiro

    const unsub = onSnapshot(queryRef, snapshot => {
      const data: LinkProps[] = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        backgroundColor: doc.data().backgroundColor,
        textColor: doc.data().textColor,
      }))

      setLinks(data)
    })

    return () => {
      unsub()
    }
  }, [])

  async function handleCreateLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (nameLink === '' || urlLink === '') {
      toast.error('Preencha todos os campos', {
        description: 'Os campos identificador e URL são obrigatórios',
      })

      return
    }

    try {
      await addDoc(collection(firebase, 'links'), {
        name: nameLink,
        url: urlLink,
        backgroundColor: linkBackground,
        textColor: linkTextColor,
        createdAt: new Date(),
      })

      setNameLink('')
      setUrlLink('')
      setLinkBackground('#E11D48')
      setLinkTextColor('#FFFFFF')

      toast.success('Criação realizada com sucesso', {
        description: 'Este link foi adicionado a sua lista de links',
      })
    } catch (err) {
      console.log(err)

      toast.error('Erro ao criar link', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  async function handleDeleteLink(id: string) {
    try {
      const link = doc(firebase, 'links', id)

      await deleteDoc(link)

      toast.success('Exclusão realizada com sucesso', {
        description: 'Este link foi removido da sua lista de links',
      })
    } catch (err) {
      console.log(err)

      toast.error('Erro ao excluir link', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  return (
    <>
      <Helmet title="Admin" />

      <div className="flex flex-col w-full">
        <Header />

        <form
          onSubmit={handleCreateLink}
          className="mt-8 space-y-10 flex-1 w-full"
        >
          <div className="space-y-1">
            <Label htmlFor="name-link">Identificador do link</Label>
            <div className="relative">
              <SquarePen className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                id="name-link"
                placeholder="Insira o identificador do link"
                className="peer pl-10 w-full rounded text-sm focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                value={nameLink}
                onChange={e => setNameLink(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="url-link">Insira a URL</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                id="url-link"
                type="url"
                placeholder="Insira a URL do link"
                className="peer pl-10 w-full rounded text-sm focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                value={urlLink}
                onChange={e => setUrlLink(e.target.value)}
              />
            </div>
          </div>

          <section className="my-4 flex items-center gap-10">
            <div className="flex items-center gap-2">
              <Label htmlFor="link-background">Cor do Fundo</Label>
              <input
                type="color"
                id="link-background"
                name="link-background"
                className="rounded"
                value={linkBackground}
                onChange={e => setLinkBackground(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="text-color">Cor do Texto</Label>
              <input
                type="color"
                id="text-color"
                name="text-color"
                className="rounded"
                value={linkTextColor}
                onChange={e => setLinkTextColor(e.target.value)}
              />
            </div>
          </section>

          {nameLink && (
            <div className="flex items-center justify-start flex-col mb-7 p-1 border border-primary/30 rounded w-full">
              <Label className="text-base font-medium mt-2 mb-3 flex items-center gap-2">
                Observe como está ficando{' '}
                <span className="animate-bounce">👇</span>
              </Label>

              <article
                className="w-11/12 flex items-center gap-2 p-3 mb-3 border border-transparent hover:border-neutral-600 transition rounded"
                style={{
                  backgroundColor: linkBackground,
                  color: linkTextColor,
                }}
              >
                <Link className="size-4" />
                <p className="text-sm">{nameLink}</p>
              </article>
            </div>
          )}

          <Button
            type="submit"
            className="w-full rounded cursor-pointer font-bold"
          >
            <BadgePlus className="h-4 w-4" />
            Criar
          </Button>
        </form>
      </div>

      <Separator orientation="horizontal" className="mt-10 mb-7" />

      <div className="flex items-center gap-2 justify-start flex-col px-1 w-full">
        <Label className="text-base font-medium mb-3 flex items-center gap-2">
          Meus Links <Link className="size-4" />
        </Label>

        {links.length > 0 ? (
          links.map(link => (
            <article
              key={link.id}
              className="w-full flex items-center justify-between py-1 px-2 hover:opacity-90 transition rounded select-none"
              style={{
                backgroundColor: link.backgroundColor,
                color: link.textColor,
              }}
            >
              <div className="flex items-center gap-1.5">
                <Link className="size-4" />
                <p className="text-sm">{link.name}</p>
              </div>

              <Button
                variant="ghost"
                type="button"
                className="rounded cursor-pointer font-bold px-3"
                onClick={() => handleDeleteLink(link.id)}
              >
                <Trash className="h-4 w-4 text-white" />
              </Button>
            </article>
          ))
        ) : (
          <div className="w-full flex items-center justify-center p-3 mb-3 border border-neutral-600 transition rounded">
            <p className="text-sm text-muted-foreground">
              Você ainda não possui nenhum criado
            </p>
          </div>
        )}
      </div>
    </>
  )
}
