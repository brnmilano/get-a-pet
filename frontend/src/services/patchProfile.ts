import api from "../utils/api";

export async function patchUserProfile(
  token: string,
  formData: FormData,
  userId: string,
): Promise<void> {
  await api.patch(`/users/edit/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
}
