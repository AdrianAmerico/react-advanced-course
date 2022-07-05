import React from "react";
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react"
import { Validation } from "@/presentation/protocols";
import Login from "."

interface SutTypes {
    sut: RenderResult
    validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
    errorMessage: string

    validate(input: object): string {
        return this.errorMessage
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy} />)

    return {
        sut,
        validationSpy
    }
}

describe("Login component", () => {
    afterEach(cleanup)

    test("should start with initial state", () => {
        const { sut } = makeSut()

        const errorWrap = sut.getByTestId("error-wrap")
        expect(errorWrap.childElementCount).toBe(0)

        const submitButton = sut.getByTestId("submit") as HTMLButtonElement
        expect(submitButton.disabled).toBeTruthy()


        const emailStatus = sut.getByTestId("email-status")
        expect(emailStatus.title).toBe("Campo obrigatório")
        expect(emailStatus.textContent).toBe("🔴")

        const passwordStatus = sut.getByTestId("password-status")
        expect(passwordStatus.title).toBe("Campo obrigatório")
        expect(passwordStatus.textContent).toBe("🔴")
    });

    test("should call Validation with correct values", () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId("email-input")
        fireEvent.input(emailInput, { target: { value: 'any_email' } })

        expect(validationSpy.input).toEqual({
            email: "any_email"
        })
    })
})
