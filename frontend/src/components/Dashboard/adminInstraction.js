import React from "react";
import { Typography, Card } from "antd";

const { Title } = Typography;

export default function adminInstraction() {
  return (
    <Card>
      <Title level={2}>Admin Instructions</Title>

      <Title level={3}>1. All Trainers</Title>
      <Title level={4}>List of existing trainers.</Title>
      <ul>
        <li>Add New - Create new trainer account.</li>
        <li>
          Action -
          <ul>
            <li>Edit trainer details.</li>
            <li>Delete trainer account.</li>
          </ul>
        </li>
      </ul>

      <Title level={3}>2. All Courses</Title>
      <Title level={4}> List of existing courses.</Title>
      <ul>
        <li>Add New - Create new course </li>
        <li>
          Action -
          <ul>
            <li>Edit course name.</li>
          </ul>
        </li>
      </ul>
    </Card>
  );
}
