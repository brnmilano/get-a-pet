/* Libs */
import { useEffect, useState } from "react";

/* Types */
import type { PetAdoption } from "../../../types/pet.type";

/* Estilos */
import styles from "../Dashboard.module.css";
import { getMyAdoptions } from "../../../services/Pets/getMyAdoptions";
import toast from "react-hot-toast";
import { RoundedImage } from "../../../components/layout/RoundedImage/RoundedImage";

export function MyAdoptions() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [pets, setPets] = useState<PetAdoption[]>([]);

  console.log(pets);

  useEffect(() => {
    if (!token) {
      return;
    }

    try {
      getMyAdoptions(token).then((response) => {
        setPets(response.pets);
      });
    } catch (error) {
      toast.error("Erro ao carregar suas adoções.");

      console.error(`Erro ao carregar adoções: ${error}`);
    }
  }, [token]);

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Minhas adoções</h1>
      </div>

      <div className={styles.petslist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_DEV_API_URL}/images/pets/${pet.images?.[0]}`}
                alt={pet.name || "Pet Image"}
                width="small"
              />

              <span className="bold">{pet.name}</span>

              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>

                <p>
                  <span className="bold">Fale com:</span> {pet.user.name}
                </p>
              </div>

              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))}

        {pets.length === 0 && <p>Ainda não há pets adotados!</p>}
      </div>
    </section>
  );
}
