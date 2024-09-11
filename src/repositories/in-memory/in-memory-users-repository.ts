import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { FindManyByLocation, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []

	async findById(id: string) {
		const user = this.items.find((item) => item.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async findManyByLocation(filters: FindManyByLocation) {
		const filterByLocation = this.items.filter((user) => {
			const filterState = user.state === filters.state
			const filterCity = user.city === filters.city

			return filterState && filterCity
		})

		const pickProperties = filterByLocation.map(
			({ id, name, organization }) => {
				return {
					id,
					name,
					organization,
				}
			},
		)

		return pickProperties
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			organization: data.organization ?? null,
			email: data.email,
			whatsapp_number: data.whatsapp_number,
			password_hash: data.password_hash,
			address: data.address,
			neighborhood: data.neighborhood,
			zip_code: data.zip_code,
			state: data.state,
			city: data.city,
			created_at: new Date(),
		}

		this.items.push(user)

		return user
	}

	async update(id: string, data: Prisma.UserUncheckedCreateInput) {
		const userIndex = this.items.findIndex((pet) => pet.id === id)

		const { id: user_id } = this.items[userIndex]

		this.items[userIndex] = {
			id: user_id,
			name: data.name,
			organization: data.organization ?? null,
			email: data.email,
			whatsapp_number: data.whatsapp_number,
			address: data.address,
			neighborhood: data.neighborhood,
			city: data.city,
			state: data.state,
			zip_code: data.zip_code,
			created_at: new Date(),
			password_hash: data.password_hash,
		}

		return this.items[userIndex]
	}
}
