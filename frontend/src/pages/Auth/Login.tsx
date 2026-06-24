/* Libs */
import {
  useState,
  useContext,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { Link } from "react-router-dom";

/* Componentes */
import { Input } from "../../components/form/Input/Input";

/* Types */
import type { LoginFormErros } from "../../types/formErros.type";
import type { Login } from "../../types/auth.types";

/* Context */
import { AuthContext } from "../../context/AuthContext";

/* Utils */
import { validateLoginForm, validateFields } from "../../utils/validators";

/* Estilos */
import styles from "../../components/form/Form.module.css";

export function LoginPage() {
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState<Login>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErros>({});

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMessage = validateFields(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const newErros = validateLoginForm(user);

    if (Object.keys(newErros).length > 0) {
      setErrors(newErros);
      return;
    }

    console.log("Login bem-sucedido:", user);

    login(user);
  };

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          text="Email"
          placeholder="Digite seu email"
          value={user.email}
          handleOnChange={handleOnChange}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          name="password"
          type="password"
          text="Senha"
          placeholder="Digite sua senha"
          value={user.password}
          handleOnChange={handleOnChange}
          error={errors.password}
          autoComplete="current-password"
        />

        <input type="submit" value="Entrar" />
      </form>

      <p>
        Não tem conta? <Link to="/register">Clique aqui</Link>
      </p>
    </section>
  );
}
