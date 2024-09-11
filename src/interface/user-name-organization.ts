import { User } from '@prisma/client'

export interface UserNameOrganization
	extends Pick<User, 'id' | 'name' | 'organization'> {}
