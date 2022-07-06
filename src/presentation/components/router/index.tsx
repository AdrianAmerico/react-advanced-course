import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/presentation/pages/login";
import { Validation } from "@/presentation/protocols";
class ValidationSpy implements Validation {
    errorMessage: string
    input: object

    validate(input: object): string {
        this.input = input
        return this.errorMessage
    }
}
export const Router = () => {
    const validationSpy = new ValidationSpy()
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login validation={validationSpy} />} />
            </Routes>
        </BrowserRouter>
    )
}
