import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/entities/user.entity";
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User();
		user.username = createUserDto.username;
		user.password = createUserDto.password;

		return this.usersRepository.save(user);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(id: string): Promise<User> {
		return this.usersRepository.findOne(id);
	}

	findByUsername(username: string): Promise<User> {
		return this.usersRepository.findOne({ username })
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}