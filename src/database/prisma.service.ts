import { ILogger } from './../logger/logger.interface';
import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../users/types';
import { BaseEntity } from '../common/base.entity';

@injectable()
export class PrismaService extends BaseEntity {
	client: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		super('DataBase');
		this.client = new PrismaClient();
	}
	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('Connected to Prisma', this.name);
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`Connection failed`, this.name, e.message);
			}
		}
	}
	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('Prisma disconnected from DB');
	}
}
