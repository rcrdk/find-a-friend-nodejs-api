import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { locale } from './locale'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register)

	app.post('/sessions', authenticate)
	app.patch('/token/refresh', refresh)

	app.get('/users/:id', profile)

	app.get('/users/locale', locale)
}
