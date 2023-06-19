import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { TYPES } from '../users/types';
import { BaseEntity } from '../common/base.entity';

@injectable()
export class ConfigService extends BaseEntity implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		super('ConfigService');
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Could not read .env file', this.name);
		} else {
			this.logger.log('Config loaded', this.name);
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
