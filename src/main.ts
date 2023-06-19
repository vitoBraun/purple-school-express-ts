import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExecptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './users/types';
import { UserController } from './users/users.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserController } from './users/users.interface';

export interface IBootsrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExecptionFilter).to(ExecptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootsrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
