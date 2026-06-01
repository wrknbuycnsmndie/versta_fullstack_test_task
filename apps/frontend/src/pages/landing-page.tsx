import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'

export function LandingPage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),transparent_38%)]" />
      <section className="relative flex w-full max-w-4xl flex-col items-center justify-center py-20 text-center sm:py-28">
        <div className="space-y-6">
          <h1 className="animate-title text-balance text-5xl font-semibold tracking-[-0.08em] text-foreground sm:text-7xl lg:text-8xl">
            VERSTA TEST TASK
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            Интерфейс сделанный на React + Vite для создания заявок на доставку, просмотра списка заявок и открытия
            отдельной карточки доставки.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link to="/orders">
            <Button size="lg">
              Открыть заявки
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
