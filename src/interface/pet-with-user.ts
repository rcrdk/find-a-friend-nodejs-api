import { Pet, User } from '@prisma/client'

export interface PetWithUser extends Pet {
	user?: User
}
