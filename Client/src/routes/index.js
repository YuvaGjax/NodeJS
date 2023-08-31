import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login";
import CreateUser from "../login/create";
import DashBoard from "../pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
