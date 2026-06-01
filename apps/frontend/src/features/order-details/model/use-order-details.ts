import { useOrderQuery } from '../../../entities/order/model/use-order-query'

export function useOrderDetails(id: string | undefined) {
  const orderQuery = useOrderQuery(id)

  return {
    order: orderQuery.data ?? null,
    isLoading: orderQuery.isLoading,
    error:
      !id
        ? 'Некорректный идентификатор заказа.'
        : orderQuery.isError && orderQuery.error instanceof Error
          ? orderQuery.error.message
          : '',
  }
}
