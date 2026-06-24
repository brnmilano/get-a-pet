import api from "../../utils/api";

export async function patchConcludeAdoption(
  token: string,
  petId: string,
): Promise<void> {
  await api.patch(`/pets/conclude/${petId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
}
