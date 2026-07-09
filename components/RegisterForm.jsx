"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { registerFormSchema } from "@/lib/validations/auth";
import FormField from "@/components/forms/FormField";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register, handleSubmit, setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name, email: data.email, password: data.password,
        }),
      });
      const body = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setError("email", { type: "server", message: body.error || "Email вже існує" });
        toast.error("Email вже зайнятий");
        return;
      }
      if (!res.ok) { toast.error(body.error || "Помилка реєстрації"); return; }

      // Автоматичний вхід
      const signInResult = await signIn("credentials", {
        email: data.email, password: data.password, redirect: false,
      });
      if (signInResult?.error) {
        toast.warning("Реєстрація успішна, але не вдалося увійти");
        router.push("/auth/login");
        return;
      }
      toast.success("Реєстрація успішна!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Помилка реєстрації");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Реєстрація</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Ім'я" error={errors.name?.message}>
            <input type="text" {...register("name")} className="w-full px-3 py-2 border rounded-md" />
          </FormField>
          <FormField label="Email" error={errors.email?.message}>
            <input type="email" {...register("email")} className="w-full px-3 py-2 border rounded-md" />
          </FormField>
          <FormField label="Пароль" error={errors.password?.message}>
            <input type="password" autoComplete="new-password" {...register("password")} className="w-full px-3 py-2 border rounded-md" />
          </FormField>
          <FormField label="Підтвердження пароля" error={errors.confirmPassword?.message}>
            <input type="password" autoComplete="new-password" {...register("confirmPassword")} className="w-full px-3 py-2 border rounded-md" />
          </FormField>
          <button type="submit" disabled={isSubmitting}
            className="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 disabled:opacity-50">
            {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Вже маєте акаунт? <Link href="/auth/login" className="text-amber-700 hover:underline">Увійти</Link>
        </p>
      </div>
    </div>
  );
}