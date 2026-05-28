import { AuthFormData, FormErrors } from "@/types";

export function validateLogin(data: AuthFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.email) {
    errors.email = "E-mail é obrigatório.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Insira um e-mail válido.";
  }

  if (!data.senha) {
    errors.senha = "Senha é obrigatória.";
  } else if (data.senha.length < 6) {
    errors.senha = "A senha deve ter no mínimo 6 caracteres.";
  }

  return errors;
}

export function validateSignup(data: AuthFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.nome || data.nome.trim().length < 2) {
    errors.nome = "Nome completo é obrigatório.";
  }

  if (!data.email) {
    errors.email = "E-mail é obrigatório.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Insira um e-mail válido.";
  }

  if (!data.senha) {
    errors.senha = "Senha é obrigatória.";
  } else if (data.senha.length < 6) {
    errors.senha = "A senha deve ter no mínimo 6 caracteres.";
  }

  if (!data.confirmarSenha) {
    errors.confirmarSenha = "Confirmação de senha é obrigatória.";
  } else if (data.senha !== data.confirmarSenha) {
    errors.confirmarSenha = "As senhas não coincidem.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
