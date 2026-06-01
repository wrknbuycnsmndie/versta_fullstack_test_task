import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'

export function NotFoundPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Страница не найдена
        </h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Такой страницы нет или ссылка устарела. Вернись на главную или открой список
          заказов.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/">
            <Button size="lg">На главную</Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline" size="lg">
              К заказам
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
