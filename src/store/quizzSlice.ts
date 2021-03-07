import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

export interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface IAnswer {
  [index: number]: string;
}

export interface IQuizzState {
  questions: IQuestion[];
  rounds: number;
  answers: IAnswer[];
  currentRound: number;
  correctAnswers: number;
  wrongAnswers: number;
  loading: boolean;
}

const initialState: IQuizzState = {
  questions: [],
  rounds: 0,
  answers: [],
  currentRound: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  loading: false
};

export const quizzSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    nextRound: state => {
      state.currentRound += 1;
    },
    setCurrentRound: (state, action: PayloadAction<number>) => {
      state.currentRound = action.payload;
    },
    setTotalRounds: (state, action: PayloadAction<number>) => {
      state.rounds = action.payload;
    },
    setAnswer: (state, action: PayloadAction<IAnswer>) => {
      state.answers.push(action.payload);
    },
    addCorrectAnswer: state => {
      state.correctAnswers += 1;
    },
    addWrongAnswer: state => {
      state.wrongAnswers += 1;
    },
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetQuizz: state => initialState
  }
});

export const {
  addCorrectAnswer,
  addWrongAnswer,
  nextRound,
  setAnswer,
  setQuestions,
  setCurrentRound,
  setTotalRounds,
  setLoading,
  resetQuizz
} = quizzSlice.actions;

export const fetchQuestions = (): AppThunk => dispatch => {
  dispatch(setLoading(true));
  fetch("https://opentdb.com/api.php?amount=20&category=9")
    .then(res => {
      if (res.status === 200) return res;
      else throw new Error("Something went wrong!");
    })
    .then(res => res.json())
    .then(data => {
      const { results = [] } = data;
      if (results.length > 0) {
        dispatch(setTotalRounds(results.length));
        dispatch(setQuestions(data.results));
      }
    })
    .catch(console.error)
    .finally(() => dispatch(setLoading(false)));
};

export const selectQuestions = (state: RootState) => state.quizz.questions;
export const selectLoading = (state: RootState) => state.quizz.loading;
export const selectRound = (state: RootState) => state.quizz.currentRound;
export const selectResults = (state: RootState) => ({
  rounds: state.quizz.rounds,
  correctAnswers: state.quizz.correctAnswers,
  wrongAnswers: state.quizz.wrongAnswers
});

export default quizzSlice.reducer;
