import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { Request } from 'express';
import { AuthService } from "./auth/auth.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtDto } from "./dto/jwt.dto";
import { User } from "./entities/user.entity";

@Controller()
export class AppController {
	constructor(private _authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	public async login(@Req() req: Request): Promise<JwtDto> {
		return this._authService.login(req.user as User);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Req() req: Request) {
		return req.user;
	}

}
