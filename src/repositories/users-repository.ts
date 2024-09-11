import { Prisma, User } from '@prisma/client'

import { UserNameOrganization } from '@/interface/user-name-organization'

export interface FindManyByLocation {
	state: string
	city: string
}

export interface UsersRepository {
	findById(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	findManyByLocation(
		filters: FindManyByLocation,
	): Promise<UserNameOrganization[]>
	create(data: Prisma.UserCreateInput): Promise<User>
}
