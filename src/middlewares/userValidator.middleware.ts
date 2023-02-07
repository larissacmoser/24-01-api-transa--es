import { NextFunction, Request, Response } from "express";
import { UsersDatabase } from "../database/user.database";

export class UserValidatorMiddleware {
  public static userAlreadyExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provided",
        });
      }
      next();
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
