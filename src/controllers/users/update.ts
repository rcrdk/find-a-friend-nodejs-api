import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UnauthorizedError } from '@/errors/unauthorized-error'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { makeUpdateUserService } from '@/services/factories/make-update-user-service'

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateUserBodySchema = z.object({
		name: z.string(),
		organization: z.string().nullable(),
		email: z.string().email(),
		whatsappNumber: z.string(),
		password: z.string().min(6),
		address: z.string(),
		neighborhood: z.string(),
		zipCode: z.string(),
		state: z.string(),
		city: z.string(),
	})

	const updateUserParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const data = updateUserBodySchema.parse(request.body)
	const { id: userId } = updateUserParamsSchema.parse(request.params)

	try {
		const getUserProfileService = makeGetUserProfileService()
		const { user } = await getUserProfileService.handle({ userId })

		if (!user) throw new ResourceNotFoundError()
		if (user?.id !== request.user.sub) throw new UnauthorizedError()

		const updateUserService = makeUpdateUserService()

		await updateUserService.handle(userId, {
			name: data.name,
			organization: data.organization,
			email: data.email,
			whatsappNumber: data.whatsappNumber,
			password: data.password,
			address: data.address,
			neighborhood: data.neighborhood,
			zipCode: data.zipCode,
			state: data.state,
			city: data.city,
		})
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message })
		}

		throw error
	}

	return reply.status(200).send()
}
