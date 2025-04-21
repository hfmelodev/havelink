export function Copyright() {
  return (
    <div className="text-center text-sm flex flex-col">
      <span>© {new Date().getFullYear()} - HaveLink</span>
      <span className="text-muted-foreground">
        Todos os direitos reservados
      </span>
    </div>
  )
}
