import { randomUUID } from 'node:crypto'

import { Prisma } from '@prisma/client'

import { PetWithUser } from '@/interface/pet-with-user'

import { FindManyByFiltersParams, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
	public items: PetWithUser[] = []

	async findById(id: string) {
		const pet = this.items.find((item) => item.id === id)

		if (!pet) {
			return null
		}

		return pet
	}

	async findManyByFilters(filters: FindManyByFiltersParams) {
		const filterByLocation = this.items.filter((pet) => {
			const filterState = pet.user?.state === filters.state
			const filterCity = pet.user?.city === filters.city

			return filterState && filterCity
		})

		const filterByEnergy = filterByLocation.filter((pet) => {
			if (!filters.energy) return true
			return filters.energy === pet.energy
		})

		const filterByAge = filterByEnergy.filter((pet) => {
			if (!filters.age) return true
			return filters.age === pet.age
		})

		const filterBySize = filterByAge.filter((pet) => {
			if (!filters.size) return true
			return filters.size === pet.size
		})

		const filterByIndependency = filterBySize.filter((pet) => {
			if (!filters.independency) return true
			return filters.independency === pet.independency
		})

		const filterByKind = filterByIndependency.filter((pet) => {
			if (!filters.kindOf) return true
			return filters.kindOf === pet.kind_of
		})

		return filterByKind
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = {
			id: randomUUID(),
			user_id: data.user_id,
			name: data.name,
			kind_of: data.kind_of,
			about: data.about,
			age: data.age,
			size: data.size,
			energy: data.energy,
			independency: data.independency,
			environment: data.environment,
			created_at: new Date(),
		}

		this.items.push(pet)

		return pet
	}
}
