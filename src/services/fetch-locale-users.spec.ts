import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { FetchLocaleUsersService } from './fetch-locale-users'

let usersRepository: InMemoryUsersRepository
let sut: FetchLocaleUsersService

describe('fetch locale users service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new FetchLocaleUsersService(usersRepository)
	})

	it('should be able to fetch users in a city', async () => {
		await usersRepository.create({
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

		await usersRepository.create({
			name: 'Janet Doe',
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

		await usersRepository.create({
			name: 'Johan Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password_hash: '123456',
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Curitiba',
			state: 'PR',
			neighborhood: 'Centro',
		})

		const responseOne = await sut.handle({
			state: 'SC',
			city: 'Timbó',
		})

		expect(responseOne.users).toHaveLength(2)
		expect(responseOne.users).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
			expect.objectContaining({ name: 'Janet Doe' }),
		])

		const responseTwo = await sut.handle({
			state: 'PR',
			city: 'Curitiba',
		})

		expect(responseTwo.users).toHaveLength(1)
		expect(responseTwo.users).toEqual([
			expect.objectContaining({ name: 'Johan Doe' }),
		])
	})
})
