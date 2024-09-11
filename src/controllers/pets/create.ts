import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetService } from '@/services/factories/make-create-pet-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetBodySchema = z.object({
		name: z.string(),
		about: z.string(),
		kindOf: z.enum(['cat', 'dog']),
		age: z.string(),
		size: z.string(),
		energy: z.coerce.number(),
		independency: z.string(),
		environment: z.string(),
	})

	const data = createPetBodySchema.parse(request.body)

	const createPetService = makeCreatePetService()

	await createPetService.handle({
		name: data.name,
		about: data.about,
		kindOf: data.kindOf,
		age: data.age,
		size: data.size,
		energy: data.energy,
		independency: data.independency,
		environment: data.environment,
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
