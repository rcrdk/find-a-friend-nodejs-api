import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchLocaleUsersService } from '@/services/factories/make-fetch-locale-users-service'

export async function locale(request: FastifyRequest, reply: FastifyReply) {
	const fetchLocaleUsersQuerySchema = z.object({
		state: z.string(),
		city: z.string(),
	})

	const { state, city } = fetchLocaleUsersQuerySchema.parse(request.query)

	const fetchLocaleUsersService = makeFetchLocaleUsersService()

	const { users } = await fetchLocaleUsersService.handle({ state, city })

	return reply.status(200).send({ users })
}
