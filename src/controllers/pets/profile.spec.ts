import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('get pet profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get pet profile', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'John Doe',
				about: '',
				kindOf: 'dog',
				age: 'newborn',
				energy: 5,
				environment: 'all',
				independency: 'medium',
				size: 'medium',
			})

		const searchPetsResponse = await request(app.server).get('/pets').query({
			page: 1,
			city: 'Timbó',
			state: 'SC',
		})

		expect(searchPetsResponse.body.pets).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
		])

		const response = await request(app.server)
			.get(`/pets/${searchPetsResponse.body.pets.at(0).id}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.pet).toEqual(
			expect.objectContaining({ name: 'John Doe' }),
		)
	})
})
