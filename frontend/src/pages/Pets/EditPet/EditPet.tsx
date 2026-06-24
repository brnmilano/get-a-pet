/* Libs */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

/* Componentes */
import { PetForm } from "../../../components/form/PetForm/PetForm";

/* Services */
import { getPetById } from "../../../services/Pets/getPetById";
import { editPet } from "../../../services/Pets/editPet";

/* Types */
import type { Pet } from "../../../types/pet.type";

/* Estilos */
import styles from "./EditPet.module.css";

export function EditPet() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [token] = useState<string>(localStorage.getItem("token") || "");

  const [pet, setPet] = useState<Pet>({
    _id: "",
    name: "",
    age: "",
    weight: "",
    color: "",
    available: true,
    adopter: false,
    images: [],
  });

  const updatePet = async (data: Pet) => {
    try {
      const formData = new FormData();

      for (const key of Object.keys(data)) {
        const typedKey = key as keyof Pet;
        const value = data[typedKey];

        if (typedKey === "images" && Array.isArray(value)) {
          for (const image of value) {
            if (image instanceof File) {
              formData.append("images", image);
            } else if (typeof image === "string") {
              const response = await fetch(
                `${import.meta.env.VITE_DEV_API_URL}/images/pets/${image}`,
              );
              const blob = await response.blob();

              formData.append(
                "images",
                new File([blob], image, { type: blob.type || "image/jpeg" }),
              );
            }
          }
        } else if (value) {
          formData.append(key, String(value));
        }
      }

      await editPet(token, id!, formData);

      toast.success("Pet atualizado com sucesso!");

      navigate("/pets/mypets");
    } catch (error) {
      toast.error("Erro ao atualizar pet.");
      console.error("Erro ao atualizar pet:", error);
    }
  };

  useEffect(() => {
    if (!token || !id) {
      return;
    }

    getPetById(token, id!)
      .then((petData) => {
        setPet(petData);
      })
      .catch((error) => {
        toast.error("Erro ao buscar dados do pet.");

        console.error("Erro ao buscar dados do pet:", error);
      });
  }, [id, token]);

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
      </div>

      {pet.name && (
        <PetForm handleSubmit={updatePet} petData={pet} btnText="Atualizar" />
      )}
    </section>
  );
}
