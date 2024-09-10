import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetUserProfileService } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('get user profile service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileService(usersRepository)
	})

	it('should be able to get a user profile', async () => {
		const { id: userId } = await usersRepository.create({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password_hash: '123456',
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const response = await sut.handle({ userId })

		expect(response.user).toEqual(expect.objectContaining({ name: 'John Doe' }))
	})

	it('should not be able to get user profile with wrong id', async () => {
		await expect(() => {
			return sut.handle({
				userId: 'non-existing-id',
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
