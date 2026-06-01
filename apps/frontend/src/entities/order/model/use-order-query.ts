import { useQuery } from '@tanstack/react-query'

import { ApiError, fetchJson } from '../../../lib/api'
import { orderQueryKeys } from './order-query-keys'
import type { Order } from './types'

export function useOrderQuery(id: string | undefined) {
  return useQuery({
    queryKey: id ? orderQueryKeys.detail(id) : orderQueryKeys.detail('missing'),
    queryFn: async () => {
      try {
        return await fetchJson<Order>(`/orders/${id}`)
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          throw new Error('Заказ не найден.')
        }

        throw new Error('Не удалось загрузить заказ.')
      }
    },
    enabled: Boolean(id),
  })
}
