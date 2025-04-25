import { Header } from '@/components/app/header'
import { Helmet } from 'react-helmet-async'

export function Networks() {
  return (
    <>
      <Helmet title="Social" />

      <div className="flex flex-col w-full">
        <Header />
      </div>
    </>
  )
}
