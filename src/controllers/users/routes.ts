import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { locale } from './locale'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'
import { update } from './update'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register)

	app.post('/sessions', authenticate)
	app.patch('/token/refresh', refresh)

	app.get('/users/:id', profile)
	app.put('/users/:id', { onRequest: [verifyJWT] }, update)

	app.get('/users/locale', locale)
}
