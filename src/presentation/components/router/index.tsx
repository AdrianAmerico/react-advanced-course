import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ValidationStub } from "@/presentation/test";
import Login from "@/presentation/pages/login";

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login validation={new ValidationStub()} />} />
            </Routes>
        </BrowserRouter>
    )
}
