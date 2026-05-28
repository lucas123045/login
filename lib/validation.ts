import { AuthFormData, FormErrors } from "@/types";

export function validateLogin(data: AuthFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.email || !data.email.trim()) {
    errors.email = "Informe telefone, nome de usuario ou e-mail.";
  }

  if (!data.senha) {
    errors.senha = "Senha e obrigatoria.";
  } else if (data.senha.length < 6) {
    errors.senha = "A senha deve ter no minimo 6 caracteres.";
  }

  return errors;
}

export function validateSignup(data: AuthFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.nome || data.nome.trim().length < 2) {
    errors.nome = "Nome completo e obrigatorio.";
  }

  if (!data.email) {
    errors.email = "E-mail e obrigatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Insira um e-mail valido.";
  }

  if (!data.senha) {
    errors.senha = "Senha e obrigatoria.";
  } else if (data.senha.length < 6) {
    errors.senha = "A senha deve ter no minimo 6 caracteres.";
  }
  
  if (!data.csenha || !data.csenha.trim()) {
    errors.csenha = "Csenha e obrigatorio.";
  }

  if (!data.confirmarSenha) {
    errors.confirmarSenha = "Confirmacao de senha e obrigatoria.";
  } else if (data.senha !== data.confirmarSenha) {
    errors.confirmarSenha = "As senhas nao coincidem.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
