import React from "react";
import moment from "moment";
import { Flex, Typography, Divider } from "antd";

import { userInfoSectionStruct, metaSectionStruct } from "./struct.js";

const { Text } = Typography;

export const UserProfile = (props) => {
  const user = props.details;
  const showMeta = !(props.showMeta === null || undefined)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;

  return (
    <Flex {...userInfoSectionStruct}>
      <Text>{user.name}</Text>
      <Text>{user.emailid}</Text>
      <Text>{user.contact}</Text>

      {showMeta ? (
        <Flex {...metaSectionStruct}>
          <Text type="secondary">
            {moment(user.createdAt).format("DD/MM/YYYY")}
          </Text>
          {extra && (
            <>
              <Divider type="vertical" />

              {extra}
            </>
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};
