import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import faker from "@faker-js/faker";
import Login from ".";
import { InvalidCredentialsError } from "@/domain/errors";

interface SutTypes {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
}

interface SutParams {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );
  return {
    sut,
    authenticationSpy,
  };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
  fireEvent.click(submitButton);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateStatusFormField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || "");
  expect(status.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("Login component", () => {
  afterEach(cleanup);

  test("should start with initial state", () => {
    const validationError = faker.random.words();

    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    simulateStatusFormField(sut, "email", validationError);
    simulateStatusFormField(sut, "password", validationError);
  });

  test("should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);

    simulateStatusFormField(sut, "email", validationError);
  });

  test("should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);
    simulateStatusFormField(sut, "password", validationError);
  });

  test("should show valid email state if validation suceeds", () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    simulateStatusFormField(sut, "email");
  });

  test("should show valid password state if validation suceeds", () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    simulateStatusFormField(sut, "password");
  });

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test("Should show spinner on submit", () => {
    const { sut } = makeSut();

    simulateValidSubmit(sut);
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test("Should call Authentication only once", () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test("Should not call Authentication if form is invalid", () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    populateEmailField(sut);
    const form = sut.getByTestId("form");
    fireEvent.submit(form);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  //   test("Should present error if Authentication fails", async () => {
  //     const { sut, authenticationSpy } = makeSut();
  //     const error = new InvalidCredentialsError();
  //     jest
  //       .spyOn(authenticationSpy, "auth")
  //       .mockReturnValueOnce(Promise.reject(error));
  //     simulateValidSubmit(sut);

  //     const errorWrap = sut.getByTestId("error-wrap");
  //     await waitFor(() => errorWrap);

  //     const mainError = sut.getByTestId("main-error");
  //     expect(mainError.textContent).toBe(error.message);
  //     expect(errorWrap.childElementCount).toBe(1);
  //   });
});
