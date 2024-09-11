import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
	const searchPetsQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
		city: z.string(),
		state: z.string(),
		energy: z.coerce.number().optional(),
		age: z.string().optional(),
		kind_of: z.enum(['cat', 'dog']).optional(),
		size: z.string().optional(),
		independency: z.string().optional(),
		environment: z.string().optional(),
		user_id: z.string().uuid().optional(),
	})

	const {
		page,
		city,
		state,
		kind_of,
		age,
		size,
		energy,
		independency,
		environment,
		user_id,
	} = searchPetsQuerySchema.parse(request.query)

	const searchPetsService = makeSearchPetsService()

	const { pets } = await searchPetsService.handle({
		page,
		city,
		state,
		kindOf: kind_of,
		age,
		size,
		energy,
		independency,
		environment,
		userId: user_id,
	})

	return reply.status(200).send({ pets })
}
