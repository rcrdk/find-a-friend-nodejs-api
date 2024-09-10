import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UnauthorizedError } from '@/errors/unauthorized-error'
import { makeDeletePetService } from '@/services/factories/make-delete-pet-service'
import { makeGetPetProfileService } from '@/services/factories/make-get-pet-profile-service'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
	const deletePetParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id: petId } = deletePetParamsSchema.parse(request.params)

	const getPetProfileService = makeGetPetProfileService()

	const { pet } = await getPetProfileService.handle({ petId })

	if (!pet) throw new ResourceNotFoundError()
	if (pet.user?.id !== request.user.sub) throw new UnauthorizedError()

	const deletePetService = makeDeletePetService()

	await deletePetService.handle({
		petId,
	})

	return reply.status(200).send()
}
