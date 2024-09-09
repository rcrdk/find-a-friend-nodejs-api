import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterServiceRequest {
	name: string
	organization: string | null
	email: string
	password: string
	whatsappNumber: string
	address: string
	zipCode: string
	city: string
	state: string
	neighborhood: string
}

interface RegisterServiceResponse {
	user: User
}

export class RegisterService {
	constructor(private usersRepository: UsersRepository) {}

	async handle({
		name,
		organization,
		email,
		whatsappNumber,
		password,
		address,
		city,
		state,
		neighborhood,
		zipCode,
	}: RegisterServiceRequest): Promise<RegisterServiceResponse> {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			name,
			organization: organization ?? null,
			email,
			whatsapp_number: whatsappNumber,
			password_hash,
			address,
			city,
			state,
			neighborhood,
			zip_code: zipCode,
		})

		return { user }
	}
}
