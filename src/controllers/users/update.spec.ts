import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('update user profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to update user profile', async () => {
		const { token, id } = await createAndAuthenticateUser(app)

		const response = await request(app.server)
			.put(`/users/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				id,
				name: 'Janet Doe',
				organization: 'Janet Doe Shelter',
				email: 'janet@doe.com',
				password: '456789',
				whatsappNumber: '(99) 99999-9999',
				address: 'Rua John Doe, 999, Sala 99',
				zipCode: '99999-999',
				city: 'Curitiba',
				state: 'PR',
				neighborhood: 'Zona Sul',
			})

		expect(response.statusCode).toEqual(200)

		const profileResponse = await request(app.server).get(`/users/${id}`)

		expect(profileResponse.statusCode).toEqual(200)
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				name: 'Janet Doe',
				organization: 'Janet Doe Shelter',
				email: 'janet@doe.com',
				whatsapp_number: '(99) 99999-9999',
				address: 'Rua John Doe, 999, Sala 99',
				zip_code: '99999-999',
				city: 'Curitiba',
				state: 'PR',
				neighborhood: 'Zona Sul',
			}),
		)
	})
})
