import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { orderFormSchema } from '../../../entities/order/model/order-form-schema'
import { orderQueryKeys } from '../../../entities/order/model/order-query-keys'
import type { OrderFormValues } from '../../../entities/order/model/types'
import { ApiError, fetchJson } from '../../../lib/api'

export function useCreateOrderForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      senderCity: '',
      senderAddress: '',
      recipientCity: '',
      recipientAddress: '',
      weightKg: '',
      pickupDate: getDefaultPickupDate(),
    },
  })

  const mutation = useMutation({
    mutationFn: (values: OrderFormValues) =>
      fetchJson<{ id: string }>(`/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderCity: values.senderCity,
          senderAddress: values.senderAddress,
          recipientCity: values.recipientCity,
          recipientAddress: values.recipientAddress,
          weightKg: Number(values.weightKg),
          pickupDate: new Date(values.pickupDate).toISOString(),
        }),
      }),
    onSuccess: async (order) => {
      form.reset({
        senderCity: '',
        senderAddress: '',
        recipientCity: '',
        recipientAddress: '',
        weightKg: '',
        pickupDate: getDefaultPickupDate(),
      })

      await queryClient.invalidateQueries({ queryKey: orderQueryKeys.all })
      navigate(`/orders/${order.id}`)
    },
  })

  async function submit(values: OrderFormValues) {
    try {
      await mutation.mutateAsync(values)
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        applyValidationErrors(
          (error.payload as { errors?: Record<string, string[]> } | null)?.errors,
          form.setError,
        )
        return
      }

      throw error
    }
  }

  return {
    form,
    submit,
    submitError:
      mutation.isError && mutation.error instanceof Error
        ? mutation.error.message
        : mutation.isError
          ? 'Не удалось создать заказ.'
          : '',
    isSubmittingRemote: mutation.isPending,
  }
}

function getDefaultPickupDate() {
  return new Date().toISOString().slice(0, 10)
}

function applyValidationErrors(
  errors: Record<string, string[]> | undefined,
  setError: ReturnType<typeof useForm<OrderFormValues>>['setError'],
) {
  if (!errors) {
    return
  }

  const fields: Partial<Record<string, keyof OrderFormValues>> = {
    SenderCity: 'senderCity',
    SenderAddress: 'senderAddress',
    RecipientCity: 'recipientCity',
    RecipientAddress: 'recipientAddress',
    WeightKg: 'weightKg',
    PickupDate: 'pickupDate',
  }

  Object.entries(errors).forEach(([key, value]) => {
    const field = fields[key]
    if (field && value[0]) {
      setError(field, { type: 'server', message: value[0] })
    }
  })
}
