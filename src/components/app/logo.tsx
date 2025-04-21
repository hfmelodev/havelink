import { Link } from 'lucide-react'

export function Logo() {
  return (
    <div className="text-3xl font-extrabold tracking-tight text-primary flex items-center space-x-1">
      <Link to="/" className="w-6 h-6" />
      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Have
      </span>
      <span className="text-muted-foreground">Link</span>
    </div>
  )
}
