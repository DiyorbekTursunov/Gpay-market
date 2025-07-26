import axios, { type AxiosResponse } from "axios";

// Base API configuration
const API_BASE_URL = "https://gpay.market";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types from OpenAPI schema
export enum CheckCodeError {
  NOP = 0,
  CODE_IS_EMPTY = 1,
  CODE_INCORRECT = 2,
  CAPTCHA_EMPTY = 3,
  CAPTCHA_INCORRECT = 4,
}

export enum SteamContactType {
  PROFILE_URL = 0,
  FRIEND_INVITATION_URL = 1,
  STEAM_ID = 2,
  STEAM_ID_CUSTOM = 3,
  UNKNOWN = 100,
}

export interface GameSessionProperties {
  isPromoHidden: boolean;
  isFeedbackHidden: boolean;
  isContactsHidden: boolean;
}

export interface GameSessionInfo {
  id: number;
  itemName: string | null;
  botName: string | null;
  botUsername: string | null;
  botProfileUrl: string | null;
  botInvitationUrl: string | null;
  statusId: number;
  steamProfileName: string | null;
  steamProfileUrl: string | null;
  steamProfileAvatarUrl: string | null;
  uniqueCode: string | null;
  daysExpiration: number | null;
  steamContactType: SteamContactType;
  steamContactValue: string | null;
  sessionEndTime: string | null;
  autoSendInvitationTime: string | null;
  addedDateTime: string;
  isDlc: boolean;
  isAnotherBotExists: boolean;
  canResendGame: boolean;
  cantSwitchAccountTimer: number | null;
  digisellerId: string | null;
  queuePosition: number;
  queueWaitingMinutes: number;
  blockOrder: boolean;
  market: number | null;
  settings: GameSessionProperties;
}

export interface CheckCodeResponse {
  isCorrectCode: boolean | null;
  gameSession: GameSessionInfo;
  isRobotCheck: boolean;
  isValidCaptcha: boolean | null;
  errorCode: CheckCodeError;
}

export interface checkFriendResponse {
  isCorrectCode: boolean | null;
  gameSession: GameSessionInfo;
  isRobotCheck: boolean;
  isValidCaptcha: boolean | null;
  errorCode: CheckCodeError;
}

export interface LastOrder {
  userName: string | null;
  gameName: string | null;
  price: number;
}

export interface BadRequestObjectResult {
  value: any;
  formatters: any[];
  contentTypes: string[];
  declaredType: string | null;
  statusCode: number | null;
}

// Simplified API functions
export const checkCode = async (
  uniqueCode: string,
  sellerId: string,
  captcha = ""
): Promise<CheckCodeResponse> => {
  try {
    const response: AxiosResponse<CheckCodeResponse> = await apiClient.post(
      "/home/checkCode",
      {},
      {
        params: {
          Uniquecode: uniqueCode,
          Seller_id: sellerId,
          Captcha: captcha,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Check code error:", error);
    throw error;
  }
};

export const changeSteamContact = async (
  uniqueCode: string,
  steamContact: string
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("uniquecode", uniqueCode);
    formData.append("steamContact", steamContact);

    await apiClient.post("/gamesession/steamcontact", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Change steam contact error:", error);
    throw error;
  }
};

export const confirmSending = async (
  uniqueCode: string
): Promise<GameSessionInfo> => {
  try {
    const response: AxiosResponse<GameSessionInfo> = await apiClient.post(
      "/gamesession/confirmsending",
      {},
      {
        params: {
          Uniquecode: uniqueCode,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Confirm sending error:", error);
    throw error;
  }
};

export const resetSteamAccount = async (
  uniqueCode: string
): Promise<GameSessionInfo> => {
  try {
    const response: AxiosResponse<GameSessionInfo> = await apiClient.post(
      "/gamesession/resetsteamacc",
      {},
      {
        params: {
          Uniquecode: uniqueCode,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Reset steam account error:", error);
    throw error;
  }
};

export const resetBot = async (
  uniqueCode: string
): Promise<GameSessionInfo> => {
  try {
    const response: AxiosResponse<GameSessionInfo> = await apiClient.post(
      "/gamesession/resetbot",
      {},
      {
        params: {
          Uniquecode: uniqueCode,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Reset bot error:", error);
    throw error;
  }
};

export const checkFriend = async (
  uniqueCode: string
): Promise<checkFriendResponse> => {
  try {
    const response: AxiosResponse<checkFriendResponse> = await apiClient.post(
      "/gamesession/checkfrined",
      {},
      {
        params: {
          Uniquecode: uniqueCode,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Check friend error:", error);
    throw error;
  }
};

export const getLastOrders = async (): Promise<LastOrder[]> => {
  try {
    const response: AxiosResponse<LastOrder[]> =
      await apiClient.post("/home/lastOrders");
    return response.data;
  } catch (error) {
    console.error("Get last orders error:", error);
    throw error;
  }
};

export const showTelegram = async (sellerId: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<boolean> = await apiClient.get(
      "/home/ShowTelegram",
      {
        params: {
          seller_id: sellerId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Show telegram error:", error);
    throw error;
  }
};

// Legacy API service class for backward compatibility
export class ApiService {
  async checkCode(
    uniqueCode: string,
    sellerId: string,
    captcha = ""
  ): Promise<CheckCodeResponse> {
    return checkCode(uniqueCode, sellerId, captcha);
  }

  async changeSteamContact(
    uniqueCode: string,
    steamContact: string
  ): Promise<void> {
    return changeSteamContact(uniqueCode, steamContact);
  }

  async confirmSending(uniqueCode: string): Promise<GameSessionInfo> {
    return confirmSending(uniqueCode);
  }

  async resetSteamAccount(uniqueCode: string): Promise<GameSessionInfo> {
    return resetSteamAccount(uniqueCode);
  }

  async resetBot(uniqueCode: string): Promise<GameSessionInfo> {
    return resetBot(uniqueCode);
  }

  async checkFriend(uniqueCode: string): Promise<checkFriendResponse> {
    return checkFriend(uniqueCode);
  }

  async getLastOrders(): Promise<LastOrder[]> {
    return getLastOrders();
  }

  async showTelegram(sellerId: string): Promise<boolean> {
    return showTelegram(sellerId);
  }
}

export const apiService = new ApiService();
