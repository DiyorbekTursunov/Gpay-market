// types/index.ts
export interface OrderFormData {
  code: string;
  isNotRobot: boolean;
}

export interface LanguageOption {
  code: 'RU' | 'EN';
  label: string;
}

export interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  isLoading?: boolean;
  error?: string;
}

export interface LanguageSelectorProps {
  languages: LanguageOption[];
  activeLanguage: 'RU' | 'EN';
  onLanguageChange: (language: 'RU' | 'EN') => void;
}

export interface TelegramLinkProps {
  url: string;
  text: string;
  title: string;
}

export interface OrderFormData {
  code: string;
  isNotRobot: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface OrderSubmissionResponse {
  orderId: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  timestamp: string;
}


export interface OrderFormData {
  code: string;
  isNotRobot: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface OrderSubmissionResponse {
  orderId: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  timestamp: string;
}

export interface LanguageOption {
  code: 'RU' | 'EN';
  label: string;
}


export interface OrderFormData {
  code: string;
  isNotRobot: boolean;
  steamContact?: string; // Added for steamcontact endpoint
}

export interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  isLoading: boolean;
  error: string;
}

// API response types based on OpenAPI schema
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
  steamContactType: number;
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
  settings: {
    isPromoHidden: boolean;
    isFeedbackHidden: boolean;
    isContactsHidden: boolean;
  };
}

export interface CheckCodeResponse {
  isCorrectCode: boolean | null;
  gameSession: GameSessionInfo | null;
  isRobotCheck: boolean;
  isValidCaptcha: boolean | null;
  errorCode: number;
}

export interface LastOrder {
  userName: string | null;
  gameName: string | null;
  price: number;
}
