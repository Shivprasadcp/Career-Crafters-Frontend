// redux/resultSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  domainScores: {},
  topDomains: [],
  topDomainScores: [],
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResultData: (state, action) => {
      state.domainScores = action.payload.domain_scores;
      state.topDomains = action.payload.top_domains;
      state.topDomainScores = action.payload.top_domain_scores;
    },
    clearResultData: (state) => {
      state.domainScores = {};
      state.topDomains = [];
      state.topDomainScores = [];
    }
  },
});

export const { setResultData, clearResultData } = resultSlice.actions;
export default resultSlice.reducer;
