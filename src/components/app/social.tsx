import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

interface SocialProps {
  link: string
  icon: LucideIcon
}

export function Social({ link, icon: Icon }: SocialProps) {
  return (
    <Link to={link} className="group" target="_blank" rel="noopener noreferrer">
      <div className="bg-muted p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:border group-hover:border-primary/50">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
    </Link>
  )
}
