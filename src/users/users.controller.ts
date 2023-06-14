import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HttpError } from "../errors/http-error.class";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", function: this.register },
      { path: "/login", method: "post", function: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.ok(res, "login");
    next(new HttpError(401, "Auth error", "login"));
  }
  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
