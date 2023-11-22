import { Descriptions } from "antd";

import { basicInfoStruct, getDescirptionStruct } from "./struct.js";

export const BasicInfo = (props) => {
  return (
    <Descriptions
      {...basicInfoStruct}
      items={[...getDescirptionStruct(props)]}
    />
  );
};
