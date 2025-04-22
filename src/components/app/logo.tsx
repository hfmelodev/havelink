import { Link } from 'lucide-react'
import { Link as LinkRouter } from 'react-router'

export function Logo() {
  return (
    <LinkRouter
      to="/"
      className="text-3xl font-extrabold tracking-tight text-primary flex items-center space-x-1"
    >
      <Link className="w-6 h-6" />
      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Have
      </span>
      <span className="text-muted-foreground">Link</span>
    </LinkRouter>
  )
}
