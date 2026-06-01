import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { useOrderDetails } from '../features/order-details/model/use-order-details'
import { OrderDetailsCard } from '../features/orders/order-details-card'

export function OrderDetailsPage() {
  const { id } = useParams()
  const orderDetails = useOrderDetails(id)

  return (
    <main className="flex-1 py-8 sm:py-10">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/orders">
          <Button variant="outline" size="sm">
            <ChevronLeft className="size-4" />
            К списку
          </Button>
        </Link>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {orderDetails.order ? orderDetails.order.orderNumber : 'Заказ'}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Здесь собраны все данные по выбранной доставке.
        </p>
      </div>

      <OrderDetailsCard
        order={orderDetails.order}
        loading={orderDetails.isLoading}
        error={orderDetails.error}
      />
    </main>
  )
}
