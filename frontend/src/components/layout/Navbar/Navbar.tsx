import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "../../../assets/images/logo.png";

/* Context */
import { AuthContext } from "../../../context/AuthContext";

export function Navbar() {
  const { authenticated, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />

        <h2>Get A Pet</h2>
      </div>

      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>

        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Minhas Adoções</Link>
            </li>

            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>

            <li>
              <Link to="/user/profile">Meu Perfil</Link>
            </li>

            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>

            <li>
              <Link to="/register">Registar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
