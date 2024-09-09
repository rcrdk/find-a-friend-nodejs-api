import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
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

	const {
		name,
		organization,
		email,
		whatsappNumber,
		password,
		address,
		neighborhood,
		zipCode,
		state,
		city,
	} = registerBodySchema.parse(request.body)

	try {
		const registerService = makeRegisterService()

		await registerService.handle({
			name,
			organization,
			email,
			whatsappNumber,
			password,
			address,
			neighborhood,
			zipCode,
			state,
			city,
		})
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message })
		}

		throw error
	}

	return reply.status(201).send()
}
