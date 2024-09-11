import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { UpdatePetService } from '../update-pet'

export function makeUpdatePetService() {
	const petsRepository = new PrismaPetsRepository()
	const service = new UpdatePetService(petsRepository)

	return service
}
