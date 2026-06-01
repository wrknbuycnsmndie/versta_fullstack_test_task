import { Package2 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Loader } from '../../components/ui/loader'
import { formatDate, formatDateTime, formatWeight } from '../../lib/order-format'
import type { Order } from '../../entities/order/model/types'

export function OrderDetailsCard({
  order,
  loading,
  error,
}: {
  order: Order | null
  loading: boolean
  error: string
}) {
  return (
    <Card className="max-w-4xl border-border/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.18)]">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package2 className="size-4" />
          {order ? order.orderNumber : 'Карточка заказа'}
        </CardTitle>
        <CardDescription>
          Все данные заказа доступны в режиме чтения.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? <Loader label="Загружаем заказ..." /> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        {!loading && !error && order ? (
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <DetailRow label="Номер заказа" value={order.orderNumber} />
            <DetailRow label="Вес" value={formatWeight(order.weightKg)} />
            <DetailRow label="Город отправителя" value={order.senderCity} />
            <DetailRow label="Адрес отправителя" value={order.senderAddress} />
            <DetailRow label="Город получателя" value={order.recipientCity} />
            <DetailRow label="Адрес получателя" value={order.recipientAddress} />
            <DetailRow label="Дата забора" value={formatDate(order.pickupDate)} />
            <DetailRow label="Создан" value={formatDateTime(order.createdAtUtc)} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-xl border border-border/80 bg-muted/40 p-4">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
