import api from "../../utils/api";

export async function createPet(
  token: string,
  petData: FormData,
): Promise<void> {
  await api.post("/pets/create", petData, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
      "content-type": "multipart/form-data",
    },
  });
}
