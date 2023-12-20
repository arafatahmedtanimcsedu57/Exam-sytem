import React from "react";
import { Typography, Alert, Card, Divider, List } from "antd";

const { Title, Text } = Typography;

export default function trainerInstraction() {
  return (
    <Card>
      <Title level={2}>Trainer Instructions</Title>
      <Divider />

      <List>
        <List.Item>
          <List.Item.Meta
            title={"All Questions"}
            description={
              <>
                <Text>List of existing questions.</Text>
                <ul>
                  <li>
                    Add New - <Text strong>Create new question.</Text>
                  </li>
                  <li>
                    Action -
                    <ul>
                      <li>
                        <Text strong type="success">
                          Question details & body.
                        </Text>
                      </li>
                      <li>
                        <Text strong type="warning">
                          Delete question.
                        </Text>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            }
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            title={"All Tests"}
            description={
              <>
                <Text>List of existing tests</Text>
                <ul>
                  <li>
                    Add New - <Text strong>Test Details</Text>
                  </li>
                  <li>
                    Action -
                    {/* <ul>
                      <li>
                        <Text strong type="success">
                          Question details & body.
                        </Text>
                      </li>
                      <li>
                        <Text strong type="warning">
                          Delete question.
                        </Text>
                      </li>
                    </ul> */}
                  </li>
                </ul>
              </>
            }
          />
        </List.Item>
      </List>

      <Alert
        showIcon
        type="warning"
        message="A link for this test has been sent to the email id of
          registered trainees. Click on the link to take test."
      />
    </Card>
  );
}
