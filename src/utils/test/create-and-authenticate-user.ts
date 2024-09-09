import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
			organization: 'John Doe Shelter',
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		},
	})

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'john@doe.com',
		password: '123456',
	})

	const { token } = authResponse.body

	return { token }
}
