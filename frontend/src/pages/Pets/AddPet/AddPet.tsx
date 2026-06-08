import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Componentes */
import { PetForm } from "../../../components/form/PetForm/PetForm";
import toast from "react-hot-toast";

/* Estilos */
import styles from "./AddPet.module.css";
import type { Pet } from "../../../types/pet.type";

/* Services */
import { createPet } from "../../../services/Pets/createPet";

export function AddPet() {
  const navigate = useNavigate();

  const [token] = useState(localStorage.getItem("token") || "");

  const registerPet = async (pet: Pet) => {
    try {
      const formData = new FormData();

      Object.keys(pet).forEach((key) => {
        const typedKey = key as keyof Pet;
        const value = pet[typedKey];

        if (typedKey === "images" && Array.isArray(value)) {
          value.forEach((image) => {
            formData.append("images", image as File);
          });
        } else if (value) {
          formData.append(key, String(value));
        }
      });

      await createPet(token, formData);

      toast.success("Pet cadastrado com sucesso!");

      navigate("/pets/mypets");
    } catch (error) {
      toast.error("Erro ao cadastrar pet.");
      console.error("Erro ao cadastrar pet:", error);
    }
  };

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção.</p>
      </div>

      <PetForm
        btnText="Adicionar Pet"
        handleSubmit={registerPet}
        petData={{}}
      />
    </section>
  );
}
