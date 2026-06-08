import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

import { Input } from "../../components/form/Input/Input";
import { RoundedImage } from "../../components/layout/RoundedImage/RoundedImage";

/* Styles */
import formStyles from "../../components/form/Form.module.css";
import styles from "./Profile.module.css";

/* Types */
import type { UserProfile } from "../../types/profile.types";
import type { ProfileFormErrors } from "../../types/formErros.type";

/* Utils */
import { validateFields } from "../../utils/validators";

/* Services */
import { patchUserProfile } from "../../services/User/patchProfile";
import { getUserProfile } from "../../services/User/getProfile";

export function Profile() {
  const [token] = useState(localStorage.getItem("token") || "");

  const [user, setUser] = useState<UserProfile>({
    id: "",
    image: "",
    email: "",
    name: "",
    phone: "",
  });

  const [preview, setPreview] = useState<File | null>(null);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0]) {
      setUser((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      setPreview(files[0]);

      const errorMessage = validateFields(name, files[0].name);

      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

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

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error("Token não encontrado");
      return;
    }

    if (!user.id) {
      toast.error("ID do usuário não encontrado");
      console.error("user.id está vazio:", user);
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(user).forEach((key) => {
        // Não enviar o ID no FormData (é usado na URL)
        if (key === "id") return;

        const value = user[key as keyof UserProfile];

        // Apenas adiciona valores que não são undefined
        if (value !== undefined && value !== "") {
          formData.append(key, value);
        }
      });

      // Log melhorado - não tenta converter File para string
      console.log("Enviando para:", `/users/edit/${user.id}`);
      console.log("UserID:", user.id);
      console.log("FormData campos:", Array.from(formData.keys()));

      await patchUserProfile(token, formData, user.id);

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      toast.error("Erro ao atualizar perfil");
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    getUserProfile(token)
      .then((userData) => {
        console.log("Dados do servidor:", userData);
        setUser(userData);
      })
      .catch((error) => {
        console.error("Erro ao buscar perfil do usuário:", error);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>

        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${import.meta.env.VITE_DEV_API_URL}/images/users/${user.image}`
            }
            alt={user.name}
            width="medium"
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          name="image"
          type="file"
          text="Imagem de perfil"
          placeholder="Selecione uma imagem"
          value=""
          handleOnChange={onFileChange}
          error={errors.image}
          autoComplete="image"
        />

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
          name="name"
          type="text"
          text="Nome"
          placeholder="Digite seu nome"
          value={user.name}
          handleOnChange={handleOnChange}
          error={errors.name}
          autoComplete="name"
        />

        <Input
          name="phone"
          type="tel"
          text="Telefone"
          placeholder="Digite seu telefone"
          value={user.phone}
          handleOnChange={handleOnChange}
          error={errors.phone}
          autoComplete="phone"
        />

        <input type="submit" value="Atualizar perfil" />
      </form>
    </section>
  );
}
