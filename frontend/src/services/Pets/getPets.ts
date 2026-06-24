import api from "../../utils/api";

import type { GetPetsResponse } from "../../types/pet.type";

export async function getPets(token: string): Promise<GetPetsResponse> {
  const response = await api.get<GetPetsResponse>("/pets/all", {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  return response.data;
}
