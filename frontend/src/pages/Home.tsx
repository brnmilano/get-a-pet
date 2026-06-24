/* Libs */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

/* Services */
import { getPets } from "../services/Pets/getPets";

/* Types */
import type { Pet } from "../types/pet.type";

/* Estilos */
import styles from "./Home.module.css";

export function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");

  console.log({ pets });

  useEffect(() => {
    if (!token) {
      return;
    }

    getPets(token).then((response) => {
      setPets(response.pets);
    });
  }, [token]);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet!</h1>

        <p>Veja os detalhes de cada um e conheça o tutor deles.</p>
      </div>

      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.pet_card}>
              <div
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_DEV_API_URL}/images/pets/${pet.images?.[0]})`,
                }}
                className={styles.pet_card_image}
              />

              <h3>{pet.name}</h3>

              <p>
                <span className="bold">Idade: </span>
                {pet.age} anos
              </p>

              <p>
                <span className="bold">Peso: </span>
                {pet.weight} kg
              </p>

              <p>{pet.color}</p>

              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado!</p>
              )}
            </div>
          ))}

        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento.</p>
        )}
      </div>
    </section>
  );
}
