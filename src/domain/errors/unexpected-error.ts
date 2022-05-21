export class UnexpectedError extends Error {
  constructor() {
    super("Algo de errado aconteceu.  Tente novamentem em breve");
    this.name = "UnexpectedError";
  }
}
