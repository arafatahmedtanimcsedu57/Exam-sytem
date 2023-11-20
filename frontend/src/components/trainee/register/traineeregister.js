import React, { Component } from "react";
import {
  Alert as AntAlert,
  Form,
  Input,
  Button,
  Select,
  Typography,
} from "antd";
import queryString from "query-string";

import apis from "../../../services/Apis";
import { Post } from "../../../services/axiosCall";

import Alert from "../../common/alert";

import "./trainerRegister.css";

const { Option } = Select;

const { Title } = Typography;
class TraineeRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inform: true,
      testid: null,
      user: null,
    };
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    this.setState({
      testid: params.testid,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        console.log(this.state.testid);
        Post({
          url: apis.REGISTER_TRAINEE_FOR_TEST,
          data: {
            name: values.name,
            emailid: values.email,
            contact: `${values.prefix}${values.contact}`,
            organisation: values.organisation,
            testid: this.state.testid,
            location: values.location,
          },
        })
          .then((data) => {
            if (data.data.success) {
              this.setState({
                inform: false,
                user: data.data.user,
              });
            } else {
              this.props.form.resetFields();
              Alert("error", "Error!", data.data.message);
            }
          })
          .catch((error) => {
            this.props.form.resetFields();
            Alert("error", "Error!", "Server Error");
          });
      }
    });
  };

  resendMail = () => {
    Post({
      url: apis.RESEND_TRAINER_REGISTRATION_LINK,
      data: {
        id: this.state.user._id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          Alert("success", "Success!", "Email has been sent to your email");
        } else {
          Alert("error", "Error!", response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        Alert("error", "Error!", "Server Error");
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+880",
      rules: [{ required: true, message: "Please enter contact no prefix" }],
    })(
      <Select style={{ width: 100 }}>
        <Option value="+880">+880</Option>
      </Select>
    );
    return (
      <div className="trainee-register-container">
        {this.state.inform ? (
          <div className="trainee-register">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label="Name" hasFeedback>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please input your name" },
                  ],
                })(<Input placeholder="Name" size="large" />)}
              </Form.Item>

              <Form.Item label="Email Id" hasFeedback>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ],
                })(<Input placeholder="Email Id" size="large" />)}
              </Form.Item>
              <Form.Item label="Phone Number" hasFeedback>
                {getFieldDecorator("contact", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      len: 10,
                      message: "Contact number must be 10 digit long",
                    },
                  ],
                })(
                  <Input
                    size="large"
                    addonBefore={prefixSelector}
                    min={10}
                    max={10}
                  />
                )}
              </Form.Item>
              <Form.Item label="Organisation" hasFeedback>
                {getFieldDecorator("organisation", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your name",
                    },
                  ],
                })(<Input placeholder="Organisation" size="large" />)}
              </Form.Item>

              <Form.Item label="Location" hasFeedback>
                {getFieldDecorator("location", {
                  rules: [
                    { required: true, message: "Please input your name" },
                  ],
                })(<Input placeholder="Location" size="large" />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div>
            <AntAlert
              message={`
              An email containing your test link has been sent to
              ${this.state.user.emailid}`}
              type="warning"
              showIcon
            />
            <Button size="large" type="primary" onClick={this.resendMail}>
              Resend Mail
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const TraineeRegister = Form.create({ name: "Trainee Registration" })(
  TraineeRegisterForm
);
export default TraineeRegister;
