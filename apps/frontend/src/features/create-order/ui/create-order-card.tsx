import type { UseFormReturn } from 'react-hook-form'

import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { FormField } from '../../orders/form-field'
import type { OrderFormValues } from '../../../entities/order/model/types'

export function CreateOrderCard({
  form,
  onSubmit,
  submitError,
  isSubmittingRemote,
}: {
  form: UseFormReturn<OrderFormValues>
  onSubmit: (values: OrderFormValues) => Promise<void>
  submitError: string
  isSubmittingRemote: boolean
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  return (
    <Card className="border-border/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.18)]">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Новая доставка</CardTitle>
        <CardDescription>
          Заполните данные заявки.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              id="senderCity"
              label="Город отправителя"
              error={errors.senderCity?.message}
            >
              <Input id="senderCity" placeholder="Москва" {...register('senderCity')} />
            </FormField>

            <FormField
              id="senderAddress"
              label="Адрес отправителя"
              error={errors.senderAddress?.message}
            >
              <Input
                id="senderAddress"
                placeholder="Ленинградский проспект, 36"
                {...register('senderAddress')}
              />
            </FormField>

            <FormField
              id="recipientCity"
              label="Город получателя"
              error={errors.recipientCity?.message}
            >
              <Input id="recipientCity" placeholder="Казань" {...register('recipientCity')} />
            </FormField>

            <FormField
              id="recipientAddress"
              label="Адрес получателя"
              error={errors.recipientAddress?.message}
            >
              <Input
                id="recipientAddress"
                placeholder="Кремлевская, 1"
                {...register('recipientAddress')}
              />
            </FormField>

            <FormField id="weightKg" label="Вес, кг" error={errors.weightKg?.message}>
              <Input
                id="weightKg"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="12.50"
                {...register('weightKg')}
              />
            </FormField>

            <FormField id="pickupDate" label="Дата забора" error={errors.pickupDate?.message}>
              <Input id="pickupDate" type="date" {...register('pickupDate')} />
            </FormField>
          </div>

          {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-sm text-muted-foreground">
              После создания откроется карточка заказа.
            </p>
            <Button type="submit" size="lg" disabled={isSubmitting || isSubmittingRemote}>
              {isSubmitting || isSubmittingRemote ? 'Сохраняем...' : 'Создать заказ'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
