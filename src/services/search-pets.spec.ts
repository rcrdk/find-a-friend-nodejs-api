import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { SearchPetsService } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsService

describe('search pets service', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new SearchPetsService(petsRepository)
	})

	it('should be able to search for filtered pets', async () => {
		await petsRepository.create({
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

		await petsRepository.create({
			name: 'John Junior Doe',
			about: '',
			kind_of: 'dog',
			age: 'adult',
			energy: 4,
			environment: 'inside',
			independency: 'high',
			size: 'small',
			user_id: 'user-01',
		})

		await petsRepository.create({
			name: 'Janet Doe',
			about: '',
			kind_of: 'cat',
			age: 'adult',
			energy: 3,
			environment: 'outside',
			independency: 'hight',
			size: 'small',
			user_id: 'user-01',
		})

		const { pets: petsInTheCity } = await sut.handle({
			page: 1,
			city: 'Timbó',
			state: 'SC',
		})

		expect(petsInTheCity).toHaveLength(3)
		expect(petsInTheCity).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
			expect.objectContaining({ name: 'John Junior Doe' }),
			expect.objectContaining({ name: 'Janet Doe' }),
		])

		const { pets: petsFiltered } = await sut.handle({
			page: 1,
			city: 'Timbó',
			state: 'SC',
			kindOf: 'dog',
			energy: 5,
			independency: 'low',
			environment: 'all',
			size: 'medium',
		})

		expect(petsFiltered).toHaveLength(1)
		expect(petsFiltered).toEqual([
			expect.objectContaining({ name: 'John Doe' }),
		])

		const { pets: noPetsInTheCity } = await sut.handle({
			page: 1,
			city: 'Curitiba',
			state: 'PR',
		})

		expect(noPetsInTheCity).toHaveLength(0)
	})

	it('should be able to search for filtered pets with pagination', async () => {
		for (let i = 1; i <= 44; i++) {
			const alternate = i % 2 === 0

			await petsRepository.create({
				name: `John Doe ${i}`,
				about: '',
				kind_of: alternate ? 'cat' : 'dog',
				age: 'newborn',
				energy: 5,
				environment: 'all',
				independency: 'low',
				size: 'medium',
				user_id: 'user-01',
			})
		}

		const { pets } = await sut.handle({
			page: 2,
			city: 'Timbó',
			state: 'SC',
			kindOf: 'dog',
		})

		expect(pets).toHaveLength(2)
		expect(pets).toEqual([
			expect.objectContaining({ name: 'John Doe 41' }),
			expect.objectContaining({ name: 'John Doe 43' }),
		])
	})
})
