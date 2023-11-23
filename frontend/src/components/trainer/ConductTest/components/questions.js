import React, { Component } from "react";
import { Button, Row, Col } from "antd";

import apis from "../../../../services/Apis";
import { SecurePost } from "../../../../services/axiosCall";

import Alert from "../../../common/alert";

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.refreshquestionList();
  }

  refreshquestionList = () => {
    this.setState({
      loading: true,
    });
    SecurePost({
      url: `${apis.GET_TEST_QUESTIONS}`,
      data: {
        id: this.props.id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          this.props.updateQuestiosnTest(response.data.data);
        } else {
          Alert("error", "Error!", response.data.message);
        }
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        Alert("error", "Error!", "Server Error");
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const aMap = ["A", "B", "C", "D", "E"];
    return (
      <div>
        {this.props.questionsOfTest.map((d, i) => {
          return (
            <div key={i} className="question">
              <div className="question--des">
                <div className="wrapper--question-info">
                  <div className="question-no">{i + 1}</div>

                  <div className="question-info">
                    {!!d.quesimg && (
                      <img
                        alt="unable to load"
                        src={d.quesimg}
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                        }}
                      />
                    )}
                    <div className="question-info--text">{d.body}</div>
                  </div>
                </div>
                <div className="question-mark">{d.weightage}</div>
              </div>
              <div className="question--options">
                {d.options.map((dd, ii) => {
                  return (
                    <div className="question--option">
                      <div className="question--option--no">
                        {dd.isAnswer ? (
                          <Button className="green" shape="circle">
                            {aMap[ii]}
                          </Button>
                        ) : (
                          <Button type="primary" shape="circle">
                            {aMap[ii]}
                          </Button>
                        )}
                      </div>
                      <div className="question--option--info">
                        {!!dd.optimg && (
                          <img
                            alt="unable to load"
                            src={dd.optimg}
                            style={{ maxWidth: "200px", width: "100%" }}
                          />
                        )}
                        <div className="question--option--text">
                          {dd.optbody}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
