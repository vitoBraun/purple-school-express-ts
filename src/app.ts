import { ILogger } from './logger/logger.interface';
import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExecptionFilter } from "./errors/exeption.filter";

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: ILogger;
  userController: UserController;
  exeptionFilter: ExecptionFilter;
  constructor(
    logger: ILogger,
    userController: UserController,
    exeptionFilter: ExecptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRotes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRotes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`App is listening on http://localhost:${this.port}`);
  }
}
