import { type ReactNode, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Loading } from './components/app/loading'
import { auth } from './lib/firebase'

type PrivateRouteProps = {
  children: ReactNode
}

type MinimalUser = {
  uid: string
  email: string | null
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const [loading, setLoading] = useState(true)
  const [signedIn, setSignedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se o usuário está autenticado antes de renderizar o componente
    const unsub = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/auth', { replace: true })
      }

      if (user) {
        const data: MinimalUser = {
          uid: user.uid,
          email: user.email,
        }

        localStorage.setItem('@havelink', JSON.stringify(data))

        setLoading(false)
        setSignedIn(true)
      } else {
        setLoading(false)
        setSignedIn(false)
      }
    })

    // Desconectar o listener quando o componente for desmontado
    return () => unsub()
  }, [navigate])

  if (loading) {
    return <Loading isLoading={loading} />
  }

  if (!signedIn) {
    return <Navigate to="/auth" replace />
  }

  return children
}
