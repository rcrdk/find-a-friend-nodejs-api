import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/middlewares/verify-jwt'

import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
	// app.get('/pets', search)
	// app.get('/pets/:id', profile)

	app.post('/pets', { onRequest: [verifyJWT] }, create)
}
