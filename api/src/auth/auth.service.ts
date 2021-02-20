import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { JwtDto } from "src/dto/jwt.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {

	constructor(
		private _userService: UserService,
		private _jwtService: JwtService,
	) { }

	public async validateUser(username: string, password: string): Promise<User | null> {
		const user = await this._userService.findByUsername(username);
		if (user && user.password === password) {
			return user;
		}
		return null;
	}

	public async login(user: User): Promise<JwtDto> {
		const payload = {
			username: user.username,
			sub: user.id
		};
		return {
			access_token: this._jwtService.sign(payload)
		};
	}
}
