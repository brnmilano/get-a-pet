import type { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  text: string;
  placeholder: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  multiple?: boolean;
  name: string;
  error?: string;
  autoComplete?: string;
}

export function Input({
  name,
  type,
  text,
  placeholder,
  value,
  handleOnChange,
  multiple,
  error,
  autoComplete,
}: InputProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        autoComplete={autoComplete}
        {...(multiple ? { multiple: true } : "")}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
