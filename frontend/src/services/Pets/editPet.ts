import api from "../../utils/api";

export async function editPet(
  token: string,
  petId: string,
  petData: FormData,
): Promise<void> {
  await api.patch(`/pets/${petId}`, petData, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
