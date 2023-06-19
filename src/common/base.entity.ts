import { injectable } from 'inversify';

@injectable()
export class BaseEntity {
	protected _name: string;
	constructor(private readonly entityName?: string) {
		if (entityName) {
			this._name = entityName;
		} else {
			this._name = 'application module';
		}
	}
	get name(): string {
		return this._name;
	}
}
