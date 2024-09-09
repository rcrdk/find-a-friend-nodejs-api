import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { CreatePetService } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('create pet service', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new CreatePetService(petsRepository)
	})

	it('should be able to create a new pet', async () => {
		const { pet } = await sut.handle({
			name: 'John Doe',
			about: 'Happy puppy!',
			kindOf: 'dog',
			age: 'newborn',
			energy: 5,
			environment: 'all',
			independency: 'tottaly',
			size: 'medium',
			userId: 'user-id',
		})

		expect(pet.id).toEqual(expect.any(String))
	})
})
