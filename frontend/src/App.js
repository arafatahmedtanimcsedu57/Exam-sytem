import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme, Button, Card } from "antd";

import store from "./store";

import "./global.css";
import "./App.less";

import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

import TraineeRegister from "./components/trainee/register/TraineeRegister";
import MainPortal from "./components/trainee/ExamPortal";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/user" element={<Dashboard />} />
          <Route path="/user/:options" element={<Dashboard />} />
          <Route exact path="/trainee/register" element={<TraineeRegister />} />
          <Route exact path="/trainee/taketest" element={<MainPortal />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
