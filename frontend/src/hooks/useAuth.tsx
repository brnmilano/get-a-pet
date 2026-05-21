// acesso a API
import toast from "react-hot-toast";
import api from "../utils/api";

// hook para gerenciar autenticação
// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface AuthResponse {
  code: number;
  status: string;
  message: string;
  token: string;
}

export default function useAuth() {
  const navigate = useNavigate();

  // Inicializa o estado com base no token já existente
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("token");

    return !!token;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
  }, []);

  async function register(user: User) {
    try {
      const data = await api
        .post("/users/register", user)
        .then((response) => {
          return response.data as AuthResponse;
        })
        .finally(() => {
          toast.success(`Usuário ${user.name} registrado com sucesso!`);
        });

      authUser(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      console.error(
        "Erro ao registrar usuário:",
        axiosError.response?.data.message || error,
      );

      toast.error(
        axiosError.response?.data.message || "Erro ao registrar usuário",
      );
    }
  }

  async function logout() {
    setAuthenticated(false);

    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;

    toast.success("Desconectado com sucesso!");
    navigate("/login");
  }

  async function authUser(data: AuthResponse) {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/login");
  }

  return { register, authUser, authenticated, logout };
}
