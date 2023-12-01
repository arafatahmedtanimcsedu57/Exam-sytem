import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Clock = () => {
  const trainee = useSelector((state) => state.trainee);
  const {
    examState: { loading, data: examInfo, error },
  } = trainee;
  const { startTime } = examInfo || {};
  const {
    testInfo: { data: testInfo },
  } = trainee;
  const { duration } = testInfo || {};

  const calculateRemainingTime = () => {
    const now = new Date().getTime();
    const endTime = startTime + duration * 60 * 1000;
    return Math.max(0, endTime - now);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  // console.log(examInfo, testInfo, remainingTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      if (newRemainingTime <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [startTime, duration]);

  return examInfo && examInfo.startTime ? (
    <div className="clock-wrapper">
      <div className="clock-container">
        Remaining Time: {formatTime(remainingTime)}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Clock;
