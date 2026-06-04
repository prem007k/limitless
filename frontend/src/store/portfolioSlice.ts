// frontend/src/store/portfolioSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PortfolioState {
  cash: number;
  holdings: Record<string, number>;
  totalPnL: number;
  isReplayActive: boolean;
}

const initialState: PortfolioState = {
  cash: 100000,
  holdings: {},
  totalPnL: 0,
  isReplayActive: false,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolio: (state, action: PayloadAction<any>) => {
      state.cash = action.payload.cash || state.cash;
      state.holdings = action.payload.holdings || state.holdings;
      state.totalPnL = action.payload.totalPnL || state.totalPnL;
    },
    toggleReplay: (state) => {
      state.isReplayActive = !state.isReplayActive;
    }
  }
});

export const { updatePortfolio, toggleReplay } = portfolioSlice.actions;
export default portfolioSlice.reducer;