import api from "../../utils/api";

/* Types */
import type { GetPetsResponse, Pet } from "../../types/pet.type";

export async function getAllMyPets(token: string): Promise<Pet[]> {
  const response = await api.get<GetPetsResponse>("/pets/mypets", {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  const petsData = response.data.pets;

  return petsData.map((pet: Pet) => ({
    _id: pet._id,
    name: pet.name,
    age: pet.age,
    weight: pet.weight,
    color: pet.color,
    images: pet.images,
    available: pet.available,
    adopter: pet.adopter,
  }));
}
