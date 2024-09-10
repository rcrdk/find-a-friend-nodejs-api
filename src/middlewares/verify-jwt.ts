import { FastifyRequest } from 'fastify'

import { UnauthorizedError } from '@/errors/unauthorized-error'

export async function verifyJWT(request: FastifyRequest) {
	try {
		await request.jwtVerify()
	} catch (err) {
		throw new UnauthorizedError()
	}
}
