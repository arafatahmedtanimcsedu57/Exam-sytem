import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";

import "./App.css";

import Homepage from "./components/basic/homepage/homepage";
import Dashboard from "./components/Dashboard";
// import TraineeRegister from "./components/trainee/register/traineeregister";
// import MainPortal from "./components/trainee/examPortal/portal";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/user" element={<Dashboard />} />
          <Route path="/user/:options" element={<Dashboard />} />
          {/*<Route exact path="/trainee/register" element={<TraineeRegister/>} />
          <Route exact path="/trainee/taketest" element={<MainPortal/>} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
