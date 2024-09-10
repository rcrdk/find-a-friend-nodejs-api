import { PetType } from '@prisma/client'

import { PetWithUser } from '@/interface/pet-with-user'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsServiceRequest {
	page: number
	city: string
	state: string
	kindOf?: PetType
	age?: string
	size?: string
	energy?: number
	independency?: string
	environment?: string
}

interface SearchPetsServiceResponse {
	pets: PetWithUser[]
}

export class SearchPetsService {
	constructor(private petsRepository: PetsRepository) {}

	async handle({
		page,
		city,
		state,
		kindOf,
		age,
		size,
		energy,
		independency,
		environment,
	}: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
		const pets = await this.petsRepository.findManyByFilters({
			page,
			city,
			state,
			kindOf,
			age,
			size,
			energy,
			independency,
			environment,
		})

		return {
			pets,
		}
	}
}
