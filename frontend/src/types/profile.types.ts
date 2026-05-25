export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

export interface ProfileImage {
  src: string;
  alt: string;
  width: "small" | "medium" | "large";
}
