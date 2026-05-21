import type { ReactNode } from "react";
import styles from "./Container.module.css";

export function Container({ children }: { children: ReactNode }) {
  return <main className={styles.container}>{children}</main>;
}
