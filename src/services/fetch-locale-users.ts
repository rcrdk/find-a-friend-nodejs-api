import { UserNameOrganization } from '@/interface/user-name-organization'
import { UsersRepository } from '@/repositories/users-repository'

interface FetchLocaleUsersServiceRequest {
	city: string
	state: string
}

interface FetchLocaleUsersServiceResponse {
	users: UserNameOrganization[]
}

export class FetchLocaleUsersService {
	constructor(private usersRepository: UsersRepository) {}

	async handle({
		city,
		state,
	}: FetchLocaleUsersServiceRequest): Promise<FetchLocaleUsersServiceResponse> {
		const users = await this.usersRepository.findManyByLocation({
			city,
			state,
		})

		return {
			users,
		}
	}
}
