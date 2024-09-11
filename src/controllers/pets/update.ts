import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UnauthorizedError } from '@/errors/unauthorized-error'
import { makeGetPetProfileService } from '@/services/factories/make-get-pet-profile-service'
import { makeUpdatePetService } from '@/services/factories/make-update-pet-service'

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updatePetBodySchema = z.object({
		name: z.string(),
		about: z.string(),
		kindOf: z.enum(['cat', 'dog']),
		age: z.string(),
		size: z.string(),
		energy: z.coerce.number(),
		independency: z.string(),
		environment: z.string(),
	})

	const { name, about, kindOf, age, size, energy, independency, environment } =
		updatePetBodySchema.parse(request.body)

	const updatePetParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id: petId } = updatePetParamsSchema.parse(request.params)

	const getPetProfileService = makeGetPetProfileService()

	const { pet } = await getPetProfileService.handle({ petId })

	if (!pet) throw new ResourceNotFoundError()
	if (pet.user?.id !== request.user.sub) throw new UnauthorizedError()

	const updatePetService = makeUpdatePetService()

	await updatePetService.handle(petId, {
		name,
		about,
		kindOf,
		age,
		size,
		energy,
		independency,
		environment,
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
