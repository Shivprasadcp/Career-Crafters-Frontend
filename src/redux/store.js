// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import assessmentReducer from "./assessmentSlice";
// import resultReducer from "./resultSlice";
// import likertReducer from './likertSlice';

// const store = configureStore({
//     reducer: {
//         user: userReducer,
//         assessment: assessmentReducer,
//         result: resultReducer,
//         likert: likertReducer, 
//     },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import assessmentReducer from './assessmentSlice';
import resultReducer from './resultSlice';
import likertReducer from './likertSlice';
import mbtiReducer from './mbtiSlice';
import recommendationReducer from './recommendationSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        assessment: assessmentReducer,
        result: resultReducer,
        likert: likertReducer,
        mbti: mbtiReducer,
        recommendation: recommendationReducer,
    },
});

export default store;