import { NextFunction, Request, Response } from "express";
import { UsersDatabase } from "../database/user.database";

export class CpfValidatorMiddleware {
  public static cpfAlreadyExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cpf } = req.body;

      const database = new UsersDatabase();
      const user = database.getByCpf(cpf);

      if (user) {
        return res.status(400).send({
          ok: false,
          message: "User already exists",
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
