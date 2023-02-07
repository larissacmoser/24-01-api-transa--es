import { User } from "../models/user.model";
import { UsersDatabase } from "../database/user.database";
import { Request, Response } from "express";
export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;

      const user = new User(name, cpf, email, age);

      const database = new UsersDatabase();
      database.create(user);
      return res.status(201).send("User successfully created");
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public get(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const database = new UsersDatabase();
      let user = database.get(userId);

      if (!userId) {
        return res.status(400).send("Id was not provided");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send({
        ok: true,
        message: "User successfully obtained",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          age: user.age,
        },
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
      const { id } = req.params;
      const { name, cpf, email, age } = req.body;

      const database = new UsersDatabase();
      const user = database.get(id);
      if (!id) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provided",
        });
      }

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      if (name) {
        user.name = name;
      }
      if (cpf) {
        user.cpf = cpf;
      }
      if (email) {
        user.email = email;
      }
      if (age) {
        user.age = age;
      }

      return res.status(200).send({
        ok: true,
        message: "User successfully updated",
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
      const { id } = req.params;

      const database = new UsersDatabase();
      const userIndex = database.getIndex(id);

      if (!id) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provided",
        });
      }
      if (userIndex < 0) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      database.delete(userIndex);
      return res.status(200).send({
        ok: true,
        message: "User successfully deleted",
      });
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;
      const database = new UsersDatabase();
      let users = database.list();

      if (name) {
        users = users.filter((user) => user.name === name);
      }

      if (email) {
        users = users.filter((user) => user.email === email);
      }

      if (cpf) {
        users = users.filter((user) => user.cpf === cpf);
      }

      let usersFinal = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          age: user.age,
        };
      });
      return res.status(200).send({
        ok: true,
        message: "Users successfully listed",
        data: { usersFinal },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public listComplete(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;
      const database = new UsersDatabase();
      let users = database.list();

      if (name) {
        users = users.filter((user) => user.name === name);
      }

      if (email) {
        users = users.filter((user) => user.email === email);
      }

      if (cpf) {
        users = users.filter((user) => user.cpf === cpf);
      }

      return res.status(200).send({
        ok: true,
        message: "Users successfully listed",
        data: { users },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
