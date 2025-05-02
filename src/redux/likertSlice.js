import { createSlice } from '@reduxjs/toolkit';

const likertSlice = createSlice({
    name: 'likert',
    initialState: {
        questions: [],
        answers: {},
        results: null,
    },
    reducers: {
        setLikertQuestions: (state, action) => {
            console.log('Setting likert questions:', action.payload);
            state.questions = action.payload;
        },
        setLikertAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setLikertResults: (state, action) => {
            state.results = action.payload;
            console.log("The test result stored in the redux is as follows:",state.results);
        },
        clearLikertData: (state) => {
            state.questions = [];
            state.answers = {};
            state.results = null;
        }
    },
});

export const { 
    setLikertQuestions, 
    setLikertAnswers, 
    setLikertResults, 
    clearLikertData 
} = likertSlice.actions;

export default likertSlice.reducer;