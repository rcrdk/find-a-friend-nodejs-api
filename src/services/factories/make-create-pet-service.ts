import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { CreatePetService } from '../create-pet'

export function makeCreatePetService() {
	const petsRepository = new PrismaPetsRepository()
	const service = new CreatePetService(petsRepository)

	return service
}
