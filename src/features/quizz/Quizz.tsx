import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import {
  fetchQuestions,
  nextRound,
  selectLoading,
  selectQuestions,
  selectRound,
  setAnswer,
  addCorrectAnswer,
  addWrongAnswer,
  resetQuizz
} from "../../store/quizzSlice";

import { Question } from "../../components/question/Question";

interface IQuizz extends RouteComponentProps {}

function Quizz({ history }: IQuizz) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const questions = useSelector(selectQuestions);
  const currentRound = useSelector(selectRound);

  const [timer, setTimer] = useState(60 * 10);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    dispatch(resetQuizz());
    return () => window.clearInterval(intervalRef.current || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer <= 0) history.push("/results");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleClick = async () => {
    await dispatch(fetchQuestions());
    intervalRef.current = window.setInterval(() => setTimer(t => t - 1), 1000);
  };

  const handleNextRound = () => {
    console.log(`Got called`);
    if (currentRound === questions.length - 1) {
      console.log(`Should change path`);
      history.push("/results");
    } else return dispatch(nextRound());
  };

  return (
    <div>
      {!questions.length && (
        <Button onClick={handleClick} variant="contained" color="primary">
          {`Start Quizz!`}
        </Button>
      )}
      {loading && <LinearProgress />}
      {questions.length > 0 && (
        <>
          <Typography variant="h5">{timer}</Typography>
          {questions.map(
            (question, idx) =>
              currentRound === idx && (
                <Question
                  key={idx}
                  content={question}
                  currentRound={currentRound}
                  nextRound={handleNextRound}
                  addCorrectAnswer={() => dispatch(addCorrectAnswer())}
                  addWrongAnswer={() => dispatch(addWrongAnswer())}
                  setAnswer={answer => dispatch(setAnswer(answer))}
                />
              )
          )}
        </>
      )}
    </div>
  );
}

export default withRouter(Quizz);
