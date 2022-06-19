import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/presentation/pages/login";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
