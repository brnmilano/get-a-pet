import api from "../../utils/api";

export async function deletePet(token: string, petId: string): Promise<void> {
  await api.delete(`/pets/${petId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
}
