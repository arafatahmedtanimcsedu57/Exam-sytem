import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "./store";

import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

import TraineeRegistration from "./components/trainee/TraineeRegistration";
import MainPortal from "./components/trainee/ExamPortal";

import "./global.css";
import "./App.less";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/user" element={<Dashboard />} />
          <Route path="/user/:options" element={<Dashboard />} />
          <Route
            exact
            path="/trainee/register"
            element={<TraineeRegistration />}
          />
          <Route exact path="/trainee/taketest" element={<MainPortal />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
