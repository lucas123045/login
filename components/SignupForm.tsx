"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import InputField from "./InputField";
import Alert from "./Alert";
import { createClientInstance } from "@/lib/supabase";
import { validateSignup, hasErrors } from "@/lib/validation";
import { AuthFormData, FormErrors } from "@/types";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  const handleChange = (field: keyof AuthFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (generalError) setGeneralError("");
  };

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateSignup(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      triggerShake();
      return;
    }

    setLoading(true);
    setGeneralError("");

    try {
      const supabase = createClientInstance();

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          data: { nome: formData.nome },
        },
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setGeneralError("Este e-mail já está cadastrado.");
        } else {
          setGeneralError("Erro ao criar conta. Tente novamente.");
        }
        triggerShake();
        return;
      }

      // 2. Insert into profiles table
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          nome: formData.nome!.trim(),
          email: formData.email,
          cor_favorita: formData.senha!.trim(),
        });

        if (profileError && !profileError.message.includes("duplicate")) {
          console.error("Profile insert error:", profileError);
        }
      }

      setSuccess(true);
    } catch {
      setGeneralError("Erro de conexão. Tente novamente.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center success-banner">
        <div className="w-14 h-14 rounded-full bg-[#F0FFF4] flex items-center justify-center">
          <CheckCircle2 size={28} className="text-[#2ECC71]" />
        </div>
        <div>
          <p className="font-semibold text-[#262626]">Conta criada!</p>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Verifique seu e-mail para confirmar o cadastro.
          </p>
        </div>
        <button
          onClick={onSwitchToLogin}
          className="text-sm font-semibold text-[#0095F6] hover:text-[#1877F2] transition-colors"
        >
          Fazer login agora →
        </button>
      </div>
    );
  }

  const isFormFilled =
    formData.nome &&
    formData.email &&
    formData.senha &&
    formData.confirmarSenha;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${shakeForm ? "shake" : ""}`}
      noValidate
    >
      <p className="text-[#8E8E8E] text-sm text-center mb-1">
        Cadastre-se para ver as fotos e vídeos de seus amigos.
      </p>

      {generalError && (
        <Alert
          type="error"
          message={generalError}
          onClose={() => setGeneralError("")}
        />
      )}

      <InputField
        label="Nome completo"
        type="text"
        value={formData.nome}
        onChange={handleChange("nome")}
        error={errors.nome}
        autoComplete="name"
      />

      <InputField
        label="E-mail"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
        autoComplete="email"
        autoCapitalize="none"
      />

      <InputField
        label="senha"
        type="text"
        value={formData.senha}
        onChange={handleChange("senha")}
        error={errors.senha}
        autoComplete="off"
      />

      <InputField
        label="Confirmar senha"
        isPassword
        value={formData.confirmarSenha}
        onChange={handleChange("confirmarSenha")}
        error={errors.confirmarSenha}
        autoComplete="new-password"
      />

      <p className="text-[11px] text-[#8E8E8E] text-center leading-relaxed mt-1">
        As pessoas que usam nosso serviço podem ter carregado suas informações de
        contato.{" "}
        <a href="#" className="text-[#00376B] hover:underline">
          Saiba mais
        </a>
      </p>

      <p className="text-[11px] text-[#8E8E8E] text-center leading-relaxed">
        Ao se cadastrar, você concorda com nossos{" "}
        <a href="#" className="text-[#00376B] hover:underline">
          Termos
        </a>
        ,{" "}
        <a href="#" className="text-[#00376B] hover:underline">
          Política de Privacidade
        </a>{" "}
        e{" "}
        <a href="#" className="text-[#00376B] hover:underline">
          Política de Cookies
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={!isFormFilled || loading}
        className={`
          mt-1 w-full py-[7px] rounded-lg text-sm font-semibold text-white
          transition-all duration-150 flex items-center justify-center gap-2
          ${isFormFilled && !loading
            ? "bg-[#0095F6] hover:bg-[#1877F2] cursor-pointer"
            : "bg-[#0095F6]/40 cursor-not-allowed"
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Cadastrando…
          </>
        ) : (
          "Cadastrar"
        )}
      </button>
    </form>
  );
}
