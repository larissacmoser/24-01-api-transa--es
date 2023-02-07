import { v4 as createUuid } from "uuid";

export class Transaction {
  private _id: string;

  constructor(
    public title: string,
    public value: number,
    public type: "income" | "outcome"
  ) {
    this._id = createUuid();
  }
  public get id() {
    return this._id;
  }
}
