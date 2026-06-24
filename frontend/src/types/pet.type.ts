export const colors = [
  "Branco",
  "Preto",
  "Caramelo",
  "Cinza",
  "Marrom",
  "Dourado",
];

export interface Pet {
  _id?: string;
  name?: string;
  age?: string;
  weight?: string;
  color?: string;
  images?: (File | string)[];
  available?: boolean;
  adopter?: boolean;
}

export interface PetFormProps {
  handleSubmit: (pet: Pet) => void | Promise<void>;
  petData?: Pet;
  btnText?: string;
}

export interface GetPetsResponse {
  code: number;
  status: string;
  message: string;
  pets: Pet[];
}

export interface User {
  _id: string;
  name: string;
  phone: string;
  image: string;
}

export interface Adopter {
  _id: string;
  phone: string;
  name: string;
}

export interface PetAdoption {
  _id: string;
  name: string;
  age: number;
  weight: number;
  color: string;
  images: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  adopter?: Adopter;
}

export interface GetPetsAdoptionResponse {
  code: number;
  status: string;
  message: string;
  pets: PetAdoption[];
}
