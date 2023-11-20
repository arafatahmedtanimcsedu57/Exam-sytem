import React from "react";
import { Button, Result } from "antd";
import { permissionErorrStruct, notFoundErorrStruct } from "./struct";

export const PermissionError = () => {
  return (
    <Result
      {...permissionErorrStruct}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export const NotFoundError = () => {
  return (
    <Result
      {...notFoundErorrStruct}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};
