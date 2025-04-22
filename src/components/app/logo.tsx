import { cn } from '@/lib/utils'
import { Link } from 'lucide-react'
import { Link as LinkRouter } from 'react-router'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
  sizeIcon?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
}

const sizeIconMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

export function Logo({ size = 'lg', sizeIcon = 'lg' }: LogoProps) {
  return (
    <LinkRouter
      to="/"
      className={cn(
        'font-extrabold tracking-tight font-calSans text-primary flex items-center space-x-1',
        sizeMap[size]
      )}
    >
      <Link className={sizeIconMap[sizeIcon]} />
      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Have
      </span>
      <span className="text-muted-foreground">Link</span>
    </LinkRouter>
  )
}
