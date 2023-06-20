import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';
let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users end to end', () => {
	it('Register error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'test@example.com', password: 'example' });
		expect(res.statusCode).toBe(422);
	});
	it('Login error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@example.com', password: 'example' });
		expect(res.body.jwt).not.toBeUndefined();
	});
});

afterAll(() => {
	application.close();
});
