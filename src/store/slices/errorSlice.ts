import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
  code?: string;
  timestamp?: number;
}

const initialState: ErrorState = {
  message: null,
  code: undefined,
  timestamp: undefined,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ message: string; code?: string }>) => {
      state.message = action.payload.message;
      state.code = action.payload.code;
      state.timestamp = Date.now();
    },
    clearError: (state) => {
      state.message = null;
      state.code = undefined;
      state.timestamp = undefined;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
