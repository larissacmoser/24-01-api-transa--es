import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { TransactionController } from "../controllers/transaction.controller";
import { CpfValidatorMiddleware } from "../middlewares/cpfValidator.middleware";
import { UserValidatorMiddleware } from "../middlewares/userValidator.middleware";

export const userRoutes = () => {
  const app = Router();

  app.post(
    "/users",
    CpfValidatorMiddleware.cpfAlreadyExists,
    new UserController().create
  );

  app.get("/users", new UserController().list);
  app.get("/users/listComplete", new UserController().listComplete);
  app.get("/users/:userId", new UserController().get);
  app.get(
    "/users/:userId/transactions",
    UserValidatorMiddleware.userAlreadyExists,
    new TransactionController().returnTransactions
  );
  app.get(
    "/users/:userId/transactions/:id",
    UserValidatorMiddleware.userAlreadyExists,
    new TransactionController().returnTransaction
  );
  app.put("/users/:id", new UserController().edit);
  app.put(
    "/users/:userId/transactions/:id",
    UserValidatorMiddleware.userAlreadyExists,
    new TransactionController().edit
  );
  app.delete("/users/:id", new UserController().delete);
  app.delete(
    "/users/:userId/transactions/:id",
    UserValidatorMiddleware.userAlreadyExists,
    new TransactionController().delete
  );
  app.post(
    "/users/:userId/transactions",
    UserValidatorMiddleware.userAlreadyExists,
    new TransactionController().createTransaction
  );

  return app;
};
