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
