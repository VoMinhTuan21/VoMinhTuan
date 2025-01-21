import { myDatabase } from "../config/database";
import { CreateUserDTO, UpdateUserDTO, UserFilter } from "../dto/user.dto";
import { User } from "../entities/user";
import { Repository } from "typeorm";

export class UsersService {
	private readonly userRepository: Repository<User>;

	constructor() {
		this.userRepository = myDatabase.getRepository(User);
	}

	get = async (id: number): Promise<User> => {
		const user = await this.userRepository
			.createQueryBuilder("user")
			.where("user.id = :id", { id })
			.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
			.getOne();

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	};

	create = async (data: CreateUserDTO): Promise<User> => {
		const emailUser = await this.userRepository
			.createQueryBuilder("user")
			.where("user.email = :email", { email: data.email })
			.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
			.getOne();

		if (emailUser) {
			throw new Error("Please use another email");
		}

		const phoneUser = await this.userRepository
			.createQueryBuilder("user")
			.where("user.phoneNumbers = :phoneNumbers", { phoneNumbers: data.phoneNumbers })
			.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
			.getOne();
		if (phoneUser) {
			throw new Error("Please use another phone number");
		}

		const user = await this.userRepository.create({
			...data,
			status: "Happy",
		});

		const result = await this.userRepository.save(user);

		return result;
	};

	update = async (data: UpdateUserDTO): Promise<User> => {
		let user = await this.userRepository
			.createQueryBuilder("user")
			.where("user.id = :id", { id: data.id })
			.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
			.getOne();
		if (!user) {
			throw new Error("User not found");
		}

		if (data.email) {
			const emailUser = await this.userRepository
				.createQueryBuilder("user")
				.where("user.email = :email", { email: data.email })
				.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
				.getOne();
			if (emailUser && emailUser.id !== user.id) {
				throw new Error("Please use another email");
			}
		}

		if (data.phoneNumbers) {
			const phoneUser = await this.userRepository
				.createQueryBuilder("user")
				.where("user.phoneNumbers = :phoneNumbers", { phoneNumbers: data.phoneNumbers })
				.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
				.getOne();
			if (phoneUser && phoneUser.id !== user.id) {
				throw new Error("Please use another phone number");
			}
		}

		user = { ...user, ...data };

		const result = await this.userRepository.save(user);

		return result;
	};

	delete = async (id: number): Promise<boolean> => {
		let user = await this.userRepository
			.createQueryBuilder("user")
			.where("user.id = :id", { id })
			.andWhere("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false })
			.getOne();

		if (!user) {
			throw new Error("User not found");
		}

		user.isDeleted = true;

		await this.userRepository.save(user);

		return true;
	};

	find = async (filter: UserFilter): Promise<User[]> => {
		const queryBuilder = this.userRepository
			.createQueryBuilder("user")
			.where("(user.isDeleted = :isDeleted OR user.isDeleted IS NULL)", { isDeleted: false });

		if (filter.keyword) {
			queryBuilder.andWhere("(user.name LIKE :keyword OR user.email LIKE :keyword)", { keyword: `%${filter.keyword}%` });
		}

		if (filter.status) {
			queryBuilder.andWhere("user.status = :status", { status: filter.status });
		}

		const results = queryBuilder.getMany();

		return results;
	};
}
