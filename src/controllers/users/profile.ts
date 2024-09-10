import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	const searchPetsQuerySchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = searchPetsQuerySchema.parse(request.params)

	const getUserProfileService = makeGetUserProfileService()

	const { user } = await getUserProfileService.handle({ userId: id })

	return reply.status(200).send({ user })
}
