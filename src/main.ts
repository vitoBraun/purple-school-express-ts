import { Container } from "inversify";
import { App } from "./app";
import { ExecptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./users/types";
import { UserController } from "./users/users.controller";
import { IExeptionFilter } from "./errors/exeption.filter.interface";

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExecptionFilter).to(ExecptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
