import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/middlewares/verify-jwt'

import { create } from './create'
import { profile } from './profile'
import { remove } from './remove'
import { search } from './search'
import { update } from './update'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets', search)
	app.get('/pets/:id', profile)

	app.post('/pets', { onRequest: [verifyJWT] }, create)
	app.put('/pets/:id', { onRequest: [verifyJWT] }, update)
	app.delete('/pets/:id', { onRequest: [verifyJWT] }, remove)
}
