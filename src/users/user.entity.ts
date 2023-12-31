import { hash, compare } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(private readonly _email: string, private readonly _name: string) {}
	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: string): Promise<void> {
		this._password = await hash(pass, Number(salt));
	}
	static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
		return await compare(password, hashedPassword);
	}
}
