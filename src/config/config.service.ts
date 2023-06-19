import { inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { TYPES } from '../users/types';

export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Could not read .env file');
		} else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
