import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-regiter.dto';
import { User } from './user.entity';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}