export class RequiredFieldError extends Error {
  constructor() {
    super("campo obrigatório");
    this.name = "RequiredFieldError";
  }
}
