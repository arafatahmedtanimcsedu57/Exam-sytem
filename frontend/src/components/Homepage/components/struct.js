export const loginSectionStruct = {
  align: "center",
  wrap: "wrap",
  justify: "center",
  style: {
    // width: "100%"
    // padding: "24px",
  },
};

export const loginBannerStruct = {
  style: {
    minWidth: "300px",
    maxWidth: "700px",
  },
};

export const loginFormStruct = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },

  labelAlign: "left",

  autoComplete: "on",
};

export const emailFieldStruct = {
  label: "Email",
  name: "email",
  rules: [
    {
      type: "email",
      required: true,
      message: "Please input your email!",
    },
  ],
};

export const passwordFieldStruct = {
  label: "Password",
  name: "password",
  rules: [
    {
      required: true,
      message: "Please input your password!",
    },
  ],
};

export const buttonSectionStruct = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

export const buttonStruct = {
  type: "primary",
  htmlType: "submit",
  block: true,
};

export const homeSectionTitle = {
  style: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#1c1c1c",
  },
};
