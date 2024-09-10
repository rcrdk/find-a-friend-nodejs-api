import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { PetWithUser } from '@/interface/pet-with-user'
import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetProfileServiceRequest {
	petId: string
}

interface GetPetProfileServiceResponse {
	pet: PetWithUser
}

export class GetPetProfileService {
	constructor(private petsRepository: PetsRepository) {}

	async handle({
		petId,
	}: GetPetProfileServiceRequest): Promise<GetPetProfileServiceResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new ResourceNotFoundError()
		}

		return {
			pet,
		}
	}
}
