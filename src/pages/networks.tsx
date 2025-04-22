import { Header } from '@/components/app/header'
import { Helmet } from 'react-helmet-async'

export function Networks() {
  return (
    <>
      <Helmet title="Social" />

      <div className="flex items-center gap-4 mt-4 w-full p-2 bg-secondary/50 border border-primary/30 rounded-xl">
        <Header />
      </div>
    </>
  )
}
