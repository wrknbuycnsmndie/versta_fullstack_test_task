import { z } from 'zod'

export const orderFormSchema = z.object({
  senderCity: z.string().trim().min(1, 'Укажите город отправителя.'),
  senderAddress: z.string().trim().min(1, 'Укажите адрес отправителя.'),
  recipientCity: z.string().trim().min(1, 'Укажите город получателя.'),
  recipientAddress: z.string().trim().min(1, 'Укажите адрес получателя.'),
  weightKg: z
    .string()
    .trim()
    .min(1, 'Укажите вес груза.')
    .refine((value) => Number(value) > 0, 'Вес груза должен быть больше нуля.'),
  pickupDate: z.string().trim().min(1, 'Укажите дату забора.'),
})
