import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/presentation/pages/login/login";
import "@/presentation/styles/global.scss";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
