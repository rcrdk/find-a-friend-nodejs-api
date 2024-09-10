import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { GetPetProfileService } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileService

describe('get pet profile service', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new GetPetProfileService(petsRepository)
	})

	it('should be able to get a pet profile', async () => {
		const { id: petId } = await petsRepository.create({
			name: 'John Doe',
			about: '',
			kind_of: 'dog',
			age: 'newborn',
			energy: 5,
			environment: 'all',
			independency: 'low',
			size: 'medium',
			user_id: 'user-01',
		})

		const response = await sut.handle({ petId })

		expect(response.pet).toEqual(expect.objectContaining({ name: 'John Doe' }))
	})

	it('should not be able to get pet profile with wrong id', async () => {
		await expect(() => {
			return sut.handle({
				petId: 'non-existing-id',
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
