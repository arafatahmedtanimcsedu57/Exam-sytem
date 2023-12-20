import React from "react";
import moment from "moment";

import { SolutionOutlined } from "@ant-design/icons";
import { Flex, Typography, Divider, Space, Tag, Badge } from "antd";

import { sectionInfoSectionStruct } from "./struct";

const { Text, Title } = Typography;

export const SectionProfile = (props) => {
  const section = props.details;
  const showMeta = !(props.showMeta === null || undefined)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;

  return (
    <Flex {...sectionInfoSectionStruct.sectionInfo}>
      <Title {...sectionInfoSectionStruct.title}>
        {section.subjectId.topic} ~ {section.name}
      </Title>
      <Text {...sectionInfoSectionStruct.semesterText}>
        {section.semesterId.name} ~ {section.semesterId.year}
      </Text>
      <Space>
        <SolutionOutlined />
        <Badge
          count={section.studentIds.length}
          {...sectionInfoSectionStruct.badge}
        />
        <Text>students are enrolled</Text>
      </Space>

      {showMeta ? (
        <Flex {...sectionInfoSectionStruct.metaSectionStruct.metaSection}>
          <Tag {...sectionInfoSectionStruct.metaSectionStruct.nameTag}>
            {section.trainerId.name}
          </Tag>
          <Divider {...sectionInfoSectionStruct.metaSectionStruct.divider} />

          <Tag {...sectionInfoSectionStruct.metaSectionStruct.emailTag}>
            {section.trainerId.emailId}
          </Tag>
          <Divider {...sectionInfoSectionStruct.metaSectionStruct.divider} />

          <Tag {...sectionInfoSectionStruct.metaSectionStruct.subjectTag}>
            {section.subjectId.topic}
          </Tag>
          <Divider {...sectionInfoSectionStruct.metaSectionStruct.divider} />

          <Text {...sectionInfoSectionStruct.metaSectionStruct.dateText}>
            {moment(section.createdAt).format("DD/MM/YYYY")}
          </Text>
          {extra && (
            <>
              <Divider
                {...sectionInfoSectionStruct.metaSectionStruct.divider}
              />

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
