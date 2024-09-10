import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { DeletePetService } from '../delete-pet'

export function makeDeletePetService() {
	const petsRepository = new PrismaPetsRepository()
	const service = new DeletePetService(petsRepository)

	return service
}
