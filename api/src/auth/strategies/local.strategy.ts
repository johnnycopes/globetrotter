import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from "src/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

	constructor(private _authService: AuthService) {
		super();
	}

	public async validate(username: string, password: string): Promise<User | void> {
		const user = await this._authService.validateUser(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
	
}