import api from "../../utils/api";

export async function patchSchedulePet(
  token: string,
  petId: string,
): Promise<void> {
  await api.patch(`/pets/schedule/${petId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
}
