import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyByLocation, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findUnique({ where: { id } })

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } })

		return user
	}

	async findManyByLocation(filters: FindManyByLocation) {
		const users = await prisma.user.findMany({
			where: {
				state: {
					equals: filters.state,
					mode: 'insensitive',
				},
				city: {
					equals: filters.city,
					mode: 'insensitive',
				},
			},
			select: {
				name: true,
				organization: true,
				id: true,
			},
		})

		return users
	}

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		})

		return user
	}
}
