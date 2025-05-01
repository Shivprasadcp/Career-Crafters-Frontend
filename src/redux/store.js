import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import assessmentReducer from "./assessmentSlice";
import resultReducer from "./resultSlice";
import likertReducer from './likertSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        assessment: assessmentReducer,
        result: resultReducer,
        likert: likertReducer, 
    },
});

export default store;