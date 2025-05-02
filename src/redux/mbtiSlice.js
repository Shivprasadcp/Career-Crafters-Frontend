// import { createSlice } from '@reduxjs/toolkit';

// const mbtiSlice = createSlice({
//     name: 'mbti',
//     initialState: {
//         questions: {},
//         answers: {
//             EI: {},
//             SN: {},
//             TF: {},
//             JP: {}
//         },
//         results: null,
//     },
//     reducers: {
//         setMbtiQuestions: (state, action) => {
//             console.log('Setting MBTI questions:', action.payload);
//             state.questions = action.payload;
//         },
//         setMbtiAnswers: (state, action) => {
//             state.answers = action.payload;
//             console.log("Setting Answers:",state.answers);

//         },
//         setMbtiResults: (state, action) => {
//             state.results = action.payload;
//         },
//         updateCategoryAnswer: (state, action) => {
//             const { category, questionId, option } = action.payload;
//             state.answers[category] = {
//                 ...state.answers[category],
//                 [questionId]: option
//             };

//             console.log("Updating answers:",state.answers[category])
//         }
//     },
// });

// export const { 
//     setMbtiQuestions, 
//     setMbtiAnswers, 
//     setMbtiResults,
//     updateCategoryAnswer
// } = mbtiSlice.actions;
// export default mbtiSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const mbtiSlice = createSlice({
    name: 'mbti',
    initialState: {
        questions: {},
        answers: {
            EI: {},
            SN: {},
            TF: {},
            JP: {}
        },
        results: null,
    },
    reducers: {
        setMbtiQuestions: (state, action) => {
            console.log('Setting MBTI questions:', action.payload);
            state.questions = action.payload;

            // Initialize empty answers object for each question
            Object.keys(action.payload).forEach(category => {
                state.answers[category] = {};
            });
        },
        setMbtiAnswers: (state, action) => {
            state.answers = action.payload;
            console.log("Setting Answers:", state.answers);
        },
        setMbtiResults: (state, action) => {
            state.results = action.payload;
            console.log("MBTI RESULTS:",state.results);
        },
        updateCategoryAnswer: (state, action) => {
            const { category, questionId, option } = action.payload;
            if (!state.answers[category]) {
                state.answers[category] = {};
            }

            state.answers[category][questionId] = option;
            console.log(`Updated ${category} answer for question ${questionId}:`, state.answers[category]);
        }
    },
});

export const {
    setMbtiQuestions,
    setMbtiAnswers,
    setMbtiResults,
    updateCategoryAnswer
} = mbtiSlice.actions;
export default mbtiSlice.reducer;