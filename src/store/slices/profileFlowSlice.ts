import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileFlowState {
  currentStep: number;
}

const initialState: ProfileFlowState = {
  currentStep: 1,
};

const profileFlowSlice = createSlice({
  name: 'profileFlow',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
  },
});

export const { setStep, nextStep, prevStep } = profileFlowSlice.actions;
export default profileFlowSlice.reducer;

// Selector to access currentStep
export const selectCurrentStep = (state: { profileFlow: ProfileFlowState }) => state.profileFlow.currentStep;
