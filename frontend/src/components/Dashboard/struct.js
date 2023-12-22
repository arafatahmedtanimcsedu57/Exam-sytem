import { FloatButton } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

export const layoutStruct = {
  style: { minHeight: "100vh" },
};

export const siderStruct = {
  theme: "dark",
  breakpoint: "lg",
  collapsedWidth: "0",
  width: 300,

  trigger: <FloatButton type="primary" icon={<UnorderedListOutlined />} />,
  reverseArrow: true,
};

export const siderMenuIcon = {
  home: "HomeOutlined",
  user: "UserOutlined",
  book: "BookOutlined",
  form: "FormOutlined",
  edit: "EditOutlined",
  copy: "CopyOutlined",
};

export const siderMenuStruct = {
  mode: "inline",
};

export const headerStruct = {
  header: {
    wrap: "wrap",
    gap: "middle",
    justify: "space-between",
    align: "center",
  },

  userInfo: {
    user: {
      vertical: true,
      // gap: "middle",
    },

    userTitle: {
      level: 4,
    },

    userText: {
      type: "secondary",
      strong: true,
    },
  },

  actions: {
    gap: "middle",
    wrap: "wrap",
  },
};

export const contentStruct = {
  style: {
    margin: "0px 24px",
    minHeight: 280,
  },
};

export const signOutButtonStruct = {
  type: "primary",
  danger: true,
};
