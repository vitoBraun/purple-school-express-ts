import { Logger } from 'tslog';

export interface ILogger {
	logger: Logger;
	getMessageString: (...args: string[]) => string;
	log: (...args: string[]) => void;
	error: (...args: string[]) => void;
	warn: (...args: string[]) => void;
}
