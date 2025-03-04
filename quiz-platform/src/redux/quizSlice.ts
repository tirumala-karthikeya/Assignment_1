import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  username: string;
  answers: Record<number, string>;
  score: number;
  correctAnswers: Record<number, string>; 
}

const initialState: QuizState = {
  username: "",
  answers: {},
  score: 0,
  correctAnswers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    submitAnswer: (state, action: PayloadAction<{ questionId: number; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    setCorrectAnswers: (state, action: PayloadAction<Record<number, string>>) => {
      state.correctAnswers = action.payload;
    },
    calculateScore: (state) => {
      let score = 0;
      Object.keys(state.correctAnswers).forEach((key) => {
        if (state.correctAnswers[Number(key)] === state.answers[Number(key)]) {
          score += 1;
        }
      });
      state.score = score;
    },
    resetQuiz: (state) => {
      state.answers = {};
      state.score = 0;
      state.username = "";
      state.correctAnswers = {};
    },
  },
});

export const { setUsername, submitAnswer, setCorrectAnswers, calculateScore, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
