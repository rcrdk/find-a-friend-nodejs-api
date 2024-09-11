import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { UpdateUserService } from '../update-user'

export function makeUpdateUserService() {
	const usersRepository = new PrismaUsersRepository()
	const service = new UpdateUserService(usersRepository)

	return service
}
