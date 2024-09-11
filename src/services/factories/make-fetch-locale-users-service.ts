import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { FetchLocaleUsersService } from '../fetch-locale-users'

export function makeFetchLocaleUsersService() {
	const usersRepository = new PrismaUsersRepository()
	const service = new FetchLocaleUsersService(usersRepository)

	return service
}
