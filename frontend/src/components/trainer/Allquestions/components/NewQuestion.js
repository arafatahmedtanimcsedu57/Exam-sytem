import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Modal,
  InputNumber,
  message,
  Badge,
  Divider,
  Space,
} from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  setQuestionModifyAction,
  getQuestion,
  getQuestions,
} from "../../../../actions/question.action";
import { getSubjects } from "../../../../actions/subject.action";
import { getTags } from "../../../../actions/tag.action";

import { difficulties } from "../../../../utilities/difficulty";

import {
  initialQuestionStruct,
  isValid,
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
} from "./struct";

const { Option } = Select;
const { TextArea } = Input;

const Customalert = () => {
  Modal.confirm({
    title: "Confirm",
    content: "empty option can not be set as answer",
    okText: "I understand",
    cancelText: null,
  });
};

const NewQuestion = () => {
  const inputRef = useRef(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const question = useSelector((state) => state.question);
  const { questionId, questionModalMode, questionDetails } = question;

  const subject = useSelector((state) => state.subject);
  const { subjects } = subject;

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  // const [adding, setAdding] = useState(false);
  // const [submitDisabled, setSubmitDisabled] = useState(false);
  // const [newTag, setNewTag] = useState("");

  const optionTextChange = (e, i) => {
    var newOptions = [...questionDetails.options];
    newOptions[i] = {
      ...questionDetails.options[i],
      body: e.target.value,
    };

    if (
      !isValid(newOptions[i].image, false) &&
      !isValid(newOptions[i].body, true)
    ) {
      newOptions[i] = {
        ...questionDetails.options[i],
        isAnswer: false,
      };

      // setQuestionDetails((prev) => {
      //   return {
      //     ...prev.questionDetails,
      //     options: newOptions,
      //   };
      // });
    }

    // setQuestionDetails((prev) => {
    //   return {
    //     ...prev.questionDetails,
    //     options: [...newOptions],
    //   };
    // });
  };

  // const answerOptionSwitch = (e, i) => {
  //   if (
  //     isValid(questionDetails.options[i].body, false) ||
  //     isValid(questionDetails.options[i].image, false)
  //   ) {
  //     var newOptions = [...questionDetails.options];
  //     newOptions[i] = {
  //       ...questionDetails.options[i],
  //       isAnswer: e.target.checked,
  //     };
  //     setQuestionDetails((prev) => {
  //       return {
  //         ...prev.questionDetails,
  //         options: newOptions,
  //       };
  //     });
  //   } else {
  //     Customalert();
  //     return;
  //   }
  // };

  const handleSubmit = (values) => {
    var _options = [];

    console.log(values);

    // questionDetails.options.forEach((option) => {
    //   _options.push({
    //     optBody: option.body,
    //     optImg: option.image,
    //     isAnswer: option.isAnswer,
    //   });
    // });

    // setAdding(true);

    // SecurePost({
    //   url: apis.CREATE_QUESTIONS,
    //   data: {
    //     body: values.questionBody,
    //     options: _options,
    //     quesImg: questionDetails.questionImage,
    //     subject: values.subject,
    //     explanation: values.explanation,
    //     weightAge: values.marks,
    //     difficulty: values.difficulty,
    //     tags: values.tags,
    //   },
    // })
    //   .then((response) => {
    //     // setAdding(false);

    //     if (response.data.success) {
    //       // dispatch(handleQuestionModalState(false));
    //       // dispatch(handleQuestionTableData(trainer.selectedSubjects));
    //       messageApi.success(response.data.message);
    //     } else {
    //       // dispatch(handleQuestionModalState(false));
    //       messageApi.warning(response.data.message);
    //     }
    //   })
    //   .catch(() => {
    //     // setQuestionDetails({ ...initialQuestionStruct });
    //     // setAdding(false);
    //     // dispatch(handleQuestionModalState(false));
    //     messageApi.error("Server Error");
    //   });
  };

  // const onTagChange = (event) => {
  //   setNewTag(event.target.value);
  // };

  // const addTag = (e) => {
  //   e.preventDefault();

  //   console.log(newTag);

  //   SecurePost({
  //     url: apis.CREATE_TAG,
  //     data: {
  //       label: newTag,
  //       value: newTag.trim().toLowerCase().replace(/ +/g, "_"),
  //     },
  //   }).then((response) => {
  //     if (response.data.success) {
  //       dispatch(getTags());
  //     }
  //   });

  //   setNewTag("");
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };

  useEffect(() => {
    if (questionId) {
      dispatch(getQuestion(questionId));
    }

    dispatch(getSubjects());
    dispatch(getTags());
  }, [questionId]);

  useEffect(() => form.resetFields(), [form, questionDetails]);

  return (
    <>
      {contextHolder}
      <Form {...newQuestionFormStruct} onFinish={handleSubmit}>
        <Form.Item {...subjectFieldStruct}>
          <Select
            showSearch
            placeholder="Select a subject"
            optionFilterProp="s"
          >
            {subjects.map((d, i) => (
              <Option key={d._id} s={d.topic} value={d._id}>
                {d.topic}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...difficultyStruct}>
          <Select
            showSearch
            placeholder="Select a difficulty"
            optionFilterProp="s"
          >
            {difficulties.map((d, i) => (
              <Option key={d.value} s={d.label} value={d.value}>
                <Badge color={d.color} text={d.label} />
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...questionFieldStruct}>
          <TextArea rows={1} />
        </Form.Item>

        <Form.Item {...explanationFieldStruct}>
          <TextArea rows={1} />
        </Form.Item>

        <Form.Item {...waitageFieldStruct}>
          <InputNumber min={1} />
        </Form.Item>

        {/* {questionDetails.options.map((option, i) => {
          return (
            <>
              <Form.Item label={`Option#${i + 1}`}>
                <TextArea onChange={(e) => optionTextChange(e, i)} rows={1} />
              </Form.Item>

              <Form.Item {...correctAnsStruct}>
                <Checkbox
                  checked={option.isAnswer}
                  // onChange={(e) => answerOptionSwitch(e, i)}
                ></Checkbox>
              </Form.Item>
            </>
          );
        })} */}

        <Form.Item {...tagFieldStruct}>
          <Select
            allowClear
            mode="multiple"
            placeholder="Select tags"
            optionFilterProp="s"
            // dropdownRender={(menu) => (
            //   <>
            //     {menu}
            //     <Divider style={{ margin: "8px 0" }} />
            //     <Space style={{ padding: "0 8px 4px" }}>
            //       <Input
            //         placeholder="Please enter item"
            //         ref={inputRef}
            //         value={newTag}
            //         onChange={onTagChange}
            //         onKeyDown={(e) => e.stopPropagation()}
            //       />
            //       <Button type="text" disabled={!newTag} onClick={addTag}>
            //         Add item
            //       </Button>
            //     </Space>
            //   </>
            // )}
          >
            {tags.map((d, i) => (
              <Option key={d.value} s={d.label} value={d.value}>
                {d.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>Create Question</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewQuestion;
