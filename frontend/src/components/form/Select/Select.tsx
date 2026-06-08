import type { ChangeEvent } from "react";
import styles from "./Select.module.css";

interface SelectProps {
  text: string;
  name: string;
  options: string[];
  handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  error?: string;
}

export function Select({
  text,
  name,
  options,
  handleOnChange,
  value,
  error,
}: SelectProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={handleOnChange}
      >
        <option value="">Selecione uma opção:</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
