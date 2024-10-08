import { Pet, User } from '@prisma/client'

export interface PetWithUser extends Pet {
	user?: Omit<User, 'password_hash' | 'created_at'>
}
