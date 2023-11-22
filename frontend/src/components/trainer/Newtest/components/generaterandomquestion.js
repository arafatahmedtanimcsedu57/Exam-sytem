import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Skeleton,
  Modal,
  Form,
  InputNumber,
  Transfer,
  Row,
  Col,
  message
} from "antd";
import {
  changeStep,
  changeMode,
  removeQuestionFromMainQueue,
  changeBasicNewTestDetails,
  fetchSubjectWiseQuestion,
  pushQuestionToQueue,
} from "../../../../actions/testAction";

import apis from "../../../../services/Apis";
import { Post } from "../../../../services/axiosCall";

const GeneraterandomQuestion = () => {
  console.log("QUESTION")
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  const [generating, setGenerating] = useState(false)
  const [autogenerate, setAutogenerate] = useState(true)
  const [activeQuestionId, setActiveQuestionId] = useState(null)
  const [show, setShow] = useState(false)

  const openModel = (qid) => {
    setActiveQuestionId(qid);
    setShow(true);
  };

  const handleCancel = () => setShow(false);

  const handleChange = (targetKeys, direction, moveKeys) => {
    dispatch(pushQuestionToQueue(targetKeys))
  };

  const handleSubmit = (values) => {
    var qus = [];
    var allquestions = [
      ...this.props.test.questionsAvailablebasedonSubject,
    ];
    var l = allquestions.length - 1;

    for (var i = values.no; i > 0; i--) {
      l = l - 1;
      var r = Math.floor(Math.random() * l);
      qus.push(allquestions[r]._id);
      allquestions.splice(r, 1);
    }
    dispatch(pushQuestionToQueue(qus));
    setAutogenerate(false);
  };

  const renderItem = (item) => {
    const customLabel = (
      <>
        <Button onClick={() => openModel(item._id)}>O</Button>
        {item.body}
      </>
    );
    return {
      label: customLabel,
      value: item._id,
    };
  };

  useEffect(() => {
    dispatch(fetchSubjectWiseQuestion(
      test.newtestFormData.testSubject
    ))
  }, []);

  console.log(test, "ARAAT");

  return (
    <>
      <Transfer
        rowKey={(record) => record._id}
        dataSource={test.questionsAvailablebasedonSubject}
        listStyle={{
          width: "45%",
          height: 500,
        }}
        targetKeys={test.newtestFormData.testQuestions}
        render={renderItem}
        onChange={handleChange}
      />

      <Modal
        destroyOnClose={true}
        title="Question details"
        open={show}
        onCancel={handleCancel}
        footer={[]}
      >
        <SingleQuestionDetails qid={activeQuestionId} />
      </Modal>
    </>
  );
}




class SingleQuestionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      qdetails: null,
    };
  }

  componentDidMount() {
    this.setState({
      fetching: true,
    });
    Post({
      url: apis.FETCH_SINGLE_QUESTION_BY_TRAINEE,
      data: {
        qid: this.props.qid,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({
            qdetails: response.data.data[0],
          });
        }
        // else {
        //   messageApi.error(response.data.message);
        // }
        this.setState({
          fetching: false,
        });
      })
      .catch((error) => {
        this.setState({
          fetching: false,
        });
        console.log(error);
        // Alert("error", "Error !", "Server Error");
      });
  }

  render() {
    const optn = ["A", "B", "C", "D", "E"];
    let Optiondata = this.state.qdetails;
    if (Optiondata !== null) {
      return (
        <div>
          <div className="mainQuestionDetailsContaine">
            <div className="questionDetailsBody">{Optiondata.body}</div>
            {Optiondata.quesimg ? (
              <div className="questionDetailsImageContainer">
                <img
                  alt="Question"
                  className="questionDetailsImage"
                  src={Optiondata.quesimg}
                />
              </div>
            ) : null}
            <div>
              {Optiondata.options.map((d, i) => {
                return (
                  <div key={i}>
                    <Row
                      type="flex"
                      justify="center"
                      className="QuestionDetailsOptions"
                    >
                      <Col span={2}>
                        {d.isAnswer ? (
                          <Button className="green" shape="circle">
                            {optn[i]}
                          </Button>
                        ) : (
                          <Button type="primary" shape="circle">
                            {optn[i]}
                          </Button>
                        )}
                      </Col>
                      {d.optimg ? (
                        <Col span={6} style={{ padding: "5px" }}>
                          <img
                            alt="options"
                            className="questionDetailsImage"
                            src={d.optimg}
                          />
                        </Col>
                      ) : null}
                      {d.optimg ? (
                        <Col span={14}>{d.optbody}</Col>
                      ) : (
                        <Col span={20}>{d.optbody}</Col>
                      )}
                    </Row>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="skeletor-wrapper">
          <Skeleton active />
          <Skeleton active />
        </div>
      );
    }
  }
}

export default GeneraterandomQuestion;
