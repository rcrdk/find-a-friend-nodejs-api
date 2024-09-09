import { PetType } from '@prisma/client'

import { PetWithUser } from '@/interface/pet-with-user'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetServiceRequest {
	name: string
	kindOf: PetType
	about: string
	age: string
	size: string
	energy: number
	independency: string
	environment: string
	userId: string
}

interface CreatePetServiceResponse {
	pet: PetWithUser
}

export class CreatePetService {
	constructor(private petsRepository: PetsRepository) {}

	async handle({
		name,
		kindOf,
		about,
		age,
		size,
		energy,
		independency,
		environment,
		userId,
	}: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
		const pet = await this.petsRepository.create({
			name,
			kind_of: kindOf,
			about,
			age,
			size,
			energy,
			independency,
			environment,
			user_id: userId,
		})

		return {
			pet,
		}
	}
}
