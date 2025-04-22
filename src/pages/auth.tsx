import { Logo } from '@/components/app/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth } from '@/lib/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Lock, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export function Auth() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      if (email === '' || password === '') {
        toast.error('Preencha todos os campos', {
          description: 'Os campos e-mail e senha são obrigatórios',
        })

        return
      }

      await signInWithEmailAndPassword(auth, email, password)

      toast.success('Login realizado com sucesso', {
        description: 'Você será redirecionado para a página inicial',
      })

      navigate('/admin', { replace: true })
    } catch (err) {
      console.log(err)

      if (err instanceof FirebaseError) {
        if (err.code === 'auth/invalid-credential') {
          toast.error('Usuário não encontrado', {
            description: 'Verifique suas credenciais e tente novamente',
          })
        }
      }
    }
  }
  return (
    <>
      <Helmet title="Login" />

      <div className="min-h-[80vh] flex items-center justify-center w-full py-4">
        <div className="w-full flex flex-col items-center relative">
          <div className="absolute -top-20 -left-10 w-40 h-40 bg-primary/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-primary/50 rounded-full blur-3xl" />

          <div className="flex justify-center mb-6 ">
            <Logo />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 mx-auto px-4"
          >
            {/* Input com ícone de e-mail */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                className="peer pl-10 w-full rounded text-sm"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            {/* Input com ícone de senha */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                className="peer pl-10 w-full rounded text-sm"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded cursor-pointer mt-3"
            >
              <LogIn className="size-4" />
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
