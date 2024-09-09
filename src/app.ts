import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { petsRoutes } from './controllers/pets/routes'
import { usersRoutes } from './controllers/users/routes'
import { env } from './env'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
})

app.register(fastifyCookie)

app.register(fastifyCors, {
	origin: true,
	credentials: true,
})

app.register(usersRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() })
	}

	if (error instanceof ResourceNotFoundError) {
		return reply.status(404).send({ message: 'Resource not found.' })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	} else {
		// TODO: should implement an external tool to log productions errors. (Sentry, DataDog, New Relic)
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})
