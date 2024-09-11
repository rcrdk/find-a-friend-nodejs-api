import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	// create user
	const { id: user1Id } = await prisma.user.create({
		data: {
			name: 'Johanna Does',
			organization: 'Johanna Does Organization',
			email: 'johanna@does.com',
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Avenue Janet Jackson, 00, Room 00',
			zip_code: '89120-000',
			city: 'Curitiba',
			state: 'PR',
			neighborhood: 'Centro',
		},
	})

	const { id: user2Id } = await prisma.user.create({
		data: {
			name: 'John Doe',
			organization: 'John Doe Organization',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Avenue Janet Jackson, 00, Room 00',
			zip_code: '89120-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		},
	})

	const { id: user3Id } = await prisma.user.create({
		data: {
			name: 'Janis Dont',
			organization: 'Janis Dont Organization',
			email: 'janis@dont.com',
			password_hash: await hash('123456', 6),
			whatsapp_number: '(00) 00000-0000',
			address: 'Avenue Janet Jackson, 00, Room 00',
			zip_code: '89120-000',
			city: 'Timbó',
			state: 'SC',
			neighborhood: 'Centro',
		},
	})

	// create pets
	await prisma.pet.createMany({
		data: [
			{
				name: 'Fred',
				about: "He's crazy.",
				kind_of: 'dog',
				age: 'young',
				energy: 5,
				environment: 'outside',
				independency: 'medium',
				size: 'large',
				user_id: user1Id,
				created_at: new Date(),
			},
			{
				name: 'Serena',
				about: "She's cute.",
				kind_of: 'dog',
				age: 'adult',
				energy: 4,
				environment: 'inside',
				independency: 'high',
				size: 'small',
				user_id: user1Id,
				created_at: new Date(),
			},
			{
				name: 'Pink',
				about: "She's a lovely girl.",
				kind_of: 'dog',
				age: 'adult',
				energy: 4,
				environment: 'all',
				independency: 'high',
				size: 'small',
				user_id: user2Id,
				created_at: new Date(),
			},
			{
				name: 'Meg',
				about: "She's a old girl.",
				kind_of: 'dog',
				age: 'old',
				energy: 2,
				environment: 'inside',
				independency: 'medium',
				size: 'small',
				user_id: user2Id,
				created_at: new Date(),
			},
			{
				name: 'Xana',
				about: "She's a cute little catty.",
				kind_of: 'cat',
				age: 'newborn',
				energy: 5,
				environment: 'inside',
				independency: 'low',
				size: 'small',
				user_id: user2Id,
				created_at: new Date(),
			},
			{
				name: 'Rodolfo',
				about: "He's very inteligent.",
				kind_of: 'cat',
				age: 'adult',
				energy: 4,
				environment: 'outside',
				independency: 'low',
				size: 'small',
				user_id: user2Id,
				created_at: new Date(),
			},
			{
				name: 'Snoopy',
				about: 'He is active.',
				kind_of: 'dog',
				age: 'old',
				energy: 3,
				environment: 'all',
				independency: 'medium',
				size: 'small',
				user_id: user3Id,
				created_at: new Date(),
			},
			{
				name: 'Toddy',
				about: 'He is active.',
				kind_of: 'cat',
				age: 'adult',
				energy: 4,
				environment: 'all',
				independency: 'high',
				size: 'small',
				user_id: user3Id,
				created_at: new Date(),
			},
		],
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
