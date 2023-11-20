import React from "react";
import { Typography, Alert } from "antd";

const { Title } = Typography;

export default function trainerInstraction() {
  return (
    <>
      <Title level={2}>Trainer Instructions</Title>
      <Title level={3}>1. All Questions</Title>
      <Title level={4}> List of existing questions.</Title>
      <ul>
        <li>Add New - Create new question.</li>
        <li>
          Action -
          <ul>
            <li>Question details & body.</li>
            <li>Delete question.</li>{" "}
          </ul>
        </li>
      </ul>

      <Title level={3}>2. All Tests</Title>
      <Title level={4}> List of existing tests</Title>
      <ul>
        <li>
          Action -
          <ul>
            <li>Test Details</li>
            <li>Test Questions</li>
            <li>Trainees - List of Registered Candidates</li>
            <li>
              Statistics -{" "}
              <ul>
                <li>Download excel sheet of results</li>
                <li>Graphical representation of results</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <Title level={3}>3. New Tests</Title>
      <ul>
        <li>Create new test</li>
        <ol>
          <li>Enter basic test details</li>
          <li>Select Questions</li>
          <ul>
            <li>
              Questions - Random -- Enter number of questions to be selected
              automatically and click Generate Test Paper. Click Next to
              proceed.
            </li>
            <li>
              Questions - Manually -- Select Questions manually . Click Next to
              proceed.
            </li>
          </ul>
        </ol>
        <li>Basic test info</li>
        <ul>
          <li>
            Registration link - The link for Registration of trainee for the
            test.
          </li>
          <li>Stop Registration - Click to disable Registration Link.</li>
          <li>Reload - Click to get the list of registered candidates.</li>
          <li>Start Test - Click to begin test.</li>
          <li>End Test - Click to end test.</li>
        </ul>
      </ul>
      <Alert
        showIcon
        type="warning"
        message="A link for this test has been sent to the email id of
          registered trainees. Click on the link to take test."
      />
    </>
  );
}
