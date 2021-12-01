import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.findByUsernameAndPassword(
			username,
			password,
		);

		if (user && user.password === password) {
			const { username, email, _id, __v } = user;
			return { username, email, _id, __v };
		}

		return null;
	}

	async login(user: any) {
		const payload = {
			username: user.username,
			sub: user._id,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
