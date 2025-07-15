import React, { useState } from "react";
import "./Textarea.scss";

export interface InputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<T>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
  id?: string;
  name?: string;
  maxLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
}

const Textarea: React.FC<InputProps<HTMLTextAreaElement>> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  label,
  size = "medium",
  fullWidth = false,
  className = "",
  id,
  name,
  maxLength,
  autoComplete,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputClasses = [
    "textarea",
    `textarea--${size}`,
    fullWidth ? "textarea--full-width" : "",
    error ? "textarea--error" : "",
    isFocused ? "textarea--focused" : "",
    disabled ? "textarea--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputId = id || name || "textarea";

  return (
    <div className="textarea-wrapper">
      {label && (
        <label className="textarea-label" htmlFor={inputId}>
          {label}
          {required && <span className="textarea-label__required">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={inputClasses}
        style={{ resize: "none" }}
      />

      {error && <div className="textarea-error">{error}</div>}
    </div>
  );
};

export default Textarea;
