import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyByFiltersParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: { id },
			include: { user: true },
		})

		if (pet) pet.user.password_hash = ''

		return pet
	}

	async findManyByFilters(filters: FindManyByFiltersParams) {
		const ITEMS_BY_PAGE = 20
		const SKIP_PREV_PAGES_ITEMS = (filters.page - 1) * ITEMS_BY_PAGE

		const pets = await prisma.pet.findMany({
			include: {
				user: true,
			},
			where: {
				user: {
					state: {
						equals: filters.state,
						mode: 'insensitive',
					},
					city: {
						equals: filters.city,
						mode: 'insensitive',
					},
				},
				energy: filters.energy,
				age: filters.age,
				size: filters.size,
				independency: filters.independency,
				environment: filters.environment,
				kind_of: filters.kindOf,
				user_id: filters.userId,
			},
			take: ITEMS_BY_PAGE,
			skip: SKIP_PREV_PAGES_ITEMS,
		})

		const petsFiltered = pets.map((pet) => {
			pet.user.password_hash = ''
			return pet
		})

		return petsFiltered
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data,
		})

		return pet
	}

	async update(id: string, data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.update({
			where: {
				id,
			},
			data: {
				name: data.name,
				about: data.about,
				kind_of: data.kind_of,
				age: data.age,
				size: data.size,
				energy: data.energy,
				independency: data.independency,
				environment: data.environment,
			},
			include: { user: true },
		})

		return pet
	}

	async delete(id: string) {
		const pet = await prisma.pet.delete({
			where: {
				id,
			},
			include: { user: true },
		})

		if (pet) pet.user.password_hash = ''

		return pet
	}
}
