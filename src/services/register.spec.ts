import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { RegisterService } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('register service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterService(usersRepository)
	})

	it('should be able to register', async () => {
		const { user } = await sut.handle({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password: '123456',
			whatsappNumber: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zipCode: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const { user } = await sut.handle({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password: '123456',
			whatsappNumber: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zipCode: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBeTruthy()
	})

	it('should not be able to register with same e-mail twice', async () => {
		const email = 'john@doe.com'

		await sut.handle({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email,
			password: '123456',
			whatsappNumber: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zipCode: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		await expect(() => {
			return sut.handle({
				name: 'John Doe',
				organization: 'John Doe Shelter',
				email,
				password: '123456',
				whatsappNumber: '(00) 00000-0000',
				address: 'Rua John Doe, 190, Sala 02',
				zipCode: '00000-000',
				city: 'Timbó',
				state: 'SC',
				neighborhood: 'Centro',
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
