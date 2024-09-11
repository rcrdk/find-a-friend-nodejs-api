import { compare, hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UpdateUserService } from './update-user'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserService

describe('update user service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new UpdateUserService(usersRepository)
	})

	it('should be able to update a user', async () => {
		const { id } = await usersRepository.create({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const { user } = await sut.handle(id, {
			name: 'Janet Doe',
			organization: 'Janet Doe Shelter',
			email: 'janet@doe.com',
			password: '456789',
			whatsappNumber: '(99) 99999-9999',
			address: 'Rua Janet Doe, 999, Sala 99',
			zipCode: '99999-999',
			city: 'Curitiba',
			state: 'PR',
			neighborhood: 'Zona Sul',
		})

		expect(user).toEqual(
			expect.objectContaining({
				id,
				name: 'Janet Doe',
				organization: 'Janet Doe Shelter',
				email: 'janet@doe.com',
				whatsapp_number: '(99) 99999-9999',
				address: 'Rua Janet Doe, 999, Sala 99',
				zip_code: '99999-999',
				city: 'Curitiba',
				state: 'PR',
				neighborhood: 'Zona Sul',
			}),
		)
	})

	it('should hash user password upon user update', async () => {
		const { id } = await usersRepository.create({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const { user } = await sut.handle(id, {
			name: 'Janet Doe',
			organization: 'Janet Doe Shelter',
			email: 'janet@doe.com',
			password: '456789',
			whatsappNumber: '(99) 99999-9999',
			address: 'Rua Janet Doe, 999, Sala 99',
			zipCode: '99999-999',
			city: 'Curitiba',
			state: 'PR',
			neighborhood: 'Zona Sul',
		})

		const isPasswordCorrectlyHashed = await compare(
			'456789',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBeTruthy()
	})

	it('should not be able to update user with same e-mail twice', async () => {
		const email = 'john@doe.com'

		const userOne = await usersRepository.create({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email,
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		const userTwo = await usersRepository.create({
			name: 'John Doe',
			organization: 'John Doe Shelter',
			email: 'other@email.com',
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Rua John Doe, 190, Sala 02',
			zip_code: '00000-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		})

		await expect(() => {
			return sut.handle(userTwo.id, {
				name: 'Janet Doe',
				organization: 'Janet Doe Shelter',
				email,
				password: '456789',
				whatsappNumber: '(99) 99999-9999',
				address: 'Rua Janet Doe, 999, Sala 99',
				zipCode: '99999-999',
				city: 'Curitiba',
				state: 'PR',
				neighborhood: 'Zona Sul',
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)

		const { user: userSelfUpdating } = await sut.handle(userOne.id, {
			name: 'Janet Doe',
			organization: 'Janet Doe Shelter',
			email,
			password: '456789',
			whatsappNumber: '(99) 99999-9999',
			address: 'Rua Janet Doe, 999, Sala 99',
			zipCode: '99999-999',
			city: 'Curitiba',
			state: 'PR',
			neighborhood: 'Zona Sul',
		})

		expect(userSelfUpdating).toEqual(
			expect.objectContaining({
				name: 'Janet Doe',
				organization: 'Janet Doe Shelter',
				email,
			}),
		)
	})
})
