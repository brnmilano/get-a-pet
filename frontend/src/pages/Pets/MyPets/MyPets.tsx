/* Libs */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

/* Services */
import { getAllMyPets } from "../../../services/Pets/getAllMyPets";
import { deletePet } from "../../../services/Pets/deletePet";

/* Types */
import type { Pet } from "../../../types/pet.type";

/* Componentes */
import { RoundedImage } from "../../../components/layout/RoundedImage/RoundedImage";

/* Estilos */
import styles from "../Dashboard.module.css";

export function MyPets() {
  const [token] = useState(localStorage.getItem("token") || "");
  const [pets, setPets] = useState<Pet[]>([]);

  const removePet = async (id: string) => {
    await deletePet(token, id)
      .then(() => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);

        toast.success("Pet excluído com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao excluir pet.");

        console.error("Erro ao excluir pet:", error);
      });
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    getAllMyPets(token)
      .then((petsData) => {
        setPets(petsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar pets do usuário:", error);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets</h1>

        <Link to="/pets/add">Adicionar novo pet</Link>
      </div>

      <div className={styles.petslist_container}>
        {pets.length === 0 ? (
          <p>Você ainda não cadastrou nenhum pet.</p>
        ) : (
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_DEV_API_URL}/images/pets/${pet.images?.[0]}`}
                alt={pet.name || "Pet Image"}
                width="small"
              />
              <span className="bold">{pet.name}</span>

              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button className={styles.conclude_btn}>
                        Concluir adoção
                      </button>
                    )}

                    <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id || "");
                      }}
                      className={styles.delete_btn}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Esse pet já foi adotado.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
