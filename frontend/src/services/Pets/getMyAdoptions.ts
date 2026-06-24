import type { GetPetsAdoptionResponse } from "../../types/pet.type";
import api from "../../utils/api";

export async function getMyAdoptions(
  token: string,
): Promise<GetPetsAdoptionResponse> {
  const response = await api.get<GetPetsAdoptionResponse>("/pets/myadoptions", {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  return response.data;
}
