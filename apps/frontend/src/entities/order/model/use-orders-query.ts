import { useQuery } from '@tanstack/react-query'

import type { PagedOrders } from './types'
import { orderQueryKeys } from './order-query-keys'
import { fetchJson } from '../../../lib/api'

export function useOrdersQuery(page: number, pageSize: number) {
  return useQuery({
    queryKey: orderQueryKeys.list(page, pageSize),
    queryFn: () =>
      fetchJson<PagedOrders>(`/orders?page=${page}&pageSize=${pageSize}`),
  })
}
