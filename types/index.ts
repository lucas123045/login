export interface Profile {
  id: string;
  nome: string;
  email: string;
  created_at: string;
}

export interface AuthFormData {
  nome?: string;
  email: string;
  senha: string;
  corFavorita?: string;
  confirmarSenha?: string;
}

export interface FormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  corFavorita?: string;
  confirmarSenha?: string;
  general?: string;
}
