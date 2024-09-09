import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('create pet (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a pet', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'John Doe',
				about: 'Happy puppy!',
				kindOf: 'dog',
				age: 'newborn',
				energy: 5,
				environment: 'all',
				independency: 'tottaly',
				size: 'medium',
			})

		expect(response.statusCode).toEqual(201)
	})
})
