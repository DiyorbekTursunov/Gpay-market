import axios, { type AxiosResponse } from "axios"
import type { CheckCodeResponse, GameSessionInfo, LastOrder } from "../../types"

const API_BASE_URL = "http://gpay.market"

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// API response wrapper for error handling
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Wrap API calls with error handling
const handleApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>
)
: Promise<ApiResponse<T>> =>
{
  try {
    const response = await apiCall()
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("API Error:", error)
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown error occurred',
    };
  }
}

export const apiService = {
  // Check order code and get game session info
  checkCode: async (uniqueCode: string, sellerId: string, captcha = ""): Promise<ApiResponse<CheckCodeResponse>> => {
    return handleApiCall(() =>
      apiClient.post<CheckCodeResponse>(
        "/home/checkCode",
        {},
        {
          params: {
            Uniquecode: uniqueCode,
            Seller_id: sellerId,
            Captcha: captcha,
          },
        },
      ),
    )
  },

  // Change Steam account for game delivery
  changeSteamContact: async (uniqueCode: string, steamContact: string): Promise<ApiResponse<any>> => {
    return handleApiCall(() =>
      apiClient.post(
        "/gamesession/steamcontact",
        {},
        {
          params: {
            Uniquecode: uniqueCode,
            SteamContact: steamContact,
          },
        },
      ),
    )
  },

  // Confirm sending - user confirms the account and starts delivery process
  confirmSending: async (uniqueCode: string): Promise<ApiResponse<GameSessionInfo>> => {
    return handleApiCall(() =>
      apiClient.post<GameSessionInfo>(
        "/gamesession/confirmsending",
        {},
        {
          params: {
            Uniquecode: uniqueCode,
          },
        },
      ),
    )
  },

  // Reset Steam account for delivery
  resetSteamAccount: async (uniqueCode: string): Promise<ApiResponse<GameSessionInfo>> => {
    return handleApiCall(() =>
      apiClient.post<GameSessionInfo>(
        "/gamesession/resetsteamacc",
        {},
        {
          params: {
            Uniquecode: uniqueCode,
          },
        },
      ),
    )
  },

  // Reset bot for delivery
  resetBot: async (uniqueCode: string): Promise<ApiResponse<GameSessionInfo>> => {
    return handleApiCall(() =>
      apiClient.post<GameSessionInfo>(
        "/gamesession/resetbot",
        {},
        {
          params: {
            Uniquecode: uniqueCode,
          },
        },
      ),
    )
  },

  // Check if bot is in user's friends list
  checkFriend: async (uniqueCode: string): Promise<ApiResponse<any>> => {
    return handleApiCall(() =>
      apiClient.post(
        "/gamesession/checkfrined",
        {},
        {
          params: {
            Uniquecode: uniqueCode,
          },
        },
      ),
    )
  },

  // Get last orders for ticker
  getLastOrders: async (): Promise<ApiResponse<LastOrder[]>> => {
    return handleApiCall(() => apiClient.post<LastOrder[]>("/home/lastOrders"))
  },

  // Check if Telegram should be shown
  showTelegram: async (sellerId: string): Promise<ApiResponse<boolean>> => {
    return handleApiCall(() =>
      apiClient.get<boolean>("/home/ShowTelegram", {
        params: {
          seller_id: sellerId,
        },
      }),
    )
  },
}

export default apiService
