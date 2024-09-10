import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('delete pet (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to delete a pet', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app.server)
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

		const searchPetsResponse = await request(app.server).get('/pets').query({
			page: 1,
			city: 'Timbó',
			state: 'SC',
		})

		expect(searchPetsResponse.body.pets).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
		])

		const response = await request(app.server)
			.delete(`/pets/${searchPetsResponse.body.pets.at(0).id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
	})
})
