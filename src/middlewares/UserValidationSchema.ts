import { z } from 'zod'

const userValidation = {
  schema: {
    body: z.object({
      name: z.string().min(5),
      email: z.string().email(),
      password: z.string().min(8),
    }),
  },
}

export { userValidation }
