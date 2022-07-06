import React from "react";
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react"
import { ValidationStub } from "@/presentation/test";
import Login from "."
import faker from "@faker-js/faker";

interface SutTypes {
    sut: RenderResult
}

interface SutParams {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError

    const sut = render(<Login validation={validationStub} />)
    return {
        sut,
    }
}

describe("Login component", () => {
    afterEach(cleanup)

    test("should start with initial state", () => {
        const validationError = faker.random.words()

        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId("error-wrap")
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = sut.getByTestId("submit") as HTMLButtonElement
        expect(submitButton.disabled).toBeTruthy()

        const emailStatus = sut.getByTestId("email-status")
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe("🔴")

        const passwordStatus = sut.getByTestId("password-status")
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe("🔴")
    });

    test("should show email error if Validation fails", () => {
        const validationError = faker.random.words()

        const { sut } = makeSut({ validationError })

        const emailInput = sut.getByTestId("email")

        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId("email-status")
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe("🔴")
    })

    test("should show password error if Validation fails", () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const passwordInput = sut.getByTestId("password")

        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId("password-status")
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe("🔴")
    })

    test("should show valid email state if validation suceeds", () => {
        const { sut } = makeSut()

        const emailInput = sut.getByTestId("email")

        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId("email-status")
        expect(emailStatus.title).toBe("")
        expect(emailStatus.textContent).toBe("🟢")
    })

    test("should show valid password state if validation suceeds", () => {
        const { sut } = makeSut()

        const passwordInput = sut.getByTestId("password")

        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId("password-status")
        expect(passwordStatus.title).toBe("")
        expect(passwordStatus.textContent).toBe("🟢")
    })

    test("Should enable submit button if form is valid", () => {
        const { sut } = makeSut()

        const emailInput = sut.getByTestId("email")
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const passwordInput = sut.getByTestId("password")
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const submitButton = sut.getByTestId("submit") as HTMLButtonElement
        expect(submitButton.disabled).toBeFalsy()
    })

    test("Should show spinner on submit", () => {
        const { sut } = makeSut()

        const emailInput = sut.getByTestId("email")
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const passwordInput = sut.getByTestId("password")
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const submitButton = sut.getByTestId("submit") as HTMLButtonElement
        fireEvent.click(submitButton)
        const spinner = sut.getByTestId("spinner")
        expect(spinner).toBeTruthy()
    })
})
