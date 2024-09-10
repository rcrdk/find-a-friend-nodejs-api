import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetProfileService } from '@/services/factories/make-get-pet-profile-service'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	const searchPetsQuerySchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = searchPetsQuerySchema.parse(request.params)

	const getPetProfileService = makeGetPetProfileService()

	const { pet } = await getPetProfileService.handle({ petId: id })

	return reply.status(200).send({ pet })
}
