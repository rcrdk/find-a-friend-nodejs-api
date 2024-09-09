import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('authenticate (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticate', async () => {
		await request(app.server).post('/users').send({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password: '123456',
			whatsappNumber: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zipCode: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const response = await request(app.server).post('/sessions').send({
			email: 'john@doe.com',
			password: '123456',
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String),
		})
	})
})
