import { randomUUID } from 'node:crypto'

import { Prisma } from '@prisma/client'

import { PetWithUser } from '@/interface/pet-with-user'

import { FindManyByFiltersParams, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
	public items: PetWithUser[] = []

	private user: PetWithUser['user'] = {
		id: 'user-01',
		name: 'John Doe',
		organization: 'John Doe Shelter',
		city: 'Timbó',
		state: 'SC',
		address: 'Rua John Doe, 190, Sala 02',
		neighborhood: 'Centro',
		zip_code: '00000-000',
		email: 'john@doe.com',
		whatsapp_number: '(00) 00000-0000',
	}

	async findById(id: string) {
		const pet = this.items.find((item) => item.id === id)

		if (!pet) return null

		pet.user = this.user
		return pet
	}

	async findManyByFilters(filters: FindManyByFiltersParams) {
		const addUserToPet = this.items.map((pet) => {
			pet.user = this.user
			return pet
		})

		const filterByLocation = addUserToPet.filter((pet) => {
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

		const filterByEnvironment = filterByIndependency.filter((pet) => {
			if (!filters.environment) return true
			return filters.environment === pet.environment
		})

		const filterByKind = filterByEnvironment.filter((pet) => {
			if (!filters.kindOf) return true
			return filters.kindOf === pet.kind_of
		})

		const filterByUser = filterByKind.filter((pet) => {
			if (!filters.userId) return true
			return filters.userId === pet.user_id
		})

		const ITEMS_BY_PAGE = 20
		const START_USERS_ARRAY_DELIMETER = (filters.page - 1) * ITEMS_BY_PAGE
		const END_USERS_ARRAY_DELIMETER = filters.page * ITEMS_BY_PAGE

		return filterByUser.slice(
			START_USERS_ARRAY_DELIMETER,
			END_USERS_ARRAY_DELIMETER,
		)
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

	async update(id: string, data: Prisma.PetUncheckedCreateInput) {
		const petIndex = this.items.findIndex((pet) => pet.id === id)

		const { id: pet_id, user_id } = this.items[petIndex]

		this.items[petIndex] = {
			id: pet_id,
			user_id,
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

		return this.items[petIndex]
	}

	async delete(id: string) {
		const petIndex = this.items.findIndex((pet) => pet.id === id)
		const pet = this.items[petIndex]

		this.items.slice(petIndex, 1)

		return {
			...pet,
			user: this.user,
		}
	}
}
