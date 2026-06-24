/* Hooks do React */
import { useState, type ChangeEvent, type FormEvent } from "react";

/* Componentes */
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

/* Estilos */
import formStyles from "../../form/Form.module.css";

/* Types */
import type { PetFormErrors } from "../../../types/formErros.type";
import { colors, type Pet, type PetFormProps } from "../../../types/pet.type";

/* Utils */
import { validateFields } from "../../../utils/validators";

export function PetForm({ handleSubmit, petData, btnText }: PetFormProps) {
  const [pet, setPet] = useState<Pet>(petData || {});
  const [preview, setPreview] = useState<(File | string)[]>([]);
  const [errors, setErrors] = useState<PetFormErrors>({});

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files.length > 0) {
      const imagesArray = Array.from(files);
      const existingImages = pet.images || [];
      const petImages = [...existingImages, ...imagesArray];

      setPet({ ...pet, [name]: petImages });
      setPreview(petImages);

      const errorMessage = validateFields(name, files[0].name);

      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPet({ ...pet, [name]: value });

    const errorMessage = validateFields(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleColor = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name } = event.target;
    const value = event.target.options[event.target.selectedIndex].text;

    setPet({
      ...pet,
      [name]: value,
    });

    const errorMessage = validateFields(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar todos os campos antes de enviar
    const newErrors: PetFormErrors = {};

    newErrors.name = validateFields("name", pet.name || "");
    newErrors.age = validateFields("age", pet.age || "");
    newErrors.weight = validateFields("weight", pet.weight || "");
    newErrors.color = validateFields("color", pet.color || "");
    newErrors.images = validateFields(
      "images",
      pet.images && pet.images.length > 0 ? "ok" : "",
    );

    setErrors(newErrors);

    // Se houver erros, não enviar
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    handleSubmit(pet);
  };

  return (
    <form className={formStyles.form_container} onSubmit={submit}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={
                  image instanceof File
                    ? URL.createObjectURL(image as Blob)
                    : `${import.meta.env.VITE_DEV_API_URL}/images/pets/${image}`
                }
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${import.meta.env.VITE_DEV_API_URL}/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
      </div>

      <Input
        name="images"
        type="file"
        text="Imagens do Pet"
        placeholder="Selecione as imagens do pet"
        handleOnChange={onFileChange}
        error={errors.images}
        multiple={true}
        autoComplete="image"
      />

      <Input
        name="name"
        type="text"
        text="Nome do Pet"
        placeholder="Digite o nome do pet"
        value={pet.name}
        handleOnChange={handleOnChange}
        error={errors.name}
      />

      <Input
        name="age"
        type="text"
        text="Idade do Pet"
        placeholder="Digite a idade do pet"
        value={pet.age}
        handleOnChange={handleOnChange}
        error={errors.age}
      />

      <Input
        name="weight"
        type="number"
        text="Peso do Pet"
        placeholder="Digite o peso do pet"
        value={pet.weight}
        handleOnChange={handleOnChange}
        error={errors.weight}
      />

      <Select
        text="Cor do Pet"
        name="color"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
        error={errors.color}
      />

      <input type="submit" value={btnText} />
    </form>
  );
}
