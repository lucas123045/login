"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import PhoneMockup from "./PhoneMockup";
import SignupForm from "./SignupForm";

export default function AuthPageClient() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[935px] items-center justify-center gap-8">
        <div className="hidden lg:block">
          <PhoneMockup />
        </div>

        <div className="w-full max-w-[350px]">
          <section className="border border-[#DBDBDB] bg-white px-10 py-8">
            <h1
              className="mb-8 text-center text-[44px] leading-none text-[#262626]"
              style={{ fontFamily: "'Grand Hotel', cursive" }}
            >
              Instagrram
            </h1>

            <div className="tab-content">
              {mode === "login" ? (
                <LoginForm />
              ) : (
                <SignupForm onSwitchToLogin={() => setMode("login")} />
              )}
            </div>
          </section>

          <section className="mt-3 border border-[#DBDBDB] bg-white px-6 py-5 text-center text-sm">
            {mode === "login" ? (
              <p>
                Nao tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-[#0095F6] hover:text-[#1877F2]"
                >
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p>
                Tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-[#0095F6] hover:text-[#1877F2]"
                >
                  Entrar
                </button>
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
