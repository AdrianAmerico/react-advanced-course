import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/presentation/pages/login";
import { Validation } from "@/presentation/protocols";

export const Router = () => {
    class ValidationSpy implements Validation {
        errorMessage: string
        fieldName: string
        fieldValue: string

        validate(fieldName: string, fieldValue: string): string {
            this.fieldName = fieldName
            this.fieldValue = fieldValue
            return this.errorMessage
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login validation={new ValidationSpy()} />} />
            </Routes>
        </BrowserRouter>
    )
}
