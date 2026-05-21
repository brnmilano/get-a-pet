import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <span>Get A Pet</span>
        &copy; 2024. Todos os direitos reservados.
      </p>
    </footer>
  );
}
