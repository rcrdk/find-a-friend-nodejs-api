import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('fetck locale users (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to fetch locale users', async () => {
		await createAndAuthenticateUser(app)

		await request(app.server).post('/users').send({
			name: 'Johana Doe',
			email: 'johana@doe.com',
			password: '123456',
			organization: 'John Doe Shelter',
			whatsappNumber: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zipCode: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const response = await request(app.server).get('/users/locale').query({
			state: 'SC',
			city: 'Timbó',
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body.users).toHaveLength(2)
		expect(response.body.users).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
			expect.objectContaining({ name: 'Johana Doe' }),
		])
	})
})
