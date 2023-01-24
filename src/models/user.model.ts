import { Transaction } from "./transaction.model";

export class User {
  private name!: string;
  private cpf!: number;
  private email!: string;
  private age!: number;
  private transactions!: Transaction[];
}
