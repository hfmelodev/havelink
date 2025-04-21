import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl">Página não encontrada</p>
        <p className="mt-2">
          A página que você está procurando não existe ou foi movida.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-primary hover:bg-primary/90 rounded px-6 py-2 text-neutral-950 font-medium shadow transition"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
