import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message,
  Badge,
  Divider,
  Space,
  Switch,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import { setQuestionModifyAction } from "../../../../actions/question.action";
import { getTags } from "../../../../actions/tag.action";

import { difficulties } from "../../../../utilities/difficulty";

import {
  newQuestionFormStruct,
  subjectFieldStruct,
  questionFieldStruct,
  explanationFieldStruct,
  waitageFieldStruct,
  correctAnsStruct,
  buttonSectionStruct,
  buttonStruct,
  difficultyStruct,
  tagFieldStruct,
  optionFieldStruct,
  optionsStruct,
} from "./struct";

const { Option } = Select;
const { TextArea } = Input;

const NewQuestion = ({ fetchQuestions }) => {
  const [newTag, setNewTag] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const question = useSelector((state) => state.question);
  const { questionModalMode, questionDetails } = question;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;
  const subjects = trainerSubjects.map((subject) => subject.subjectId);

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const handleSubmit = (values) => {
    SecurePost({
      url: apis.QUESTION,
      data: {
        body: values.questionBody,
        options: values.options,
        quesImg: null,
        subject: values.subject,
        explanation: values.explanation,
        weightAge: values.marks,
        difficulty: values.difficulty,
        tags: values.tags,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(setQuestionModifyAction(false, "COMPLETE"));
          fetchQuestions();
          messageApi.success(response.data.message);
        } else messageApi.warning(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const onTagChange = (event) => {
    setNewTag(event.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();

    SecurePost({
      url: apis.TAG,

      data: { label: newTag },
    }).then((response) => {
      if (response.data.success) dispatch(getTags());
    });

    setNewTag("");
  };

  useEffect(() => form.resetFields(), [form, questionDetails]);

  return (
    <>
      {contextHolder}
      <Form {...newQuestionFormStruct} onFinish={handleSubmit}>
        <Form.Item {...subjectFieldStruct.subjectField}>
          <Select {...subjectFieldStruct.select}>
            {subjects.map((subject) => (
              <Option key={subject._id} s={subject.topic} value={subject._id}>
                {subject.topic}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...difficultyStruct.difficultyField}>
          <Select {...difficultyStruct.select}>
            {difficulties.map((difficulty) => (
              <Option
                key={difficulty.value}
                s={difficulty.label}
                value={difficulty.value}
              >
                <Badge color={difficulty.color} text={difficulty.label} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...questionFieldStruct}>
          <TextArea rows={1} />
        </Form.Item>

        <Form.Item {...explanationFieldStruct}>
          <TextArea defaultValue="N/A" rows={1} />
        </Form.Item>

        <Form.Item {...waitageFieldStruct}>
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Form.List {...optionsStruct}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "optBody"]}
                      {...optionFieldStruct}
                    >
                      <Input placeholder="Option" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "isAnswer"]}
                      {...correctAnsStruct}
                    >
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                      >
                        Is correct
                      </Switch>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Option
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item {...tagFieldStruct}>
          <Select
            allowClear
            mode="multiple"
            placeholder="Select tags"
            optionFilterProp="s"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter tag"
                    value={newTag}
                    onChange={onTagChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" disabled={!newTag} onClick={addTag}>
                    ADD TAG
                  </Button>
                </Space>
              </>
            )}
          >
            {tags.map((tag) => (
              <Option key={tag.value} s={tag.label} value={tag.label}>
                {tag.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{questionModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewQuestion;
