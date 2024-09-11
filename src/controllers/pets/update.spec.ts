import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('update pet (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to update a pet', async () => {
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
				environment: 'outside',
				independency: 'high',
				size: 'medium',
			})

		const petsResponse = await request(app.server)
			.get('/pets')
			.query({
				page: 1,
				state: 'SC',
				city: 'Timbó',
			})
			.send()

		const petIdToUpdate = petsResponse.body.pets.at(0).id

		await request(app.server)
			.put(`/pets/${petIdToUpdate}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Johanna Does',
				about: '',
				kindOf: 'cat',
				age: 'adult',
				energy: 3,
				environment: 'inside',
				independency: 'old',
				size: 'small',
			})

		const petsUpdatedResponse = await request(app.server)
			.get('/pets')
			.query({
				page: 1,
				state: 'SC',
				city: 'Timbó',
			})
			.send()

		expect(petsUpdatedResponse.body.pets).toEqual([
			expect.objectContaining({
				name: 'Johanna Does',
				about: '',
				kind_of: 'cat',
				age: 'adult',
				energy: 3,
				environment: 'inside',
				independency: 'old',
				size: 'small',
			}),
		])
	})
})
