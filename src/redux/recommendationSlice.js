import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recommendation: null,
  loading: false,
  error: null
};

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setCareerRecommendation: (state, action) => {
      state.recommendation = action.payload;
      state.loading = false;
      state.error = null;
    },
    setRecommendationLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRecommendationError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  setCareerRecommendation, 
  setRecommendationLoading, 
  setRecommendationError 
} = recommendationSlice.actions;

export default recommendationSlice.reducer;