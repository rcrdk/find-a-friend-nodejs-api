import { PetType } from '@prisma/client'

import { PetWithUser } from '@/interface/pet-with-user'
import { PetsRepository } from '@/repositories/pets-repository'

interface UpdatePetServiceRequest {
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

interface UpdatePetServiceResponse {
	pet: PetWithUser
}

export class UpdatePetService {
	constructor(private petsRepository: PetsRepository) {}

	async handle(
		id: string,
		{
			userId,
			name,
			kindOf,
			about,
			age,
			size,
			energy,
			independency,
			environment,
		}: UpdatePetServiceRequest,
	): Promise<UpdatePetServiceResponse> {
		const pet = await this.petsRepository.update(id, {
			user_id: userId,
			name,
			kind_of: kindOf,
			about,
			age,
			size,
			energy,
			independency,
			environment,
		})

		return {
			pet,
		}
	}
}
