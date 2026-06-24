import {
  useContext,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { Link } from "react-router-dom";

/* Componentes */
import { Input } from "../../components/form/Input/Input";

/* Types */
import type { RegisterFormErros } from "../../types/formErros.type";
import type { RegisterFormData } from "../../types/auth.types";

/* Context */
import { AuthContext } from "../../context/AuthContext";

/* Utils */
import { validateFields, validateRegisterForm } from "../../utils/validators";

/* Estilos */
import styles from "../../components/form/Form.module.css";

export function RegisterPage() {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<RegisterFormErros>({});

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
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

    // Validar todos os campos antes de enviar
    const newErrors = validateRegisterForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Formulário enviado:", formData);

    // Chamar a função de registro do contexto
    register(formData);
  };

  return (
    <section className={styles.form_container}>
      <h1>Registrar usuário</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          text="Nome"
          placeholder="Digite seu nome"
          value={formData.name}
          handleOnChange={handleOnChange}
          error={errors.name}
          autoComplete="name"
        />

        <Input
          name="phone"
          type="tel"
          text="Telefone"
          placeholder="Digite seu telefone"
          value={formData.phone}
          handleOnChange={handleOnChange}
          error={errors.phone}
          autoComplete="tel"
        />

        <Input
          name="email"
          type="email"
          text="Email"
          placeholder="Digite o seu e-mail"
          value={formData.email}
          handleOnChange={handleOnChange}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          name="password"
          type="password"
          text="Senha"
          placeholder="Digite a sua senha"
          value={formData.password}
          handleOnChange={handleOnChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          name="confirmPassword"
          type="password"
          text="Confirmar senha"
          placeholder="Digite a sua senha novamente"
          value={formData.confirmPassword}
          handleOnChange={handleOnChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <input type="submit" value="Registrar" />
      </form>

      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </section>
  );
}
