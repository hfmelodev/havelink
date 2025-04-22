import { Helmet } from 'react-helmet-async'

export function Admin() {
  return (
    <>
      <Helmet title="Admin" />

      <div className="min-h-[80vh] flex items-center justify-center w-full py-4">
        <h1 className="text-3xl md:text-4xl font-calSans bg-clip-text text-neutral-300">
          Admin
        </h1>
      </div>
    </>
  )
}
