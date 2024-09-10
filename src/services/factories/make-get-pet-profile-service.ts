import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { GetPetProfileService } from '../get-pet-profile'

export function makeGetPetProfileService() {
	const petsRepository = new PrismaPetsRepository()
	const service = new GetPetProfileService(petsRepository)

	return service
}
