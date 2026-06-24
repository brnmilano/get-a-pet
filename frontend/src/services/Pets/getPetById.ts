import api from "../../utils/api";
import type { Pet } from "../../types/pet.type";

export async function getPetById(token: string, petId: string): Promise<Pet> {
  const response = await api.get(`/pets/${petId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  const pet = response.data.pet;

  return pet;
}
