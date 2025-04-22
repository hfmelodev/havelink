interface LoadingProps {
  isLoading: boolean
}

export function Loading({ isLoading }: LoadingProps) {
  if (!isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center my-auto flex-col space-y-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 rounded-full" />
          <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin" />
        </div>
        <h1 className="text-muted-foreground text-lg font-semibold">
          Carregando...
        </h1>
      </div>
    )
  }
}
