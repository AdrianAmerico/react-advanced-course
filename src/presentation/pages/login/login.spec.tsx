import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import faker from "@faker-js/faker";
import Login from ".";
import "jest-localstorage-mock";
import { MemoryRouter } from "react-router-dom";

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
    <MemoryRouter>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </MemoryRouter>
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

const testStatusFormField = (
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
  beforeEach(() => {
    localStorage.clear();
  });

  test("should start with initial state", () => {
    const validationError = faker.random.words();

    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    testStatusFormField(sut, "email", validationError);
    testStatusFormField(sut, "password", validationError);
  });

  test("should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);

    testStatusFormField(sut, "email", validationError);
  });

  test("should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);
    testStatusFormField(sut, "password", validationError);
  });

  test("should show valid email state if validation suceeds", () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    testStatusFormField(sut, "email");
  });

  test("should show valid password state if validation suceeds", () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    testStatusFormField(sut, "password");
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

  //   test("Should add error accessToken to localStorage onSuccess", async () => {
  //     const { sut, authenticationSpy } = makeSut();

  //     simulateValidSubmit(sut);
  //     await waitFor(() => sut.getByTestId("form"));
  //     expect(localStorage.setItem).toHaveBeenCalledWith(
  //       "accessToken",
  //       authenticationSpy.account.accessToken
  //     );
  //   });
});
