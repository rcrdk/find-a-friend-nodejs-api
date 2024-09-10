import { Pet, PetType, Prisma } from '@prisma/client'

import { PetWithUser } from '@/interface/pet-with-user'

export interface FindManyByFiltersParams {
	page: number
	city: string
	state: string
	age?: string
	energy?: number
	size?: string
	independency?: string
	environment?: string
	kindOf?: PetType
}

export interface PetsRepository {
	findById(id: string): Promise<PetWithUser | null>
	findManyByFilters(filters: FindManyByFiltersParams): Promise<PetWithUser[]>
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
