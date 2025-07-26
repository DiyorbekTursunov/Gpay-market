import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService, type LastOrder } from "../../service/api/api"

// Async thunks
export const getLastOrders = createAsyncThunk("order/getLastOrders", async () => {
  const response = await apiService.getLastOrders()
  return response
})

export const showTelegram = createAsyncThunk("order/showTelegram", async (sellerId?: string) => {
  const response = await apiService.showTelegram(sellerId)
  return response
})

interface OrderState {
  lastOrders: LastOrder[]
  showTelegramLink: boolean
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
  lastOrders: [],
  showTelegramLink: true,
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Get Last Orders
    builder
      .addCase(getLastOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getLastOrders.fulfilled, (state, action) => {
        state.loading = false
        state.lastOrders = action.payload
      })
      .addCase(getLastOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to get last orders"
      })

    // Show Telegram
    builder
      .addCase(showTelegram.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(showTelegram.fulfilled, (state, action) => {
        state.loading = false
        state.showTelegramLink = action.payload
      })
      .addCase(showTelegram.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to check telegram visibility"
      })
  },
})

export const { resetError } = orderSlice.actions

export default orderSlice.reducer
