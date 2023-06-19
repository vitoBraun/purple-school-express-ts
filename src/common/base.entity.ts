import { injectable } from 'inversify';

@injectable()
export class BaseEntity {
	private _name: string;
	constructor(private readonly entityName: string) {
		this._name = entityName;
	}
	get name(): string {
		return this._name;
	}
}
