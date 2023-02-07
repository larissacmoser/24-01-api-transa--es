import { Transaction } from "./transaction.model";
import { v4 as createUuid } from "uuid";

export class User {
  private _id: string;

  constructor(
    private _name: string,
    private _cpf: string,
    private _email: string,
    private _age: number,
    private _transactions: Transaction[] = []
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }
  public set id(id: string) {
    this._id = id;
  }
  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get cpf() {
    return this._cpf;
  }

  public set cpf(cpf: string) {
    this._cpf = cpf;
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }
  public get age() {
    return this._age;
  }

  public set age(age: number) {
    this._age = age;
  }

  public get transactions() {
    return this._transactions;
  }

  public set transactions(transactions: Transaction[]) {
    this._transactions = transactions;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      age: this._age,
      email: this._email,
      cpf: this._cpf,
      transactions: this._transactions,
    };
  }
}
