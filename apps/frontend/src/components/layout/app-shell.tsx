import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex h-16 items-center justify-between border-b border-border/60">
          <Link
            to="/"
            className="text-sm font-medium tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
          >
            VERSTA
          </Link>

          <nav className="flex items-center gap-2">
            <HeaderLink to="/">Главная</HeaderLink>
            <HeaderLink to="/orders">Доставки</HeaderLink>
          </nav>
        </header>

        {children}

        <footer className="mt-auto flex min-h-16 items-center justify-center border-t border-border/60 py-5 text-sm text-muted-foreground">
          <a
            href="https://github.com/wrknbuycnsmndie"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            @wrknbuycnsmndie
          </a>
        </footer>
      </div>
    </div>
  )
}

function HeaderLink({ to, children }: { to: string; children: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: 'sm' }))
      }
    >
      {children}
    </NavLink>
  )
}
