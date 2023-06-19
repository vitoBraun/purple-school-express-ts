import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../users/types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-regiter.dto';
import { IUserService } from './users.sevice.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				function: this.register,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				function: this.login,
				middleware: [new ValidateMiddleware(UserLoginDto)],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { body } = req;
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HttpError(400, 'Invalid credentials', 'login'));
		}
		this.ok(res, 'Logged in successfully');
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpError(422, 'The user is already existing', this.name));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
