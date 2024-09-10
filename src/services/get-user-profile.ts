import { User } from '@prisma/client'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'

interface GetUserProfileServiceRequest {
	userId: string
}

interface GetUserProfileServiceResponse {
	user: User
}

export class GetUserProfileService {
	constructor(private usersRepository: UsersRepository) {}

	async handle({
		userId,
	}: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFoundError()
		}

		return {
			user,
		}
	}
}
