import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;
	private messageString = '';

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}
	getMessageString(...args: string[]): string {
		if (args.length > 1) {
			this.messageString = `[${args[1]}] ${args[0]} ${args.slice(2).join(' ')}`;
		} else {
			this.messageString = `${args[0]}`;
		}
		return this.messageString;
	}

	log(...args: string[]): void {
		this.logger.info(this.getMessageString(...args));
	}
	error(...args: string[]): void {
		this.logger.error(this.getMessageString(...args));
	}
	warn(...args: string[]): void {
		this.logger.warn(this.getMessageString(...args));
	}
}
