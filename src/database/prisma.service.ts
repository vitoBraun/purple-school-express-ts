import { ILogger } from './../logger/logger.interface';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../users/types';

@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}
	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('Connected to Prisma', 'DataBase');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`Problem with connecting to database: ${e.message}`, 'DataBase');
			}
		}
	}
	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('Prisma disconnected from DB');
	}
}
