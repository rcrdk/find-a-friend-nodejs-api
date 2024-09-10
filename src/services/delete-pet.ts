import { PetWithUser } from '@/interface/pet-with-user'
import { PetsRepository } from '@/repositories/pets-repository'

interface DeletePetServiceRequest {
	petId: string
}

interface DeletePetServiceResponse {
	pet: PetWithUser
}

export class DeletePetService {
	constructor(private petsRepository: PetsRepository) {}

	async handle({
		petId,
	}: DeletePetServiceRequest): Promise<DeletePetServiceResponse> {
		const pet = await this.petsRepository.delete(petId)

		return {
			pet,
		}
	}
}
