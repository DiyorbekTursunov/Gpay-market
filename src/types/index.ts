import type React from "react";
// Re-export API types
export type {
  GameSessionInfo,
  CheckCodeResponse,
  LastOrder,
  GameSessionProperties,
  CheckCodeError,
  SteamContactType,
} from "../service/api/api";

// Form data types
export interface OrderFormData {
  code: string;
  isNotRobot: boolean;
  captcha?: string;
}

// Component prop types
export interface OrderFormProps {
  onSubmit: (data: OrderFormData) => Promise<void>;
  isLoading: boolean;
  needsCaptcha: boolean;
  error: string | boolean;
}

// Button component types
export interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

// Input component types
export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  required?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  type?: string;
}

// Language types
export type Language = "en" | "ru";

// Navigation types
export interface RouteParams {
  id?: string;
}
