import { Request, Response } from "express";
import { UsersDatabase } from "../database/user.database";
import { Transaction } from "../models/transaction.model";

export class TransactionController {
  public createTransaction(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;

      if (!title) {
        return res.status(400).send({
          ok: false,
          message: "Title is missing",
        });
      }
      if (!value) {
        return res.status(400).send({
          ok: false,
          message: "Value is missing",
        });
      }
      if (!type) {
        return res.status(400).send({
          ok: false,
          message: "Type is missing",
        });
      }
      const transaction = new Transaction(title, value, type);
      const database = new UsersDatabase();
      let myUser = database.get(userId);

      myUser?.transactions.push(transaction);
      return res.status(200).send({
        ok: true,
        message: "Transaction successfully added",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public returnTransaction(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const database = new UsersDatabase();
      let myUser = database.get(userId);
      let myTransaction = myUser?.transactions.find((transaction) => {
        return transaction.id === id;
      });
      if (myTransaction) {
        return res.status(200).send({
          ok: true,
          message: "Transaction found",
          data: myTransaction,
        });
      }
      return res.status(400).send({
        ok: false,
        message: "Transaction not found",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public returnTransactions(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new UsersDatabase();
      let myUser = database.get(userId);
      let incomes = myUser?.transactions.filter((transaction) => {
        return transaction.type == "income";
      });

      let sumIncomes = incomes?.reduce((current, total) => {
        return current + total.value;
      }, 0);
      let outcomes = myUser?.transactions.filter((transaction) => {
        return transaction.type == "outcome";
      });

      let sumOutcomes = outcomes?.reduce((current, total) => {
        return current + total.value;
      }, 0);

      let total = sumIncomes! - sumOutcomes!;
      if (myUser) {
        return res.status(200).send({
          transactions: myUser.transactions,
          balance: {
            income: sumIncomes,
            outcome: sumOutcomes,
            total: total,
          },
        });
      }
      return res.status(400).send({
        ok: false,
        message: "User not found",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public edit(req: Request, res: Response) {
    try {
      const { title, value, type } = req.body;
      const { userId, id } = req.params;
      const database = new UsersDatabase();
      let myUser = database.get(userId);
      let myTransaction = myUser?.transactions.find((transaction) => {
        return transaction.id === id;
      });
      if (!id) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provided",
        });
      }

      if (!myTransaction) {
        return res.status(404).send({
          ok: false,
          message: "Transaction not found",
        });
      }

      if (title) {
        myTransaction.title = title;
      }
      if (value) {
        myTransaction.value = value;
      }

      if (type) {
        myTransaction.type = type;
      }
      return res.status(200).send({
        ok: true,
        message: "Transaction successfully updated",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public delete(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      if (!id) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provided",
        });
      }
      const database = new UsersDatabase();
      let myUser = database.get(userId);
      if (!myUser) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }
      let transactionIndex = myUser.transactions.findIndex((transaction) => {
        return transaction.id === id;
      });

      if (transactionIndex < 0) {
        return res.status(404).send({
          ok: false,
          message: "Transaction not found",
        });
      }

      myUser.transactions.splice(transactionIndex, 1);
      return res.status(200).send({
        ok: true,
        message: "Transaction successfully deleted",
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
