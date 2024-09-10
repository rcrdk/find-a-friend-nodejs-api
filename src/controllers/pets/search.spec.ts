import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('search pets (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to search for filtered pets', async () => {
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

		await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Janet Doe',
				about: '',
				kindOf: 'cat',
				age: 'adult',
				energy: 3,
				environment: 'inside',
				independency: 'low',
				size: 'small',
			})

		const filteredPetsResponse = await request(app.server)
			.get('/pets')
			.query({
				page: 1,
				state: 'SC',
				city: 'Timbó',
				kindOf: 'dog',
				age: 'newborn',
				energy: 5,
				independency: 'medium',
				environment: 'all',
				size: 'medium',
			})
			.send()

		expect(filteredPetsResponse.body.pets).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
		])
	})
})
