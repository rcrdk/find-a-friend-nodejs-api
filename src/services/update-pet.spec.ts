import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { UpdatePetService } from './update-pet'

let petsRepository: InMemoryPetsRepository
let sut: UpdatePetService

describe('update pet service', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new UpdatePetService(petsRepository)
	})

	it('should be able to update a new pet', async () => {
		const { id: createPetId, user_id: createdPetUserId } =
			await petsRepository.create({
				user_id: 'user-id',
				name: 'John Doe',
				about: 'Happy puppy!',
				kind_of: 'dog',
				age: 'newborn',
				energy: 5,
				environment: 'all',
				independency: 'high',
				size: 'medium',
			})

		const { pet } = await sut.handle(createPetId, {
			userId: createdPetUserId,
			name: 'Janet Johnson',
			about: 'I will love my new owner!',
			kindOf: 'cat',
			age: 'adult',
			energy: 4,
			environment: 'inside',
			independency: 'medum',
			size: 'small',
		})

		expect(pet).toEqual(
			expect.objectContaining({
				id: createPetId,
				user_id: createdPetUserId,
				name: 'Janet Johnson',
				about: 'I will love my new owner!',
				kind_of: 'cat',
				age: 'adult',
				energy: 4,
				environment: 'inside',
				independency: 'medum',
				size: 'small',
			}),
		)
	})
})
