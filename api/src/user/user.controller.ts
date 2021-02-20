import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "src/entities/user.entity";

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) { }

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<User> {
		return this.userService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.userService.remove(id);
	}
}
