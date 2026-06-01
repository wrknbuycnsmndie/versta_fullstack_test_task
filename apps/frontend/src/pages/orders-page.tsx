import { RefreshCcw } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../components/ui/button'
import { useCreateOrderForm } from '../features/create-order/model/use-create-order-form'
import { CreateOrderCard } from '../features/create-order/ui/create-order-card'
import { OrderListCard } from '../features/orders/order-list-card'
import { ordersPageSize } from '../features/orders/constants'
import { useOrdersQuery } from '../entities/order/model/use-orders-query'

export function OrdersPage() {
  const createOrderForm = useCreateOrderForm()
  const [page, setPage] = useState(1)
  const ordersQuery = useOrdersQuery(page, ordersPageSize)
  const pagedOrders = ordersQuery.data
  const orders = pagedOrders?.items ?? []
  const totalCount = pagedOrders?.totalCount ?? 0
  const totalPages = pagedOrders?.totalPages ?? 1
  const currentPage = pagedOrders?.page ?? page

  return (
    <main className="flex-1 py-8 sm:py-10">
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Заказы</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Добавляйте новые отправления, просматривайте заявки и открывайте карточки доставки для получения подробной информации.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => void ordersQuery.refetch()}
          disabled={ordersQuery.isFetching}
        >
          <RefreshCcw className={`size-4 ${ordersQuery.isFetching ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <CreateOrderCard
          form={createOrderForm.form}
          onSubmit={createOrderForm.submit}
          submitError={createOrderForm.submitError}
          isSubmittingRemote={createOrderForm.isSubmittingRemote}
        />
        <OrderListCard
          orders={orders}
          totalCount={totalCount}
          totalPages={totalPages}
          isLoading={ordersQuery.isLoading}
          error={
            ordersQuery.isError && ordersQuery.error instanceof Error
              ? ordersQuery.error.message
              : ''
          }
          currentPage={currentPage}
          onPageChange={setPage}
        />
      </section>
    </main>
  )
}
