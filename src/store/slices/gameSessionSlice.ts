import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  apiService,
  type CheckCodeResponse,
  type GameSessionInfo,
} from "../../service/api/api";

// Async thunks
export const checkOrderCode = createAsyncThunk(
  "gameSession/checkCode",
  async ({
    uniqueCode,
    sellerId,
    captcha,
  }: {
    uniqueCode: string;
    sellerId?: string ;
    captcha?: string;
  }) => {
    const response = await apiService.checkCode(uniqueCode, sellerId || '', captcha || '');
    return response;
  }
);

export const confirmSending = createAsyncThunk(
  "gameSession/confirmSending",
  async (uniqueCode: string) => {
    const response = await apiService.confirmSending(uniqueCode);
    return response;
  }
);

export const resetSteamAccount = createAsyncThunk(
  "gameSession/resetSteamAccount",
  async (uniqueCode: string) => {
    const response = await apiService.resetSteamAccount(uniqueCode);
    return response;
  }
);

export const resetBot = createAsyncThunk(
  "gameSession/resetBot",
  async (uniqueCode: string) => {
    const response = await apiService.resetBot(uniqueCode);
    return response;
  }
);

export const checkFriend = createAsyncThunk(
  "gameSession/checkFriend",
  async (uniqueCode: string) => {
    await apiService.checkFriend(uniqueCode);
    return true;
  }
);

export const changeSteamContact = createAsyncThunk(
  "gameSession/changeSteamContact",
  async ({
    uniqueCode,
    steamContact,
  }: {
    uniqueCode: string;
    steamContact: string;
  }) => {
    await apiService.changeSteamContact(uniqueCode, steamContact);
    return steamContact;
  }
);

interface GameSessionState {
  gameSession: GameSessionInfo | null;
  checkCodeResponse: CheckCodeResponse | null;
  uniqueCode: string;
  sellerId: string;
  currentStep: number;
  loading: boolean;
  error: string | null;
  needsCaptcha: boolean;
}

const initialState: GameSessionState = {
  gameSession: null,
  checkCodeResponse: null,
  uniqueCode: "",
  sellerId: "",
  currentStep: 1,
  loading: false,
  error: null,
  needsCaptcha: false,
};

// Load from sessionStorage
const loadFromSessionStorage = (): Partial<GameSessionState> => {
  try {
    const savedState = sessionStorage.getItem("gameSessionState");
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Error loading from sessionStorage:", error);
  }
  return {};
};

// Save to sessionStorage
const saveToSessionStorage = (state: GameSessionState) => {
  try {
    sessionStorage.setItem("gameSessionState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to sessionStorage:", error);
  }
};

const gameSessionSlice = createSlice({
  name: "gameSession",
  initialState: {
    ...initialState,
    ...loadFromSessionStorage(),
  },
  reducers: {
    setUniqueCode: (state, action: PayloadAction<string>) => {
      state.uniqueCode = action.payload;
      saveToSessionStorage(state);
    },
    setSellerId: (state, action: PayloadAction<string>) => {
      state.sellerId = action.payload;
      saveToSessionStorage(state);
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      saveToSessionStorage(state);
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
        saveToSessionStorage(state);
      }
    },
    resetError: (state) => {
      state.error = null;
      saveToSessionStorage(state);
    },
    clearSession: (state) => {
      Object.assign(state, initialState);
      sessionStorage.removeItem("gameSessionState");
    },
  },
  extraReducers: (builder) => {
    // Check Code
    builder
      .addCase(checkOrderCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOrderCode.fulfilled, (state, action) => {
        state.loading = false;
        state.checkCodeResponse = action.payload;
        state.needsCaptcha = action.payload.isRobotCheck;
        if (action.payload.gameSession) {
          state.gameSession = action.payload.gameSession;
        }
        saveToSessionStorage(state);
      })
      .addCase(checkOrderCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to check code";
        saveToSessionStorage(state);
      });

    // Confirm Sending
    builder
      .addCase(confirmSending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmSending.fulfilled, (state, action) => {
        state.loading = false;
        state.gameSession = action.payload;
        saveToSessionStorage(state);
      })
      .addCase(confirmSending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to confirm sending";
        saveToSessionStorage(state);
      });

    // Reset Steam Account
    builder
      .addCase(resetSteamAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetSteamAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.gameSession = action.payload;
        saveToSessionStorage(state);
      })
      .addCase(resetSteamAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to reset steam account";
        saveToSessionStorage(state);
      });

    // Reset Bot
    builder
      .addCase(resetBot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetBot.fulfilled, (state, action) => {
        state.loading = false;
        state.gameSession = action.payload;
        saveToSessionStorage(state);
      })
      .addCase(resetBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to reset bot";
        saveToSessionStorage(state);
      });

    // Check Friend
    builder
      .addCase(checkFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkFriend.fulfilled, (state) => {
        state.loading = false;
        saveToSessionStorage(state);
      })
      .addCase(checkFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to check friend";
        saveToSessionStorage(state);
      });

    // Change Steam Contact
    builder
      .addCase(changeSteamContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeSteamContact.fulfilled, (state, action) => {
        state.loading = false;
        if (state.gameSession) {
          state.gameSession.steamContactValue = action.payload;
        }
        saveToSessionStorage(state);
      })
      .addCase(changeSteamContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to change steam contact";
        saveToSessionStorage(state);
      });
  },
});

export const {
  setUniqueCode,
  setSellerId,
  setCurrentStep,
  nextStep,
  resetError,
  clearSession,
} = gameSessionSlice.actions;

export default gameSessionSlice.reducer;
