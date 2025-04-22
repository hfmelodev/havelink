import { Link } from 'react-router'

export function Copyright() {
  return (
    <div className="text-center text-sm flex flex-col mb-4 mt-auto">
      <Link to="/auth">
        © {new Date().getFullYear()} -{' '}
        <span className="text-primary">HaveLink</span>
      </Link>
      <span className="text-muted-foreground">
        Todos os direitos reservados
      </span>
    </div>
  )
}
