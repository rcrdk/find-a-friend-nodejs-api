import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { DeletePetService } from './delete-pet'

let petsRepository: InMemoryPetsRepository
let sut: DeletePetService

describe('delete pet service', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new DeletePetService(petsRepository)
	})

	it('should be able to delete a pet', async () => {
		const { id: createdPetId } = await petsRepository.create({
			name: 'John Doe',
			about: 'Happy puppy!',
			kind_of: 'dog',
			age: 'newborn',
			energy: 5,
			environment: 'all',
			independency: 'tottaly',
			size: 'medium',
			user_id: 'user-id',
		})

		const { pet: petToDelete } = await sut.handle({ petId: createdPetId })

		expect(createdPetId).toEqual(petToDelete.id)
	})
})
