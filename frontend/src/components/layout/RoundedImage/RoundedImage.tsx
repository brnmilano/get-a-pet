import type { ProfileImage } from "../../../types/profile.types";
import styles from "./RoundedImage.module.css";

export function RoundedImage({ src, alt, width }: ProfileImage) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
}
