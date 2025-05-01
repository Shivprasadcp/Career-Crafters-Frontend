// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   questions: [],
//   answers: {},
// };

// const assessmentSlice = createSlice({
//   name: "assessment",
//   initialState,
//   reducers: {
//     setQuestions: (state, action) => {
//       state.questions = action.payload;
//     },
//     setAnswers: (state, action) => {
//       state.answers = action.payload;
//     },
//     updateAnswer: (state, action) => {
//       const { questionId, answer } = action.payload;
//       state.answers[questionId] = answer;
//     },
//     clearAnswers: (state) => {
//       state.answers = {};
//     },
//   },
// });
// export const { setQuestions, setAnswers, updateAnswer, clearAnswers } = assessmentSlice.actions;
// export default assessmentSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState: {
        questions: [],
        answers: {},
    },
    reducers: {
        setQuestions: (state, action) => {
            console.log('Setting questions:', action.payload);
            state.questions = action.payload;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        },        
    },
});

export const { setQuestions, setAnswers,setResults } = assessmentSlice.actions;
export default assessmentSlice.reducer;
