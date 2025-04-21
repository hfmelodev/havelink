import { Button } from '@/components/ui/button'
import {
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Instagram,
  Youtube,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

export function Home() {
  return (
    <>
      <Helmet title="Home" />

      <div className="mt-32">
        <div className="w-full max-w-md mx-auto space-y-8 relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/50 rounded-full blur-3xl" />

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
          <div className="space-y-4 relative z-10">
            <Link to="#" className="block">
              <Button
                size="lg"
                className="w-full bg-primary/70 text-primary-foreground font-medium py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl flex items-center gap-2"
              >
                <Youtube className="size-5" />
                Canal do YouTube
                <ExternalLink className="size-4 ml-auto" />
              </Button>
            </Link>

            <Link to="#" className="block">
              <Button
                size="lg"
                className="w-full bg-primary/70 text-primary-foreground font-medium py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl flex items-center gap-2"
              >
                <Github className="size-5" />
                Conta do GitHub
                <ExternalLink className="size-4 ml-auto" />
              </Button>
            </Link>

            <Link to="#" className="block">
              <Button
                size="lg"
                className="w-full bg-primary/70 text-primary-foreground font-medium py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl flex items-center gap-2"
              >
                <Globe className="size-5" />
                Meu WebSite
                <ExternalLink className="size-4 ml-auto" />
              </Button>
            </Link>
          </div>

          {/* Social media icons */}
          <div className="flex justify-center gap-6 pt-6 relative z-10">
            <Link to="#" className="group ">
              <div className="bg-muted p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:border group-hover:border-primary/50">
                <Facebook className="h-6 w-6 text-muted-foreground" />
              </div>
            </Link>

            <Link to="#" className="group">
              <div className="bg-muted p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:border group-hover:border-primary/50">
                <Youtube className="h-6 w-6 text-muted-foreground" />
              </div>
            </Link>

            <Link to="#" className="group">
              <div className="bg-muted p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:border group-hover:border-primary/50">
                <Instagram className="h-6 w-6 text-muted-foreground" />
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center text-sm flex flex-col">
            <span>© {new Date().getFullYear()} - Hilquias Ferreira Melo</span>
            <span className="text-muted-foreground">
              Todos os direitos reservados
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
