import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-800">404</h1>
        <p className="mt-4 text-xl text-slate-600">Página não encontrada</p>
        <p className="mt-2 text-slate-500">
          A página que você está procurando não existe ou foi movida.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-slate-800 text-white px-6 py-2 rounded-lg shadow hover:bg-slate-700 transition"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
