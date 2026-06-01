export const orderQueryKeys = {
  all: ['orders'] as const,
  list: (page: number, pageSize: number) => ['orders', 'list', page, pageSize] as const,
  detail: (id: string) => ['orders', 'detail', id] as const,
}
