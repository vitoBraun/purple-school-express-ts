import { BaseEntity } from '../common/base.entity';

export interface IConfigService extends BaseEntity {
	get: (key: string) => string;
}
