import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";
import { users } from "./users";

export class UsersDatabase {
  public create(user: User) {
    users.push(user);
  }
  public list() {
    return [...users];
  }
  public getByCpf(cpf: string) {
    return users.find((user) => user.cpf === cpf);
  }
  public get(id: string) {
    return users.find((user) => user.id === id);
  }
  public getIndex(id: string) {
    return users.findIndex((user) => user.id === id);
  }
  public delete(index: number) {
    return users.splice(index, 1);
  }
}
