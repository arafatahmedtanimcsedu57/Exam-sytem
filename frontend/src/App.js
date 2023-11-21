import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import store from "./store";

import "./App.less";

import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
// import TraineeRegister from "./components/trainee/register/traineeregister";
// import MainPortal from "./components/trainee/examPortal/portal";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,

        token: {
          colorPrimary: "#5a5ab5",
          colorError: "#ff8399",
          colorWarning: "#f8da9d",
          fontFamily: '"Roboto Slab", serif',
        },
      }}
    >
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
    </ConfigProvider>
  );
}

export default App;
