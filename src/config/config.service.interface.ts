import { BaseEntity } from '../common/base.entity';

export interface IConfigService {
	get: (key: string) => string;
}
