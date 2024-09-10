import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/middlewares/verify-jwt'

import { create } from './create'
import { profile } from './profile'
import { remove } from './remove'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets', search)
	app.get('/pets/:id', profile)

	app.post('/pets', { onRequest: [verifyJWT] }, create)
	app.delete('/pets/:id', { onRequest: [verifyJWT] }, remove)
}
