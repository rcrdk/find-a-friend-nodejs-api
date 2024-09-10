import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('get user profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get user profile', async () => {
		const { id } = await createAndAuthenticateUser(app)

		const getUserProfileResponse = await request(app.server).get(`/users/${id}`)

		expect(getUserProfileResponse.statusCode).toEqual(200)
		expect(getUserProfileResponse.body.user).toEqual(
			expect.objectContaining({ name: 'John Doe' }),
		)
	})
})
