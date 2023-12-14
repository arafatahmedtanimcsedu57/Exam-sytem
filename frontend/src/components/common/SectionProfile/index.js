import React from "react";
import moment from "moment";

import { SolutionOutlined } from "@ant-design/icons";
import { Flex, Typography, Divider, Space, Tag, Badge } from "antd";

import { sectionInfoSectionStruct, metaSectionStruct } from "./struct";

const { Text, Title } = Typography;

export const SectionProfile = (props) => {
  const section = props.details;
  const showMeta = !(props.showMeta === null || undefined)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;

  return (
    <Flex {...sectionInfoSectionStruct}>
      <Title level={5}>
        {section.subjectId.topic} ~ {section.name}
      </Title>
      <Space>
        <SolutionOutlined />
        <Text>
          <Badge
            count={section.studentIds.length}
            style={{ backgroundColor: "#52c41a" }}
          />{" "}
          students are enrolled
        </Text>
      </Space>

      {showMeta ? (
        <Flex {...metaSectionStruct}>
          <Tag color="default">{section.trainerId.name}</Tag>
          <Divider type="vertical" />

          <Tag color="processing">{section.trainerId.emailId}</Tag>
          <Divider type="vertical" />

          <Tag color="success">{section.subjectId.topic}</Tag>
          <Divider type="vertical" />

          <Text type="secondary">
            {moment(section.createdAt).format("DD/MM/YYYY")}
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
