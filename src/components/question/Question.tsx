import React, { useState, useMemo } from "react";
import { IAnswer, IQuestion } from "../../store/quizzSlice";
import { shuffleArray } from "../../utils/shuffleArray";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";

type DispatchType =
  | {
      payload: undefined;
      type: string;
    }
  | undefined;

export interface IQuestionProps {
  content: IQuestion;
  currentRound: number;
  nextRound: () => DispatchType;
  addCorrectAnswer: () => void;
  addWrongAnswer: () => void;
  setAnswer: (answer: IAnswer) => void;
}

export function Question({
  content,
  currentRound,
  nextRound,
  addCorrectAnswer,
  addWrongAnswer,
  setAnswer
}: IQuestionProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAnswered(true);
    setAnswer({ [currentRound]: value });
    if (content.correct_answer === value) {
      setHelperText(`Congratulations, that's correct!`);
      addCorrectAnswer();
    } else {
      setError(true);
      setHelperText(
        `Sorry, that's not right. The correct answer was: ${content.correct_answer}`
      );
      addWrongAnswer();
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(false);
  };

  const answers = useMemo(
    () =>
      shuffleArray<string>([
        content.correct_answer,
        ...content.incorrect_answers
      ]),
    [content]
  );

  return (
    <Container maxWidth="md" fixed>
      <form onSubmit={handleSubmit}>
        <FormControl
          component="fieldset"
          error={error}
          margin="normal"
          variant="standard"
          fullWidth={true}
        >
          <FormLabel
            component="legend"
            children={
              <Typography
                variant="h4"
                children={
                  <span
                    dangerouslySetInnerHTML={{ __html: content.question }}
                  />
                }
              />
            }
          ></FormLabel>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            {answers.map(answer => (
              <FormControlLabel
                key={answer}
                disabled={answered}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            ))}
          </RadioGroup>
          <FormHelperText
            error={error}
            children={<span style={{ fontSize: "1.5rem" }}>{helperText}</span>}
          ></FormHelperText>
          {!answered && (
            <Button type="submit" variant="outlined" color="primary">
              {`Submit Answer`}
            </Button>
          )}
          {answered && (
            <Button onClick={nextRound} variant="contained" color="primary">
              {`Next Question`}
            </Button>
          )}
        </FormControl>
      </form>
    </Container>
  );
}
