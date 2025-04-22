import { auth } from '@/lib/firebase'
import { Globe, Home, Link2, LogOut, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Logo } from './logo'

export function Header() {
  const { pathname } = useLocation()

  async function handleLogout() {
    localStorage.removeItem('@havelink')

    await auth.signOut()

    toast.success('Logout realizado com sucesso', {
      description: 'Você será redirecionado para a página de login',
    })
  }

  return (
    <header className="flex items-center gap-4 w-full">
      <Logo size="sm" sizeIcon="sm" />

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center justify-between flex-1 ml-auto">
        {/* Versão para Mobile */}
        <div className="md:hidden flex items-center justify-end w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <div className="flex flex-col gap-3 flex-1 min-h-full pt-4">
                <Logo size="md" sizeIcon="md" />

                <Link
                  to="/"
                  className={`text-muted-foreground ${pathname === '/' && 'text-primary'} hover:text-primary transition flex items-center gap-2 mt-8`}
                >
                  <Home className="size-4" />
                  Home
                </Link>

                <Separator className="bg-muted-foreground/10" />

                <Link
                  to="/admin"
                  className={`text-muted-foreground ${pathname === '/admin' && 'text-primary'} hover:text-primary transition flex items-center gap-2`}
                >
                  <Link2 className="size-4" />
                  Links
                </Link>

                <Separator className="bg-muted-foreground/10" />

                <Link
                  to="/admin/social"
                  className={`text-muted-foreground ${pathname === '/admin/social' && 'text-primary'} hover:text-primary transition flex items-center gap-2`}
                >
                  <Globe className="size-4" />
                  Redes Sociais
                </Link>

                <Button
                  variant="default"
                  className="flex cursor-pointer rounded hover:bg-transparent hover:text-primary mt-auto"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Sair da Conta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Versão para Desktop */}
        <div className="hidden md:flex md:items-center text-sm gap-3.5">
          <Link
            to="/"
            className={`text-muted-foreground ${pathname === '/' && 'text-primary'} hover:text-primary transition`}
          >
            Home
          </Link>
          <Link
            to="/admin"
            className={`text-muted-foreground ${pathname === '/admin' && 'text-primary'} hover:text-primary transition`}
          >
            Links
          </Link>
          <Link
            to="/admin/social"
            className={`text-muted-foreground ${pathname === '/admin/social' && 'text-primary'} hover:text-primary transition`}
          >
            Redes Sociais
          </Link>
        </div>

        <Button
          variant="ghost"
          className="hidden md:flex cursor-pointer rounded hover:bg-transparent hover:text-primary"
          onClick={handleLogout}
        >
          <LogOut />
        </Button>
      </div>
    </header>
  )
}
