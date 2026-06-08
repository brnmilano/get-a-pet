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
