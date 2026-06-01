import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Loader } from '../../components/ui/loader'
import { formatDate, formatWeight } from '../../lib/order-format'
import type { Order } from '../../entities/order/model/types'

export function OrderListCard({
  orders,
  totalCount,
  totalPages,
  isLoading,
  error,
  currentPage,
  onPageChange,
}: {
  orders: Order[]
  totalCount: number
  totalPages: number
  isLoading: boolean
  error: string
  currentPage: number
  onPageChange: (page: number) => void
}) {
  const hasOrders = totalCount > 0

  return (
    <Card className="border-border/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.18)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl">Список заказов</CardTitle>
          <CardDescription>
            {totalCount ? `${totalCount} записей` : 'Пока здесь пусто'}
          </CardDescription>
        </div>
        <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {totalCount}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        {isLoading ? <Loader label="Загружаем список заказов..." /> : null}

        {!isLoading && !hasOrders ? (
          <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            Создай первый заказ, и он появится здесь.
          </div>
        ) : null}

        {hasOrders ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderListItem key={order.id} order={order} />
            ))}
          </div>
        ) : null}

        {hasOrders && totalPages > 1 ? (
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              <ChevronLeft className="size-4" />
              Назад
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
              Вперед
              <ChevronRight className="size-4" />
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function OrderListItem({ order }: { order: Order }) {
  return (
    <Link
      to={`/orders/${order.id}`}
      className="block rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-accent/70"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-foreground">{order.orderNumber}</span>
        <span className="text-sm text-muted-foreground">{formatWeight(order.weightKg)}</span>
      </div>
      <p className="mt-2 text-sm text-foreground">
        {order.senderCity} → {order.recipientCity}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{formatDate(order.pickupDate)}</p>
    </Link>
  )
}
