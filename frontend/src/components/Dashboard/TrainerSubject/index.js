import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Flex } from "antd";

import { getTrainerSubject } from "../../../actions/trainerSubject.action";

import { trainerSubjectStruct, trainerSubjectLayout } from "./struct";

const TrainerSubject = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject || {};

  useEffect(() => {
    console.log(userDetails, "FUCK");
    dispatch(getTrainerSubject(userDetails._id));
  }, []);

  return !!trainerSubjects && trainerSubjects.length ? (
    <Card {...trainerSubjectStruct}>
      <Flex {...trainerSubjectLayout}>
        {trainerSubjects.map((subject) => (
          <div>
            {subject.subjectId.topic} ~ {subject.name}
          </div>
        ))}
      </Flex>
    </Card>
  ) : (
    <></>
  );
};

export default TrainerSubject;
