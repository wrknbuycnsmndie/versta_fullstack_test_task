import { cn } from '../../lib/utils'

export function Loader({
  label = 'Загрузка...',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3 text-sm text-muted-foreground', className)}>
      <span className="inline-flex size-4 animate-spin rounded-full border-2 border-muted-foreground/25 border-t-foreground" />
      <span>{label}</span>
    </div>
  )
}
