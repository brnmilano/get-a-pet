import api from "../utils/api";
import type { UserProfile } from "../types/profile.types";

export async function getUserProfile(token: string): Promise<UserProfile> {
  const response = await api.get("/users/checkuser", {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });

  const userData = response.data.currentUser;

  // Mapear _id para id (padrão MongoDB)
  return {
    id: userData._id || userData.id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    image: userData.image,
  };
}
