import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloudUploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Modal,
  Upload,
  InputNumber,
  message,
} from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  ChangeQuestionTableData,
  ChangeQuestionModalState,
} from "../../../../actions/trainerAction";

import {
  initialQuestionStruct,
  initialQuestionImageStruct,
  isValid,
  newQuestionFormStruct,
  subjectFieldStruct,
  questionFieldStruct,
  explanationFieldStruct,
  waitageFieldStruct,
  correctAnsStruct,
  buttonSectionStruct,
  buttonStruct,
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
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const trainer = useSelector((state) => state.trainer);

  const [questionDetails, setQuestionDetails] = useState({
    ...initialQuestionStruct,
  });
  const [adding, setAdding] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

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

      setQuestionDetails((prev) => {
        return {
          ...prev.questionDetails,
          options: newOptions,
        };
      });
    }

    setQuestionDetails((prev) => {
      return {
        ...prev.questionDetails,
        options: [...newOptions],
      };
    });
  };

  const answerOptionSwitch = (e, i) => {
    if (
      isValid(questionDetails.options[i].body, false) ||
      isValid(questionDetails.options[i].image, false)
    ) {
      var newOptions = [...questionDetails.options];
      newOptions[i] = {
        ...questionDetails.options[i],
        isAnswer: e.target.checked,
      };
      setQuestionDetails((prev) => {
        return {
          ...prev.questionDetails,
          options: newOptions,
        };
      });
    } else {
      Customalert();
      return;
    }
  };

  const optionImageonChange = (f, i) => {
    var newOptions = [...questionDetails.options];

    if (!f) {
      delete newOptions[i].image;
      newOptions[i].image = null;
    } else {
      newOptions[i] = {
        ...questionDetails.options[i],
        image: `${apis.BASE}/${f.link}`,
      };
    }

    setSubmitDisabled(false);

    if (
      !isValid(newOptions[i].image, false) &&
      !isValid(newOptions[i].body, true)
    ) {
      newOptions[i] = {
        ...this.state.questionDetails.options[i],
        isAnswer: false,
      };
    }
    setQuestionDetails((prev) => {
      return {
        ...prev.questionDetails,
        options: newOptions,
      };
    });
  };

  const handleSubmit = (values) => {
    var opts = [];

    questionDetails.options.forEach((element, i) => {
      opts.push({
        optbody: element.body,
        optimg: element.image,
        isAnswer: element.isAnswer,
      });
    });

    setAdding(true);

    SecurePost({
      url: apis.CREATE_QUESTIONS,
      data: {
        body: values.questionbody,
        options: opts,
        quesimg: questionDetails.questionimage,
        subject: values.subject,
        explanation: values.explanation,
        weightage: values.waitage,
      },
    })
      .then((response) => {
        setAdding(false);

        if (response.data.success) {
          dispatch(ChangeQuestionModalState(false));
          dispatch(ChangeQuestionTableData(trainer.selectedSubjects));
          messageApi.success(response.data.message);
        } else {
          dispatch(ChangeQuestionModalState(false));
          messageApi.warning(response.data.message);
        }
      })
      .catch(() => {
        setQuestionDetails({ ...initialQuestionStruct });
        setAdding(false);
        dispatch(ChangeQuestionModalState(false));
        messageApi.error("Server Error");
      });
  };

  const changeqImage = (f) => {
    setQuestionDetails((prev) => {
      return {
        ...prev.questionDetails,
        questionimage: f.link ? `${apis.BASE}/${f.link}` : null,
      };
    });

    setSubmitDisabled(false);
  };

  const upl = () => setSubmitDisabled(true);

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
            {admin.subjectTableData.map((d, i) => (
              <Option key={d._id} s={d.topic} value={d._id}>
                {d.topic}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...questionFieldStruct}>
          <TextArea rows={1} />
        </Form.Item>

        <Form.Item label="Question Image">
          <Upload
            {...initialQuestionImageStruct}
            beforeUpload={upl}
            onRemove={changeqImage}
            onSuccess={changeqImage}
          >
            <Button>
              <CloudUploadOutlined />
              Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item {...explanationFieldStruct}>
          <TextArea rows={1} />
        </Form.Item>

        <Form.Item {...waitageFieldStruct}>
          <InputNumber min={1} />
        </Form.Item>

        {questionDetails.options.map((option, i) => {
          return (
            <>
              <Form.Item label={`Option#${i + 1}`}>
                <TextArea onChange={(e) => optionTextChange(e, i)} rows={1} />
              </Form.Item>

              <Form.Item label={`Option#${i + 1} Image`}>
                <Upload
                  {...initialQuestionImageStruct}
                  beforeUpload={upl}
                  onRemove={(f) => optionImageonChange(null, i)}
                  onSuccess={(f) => optionImageonChange(f, i)}
                >
                  <Button>
                    <CloudUploadOutlined />
                    Upload
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item {...correctAnsStruct}>
                <Checkbox
                  checked={option.isAnswer}
                  onChange={(e) => answerOptionSwitch(e, i)}
                ></Checkbox>
              </Form.Item>
            </>
          );
        })}

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct} disabled={submitDisabled} loading={adding}>
            Create Question
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewQuestion;
