import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyByFiltersParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: { id },
			include: { user: true },
		})

		return pet
	}

	async findManyByFilters(filters: FindManyByFiltersParams) {
		const pets = await prisma.pet.findMany({
			include: {
				user: true,
			},
			where: {
				user: {
					state: filters.state,
					city: filters.city,
				},
				energy: filters.energy,
				age: filters.age,
				size: filters.size,
				independency: filters.independency,
				kind_of: filters.kindOf,
			},
		})

		return pets
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data,
		})

		return pet
	}
}
