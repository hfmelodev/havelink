import { Header } from '@/components/app/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { firebase } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Link, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

interface NetworksProps {
  instagram: string
  github: string
  linkedin: string
}

export function Networks() {
  const [instagram, setInstagram] = useState<string>('')
  const [github, setGithub] = useState<string>('')
  const [linkedin, setLinkedin] = useState<string>('')

  async function handleCreateNetworks(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (instagram === '' || github === '' || linkedin === '') {
      toast.error('Preencha todos os campos', {
        description: 'Os campos identificador e URL são obrigatórios',
      })

      return
    }

    try {
      await setDoc(doc(firebase, 'networks', 'links'), {
        instagram,
        github,
        linkedin,
        createdAt: new Date(),
      })

      toast.success('Criação realizada com sucesso', {
        description: 'As redes sociais foram adicionadas a sua lista',
      })
    } catch (err) {
      console.log(err)

      toast.error('Erro ao criar redes sociais', {
        description: 'Tente novamente mais tarde',
      })
    }
  }

  useEffect(() => {
    async function fetchNetworks() {
      const docRef = doc(firebase, 'networks', 'links')
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data() as NetworksProps

        setInstagram(data.instagram)
        setGithub(data.github)
        setLinkedin(data.linkedin)
      }
    }

    fetchNetworks()
  }, [])

  return (
    <>
      <Helmet title="Social" />

      <div className="flex flex-col w-full">
        <Header />

        <form
          onSubmit={handleCreateNetworks}
          className="mt-8 space-y-5 flex-1 w-full"
        >
          <div className="space-y-1">
            <Label htmlFor="instagram-link">URL do Instagram</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                id="instagram-link"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                type="url"
                placeholder="Insira a URL do seu Instagram"
                className="peer pl-10 w-full rounded text-sm focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="github-link">URL do GitHub</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                id="github-link"
                value={github}
                type="url"
                onChange={e => setGithub(e.target.value)}
                placeholder="Insira a URL do seu GitHub"
                className="peer pl-10 w-full rounded text-sm focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="linkedin-link">URL do LinkedIn</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                id="linkedin-link"
                value={linkedin}
                type="url"
                onChange={e => setLinkedin(e.target.value)}
                placeholder="Insira a URL do seu LinkedIn"
                className="peer pl-10 w-full rounded text-sm focus-visible:ring-1 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div className="my-4" />

          <Button
            type="submit"
            className="w-full mt-4 rounded cursor-pointer font-bold"
          >
            <Save className="h-4 w-4" />
            Salvar
          </Button>
        </form>
      </div>
    </>
  )
}
