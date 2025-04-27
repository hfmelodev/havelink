import { Social } from '@/components/app/social'
import { Button } from '@/components/ui/button'
import { firebase } from '@/lib/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import {
  ExternalLink,
  Github,
  Instagram,
  Link as LinkIcon,
  Linkedin,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { toast } from 'sonner'

interface LinkProps {
  id: string
  name: string
  url: string
  backgroundColor: string
  textColor: string
}

interface NetworksProps {
  instagram: string
  github: string
  linkedin: string
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [networks, setNetworks] = useState<NetworksProps>({} as NetworksProps)

  useEffect(() => {
    async function fetchData() {
      try {
        const linksRef = collection(firebase, 'links')
        const queryRef = query(linksRef, orderBy('createdAt', 'desc'))
        const linksPromise = getDocs(queryRef)

        const networksDocRef = doc(firebase, 'networks', 'links')
        const networksPromise = getDoc(networksDocRef)

        const [linksSnapshot, networksSnapshot] = await Promise.all([
          linksPromise,
          networksPromise,
        ])

        // Processar links
        const linksData: LinkProps[] = linksSnapshot.docs.map(doc => {
          const docData = doc.data() as Omit<LinkProps, 'id'>

          return {
            id: doc.id,
            name: docData.name,
            url: docData.url,
            backgroundColor: docData.backgroundColor,
            textColor: docData.textColor,
          }
        })
        setLinks(linksData)

        // Processar networks
        if (networksSnapshot.exists()) {
          const networksData = networksSnapshot.data() as NetworksProps
          setNetworks(networksData)
        }
      } catch (err) {
        console.error(err)

        toast.error('Erro ao buscar dados', {
          description: 'Tente novamente mais tarde',
        })
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Helmet title="Home" />

      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md mx-auto space-y-8 relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/50 rounded-full blur-3xl" />

          {/* Hero section */}
          <div className="text-center space-y-4 relative z-10">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center shadow-xl">
              <img
                src="https://github.com/hfmelodev.png"
                className="text-3xl font-bold rounded-full border-4 border-primary/20 object-cover"
                alt="Hilquias Ferreira Melo"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-calSans bg-clip-text text-neutral-300">
              Hilquias Ferreira Melo
            </h1>
            <p className="text-neutral-400 font-calSans flex items-center justify-center gap-2 text-lg">
              Veja meus links <span className="animate-bounce">👇</span>
            </p>
          </div>

          {/* Links section */}
          <div className="flex flex-col gap-2">
            {links.length > 0 ? (
              links.map(link => (
                <Link key={link.id} to={link.url} target="_blank">
                  <Button
                    style={{
                      backgroundColor: link.backgroundColor,
                      color: link.textColor,
                    }}
                    className="w-full font-medium py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl flex items-center gap-2"
                  >
                    <LinkIcon className="size-5" />
                    {link.name}
                    <ExternalLink className="size-4 ml-auto text-white" />
                  </Button>
                </Link>
              ))
            ) : (
              <p className="w-full bg-muted-foreground/10 text-muted-foreground font-medium  px-4 py-3 rounded-xl shadow-lg transition-all text-center">
                Nenhum link cadastrado ainda{' '}
              </p>
            )}
          </div>

          {/* Social media icons */}
          <div className="flex justify-center gap-6 pt-6 relative z-10">
            <Social link={networks.instagram} icon={Instagram} />

            <Social link={networks.github} icon={Github} />

            <Social link={networks.linkedin} icon={Linkedin} />
          </div>
        </div>
      </div>
    </>
  )
}
