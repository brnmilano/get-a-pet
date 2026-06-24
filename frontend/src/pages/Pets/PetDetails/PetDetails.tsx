/* Libs */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

/* Services */
import { getPetById } from "../../../services/Pets/getPetById";

/* Types */
import type { Pet } from "../../../types/pet.type";

/* Estilos */
import styles from "./PetDetails.module.css";
import { patchSchedulePet } from "../../../services/Pets/patchSchedulePet";

export function PetDetails() {
  const { id } = useParams();

  console.log({ id });

  const [token] = useState(localStorage.getItem("token") || "");

  const [pet, setPet] = useState<Pet>({});

  console.log({ pet });

  const schedule = async () => {
    try {
      await patchSchedulePet(token, id);

      toast.success(`Visita para ver o pet ${pet.name} agendada com sucesso.`);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Erro ao agendar visita.";

      toast.error(message);
      console.error("Erro ao agendar visita:", error);
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
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo.</p>
          </div>

          <div className={styles.pet_images}>
            {pet.images?.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_DEV_API_URL}/images/pets/${image}`}
                alt={pet.name || "Pet Image"}
                width="small"
                key={index}
              />
            ))}
          </div>

          <p>
            <span className="bold">Peso:</span>
            {pet.weight} kg
          </p>

          <p>
            <span className="bold">Idade:</span>
            {pet.age} anos
          </p>

          {token ? (
            <button onClick={schedule}>Solicitar uma visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar uma visita.
            </p>
          )}
        </section>
      )}
    </>
  );
}
