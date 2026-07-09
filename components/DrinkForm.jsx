"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { createDrinkSchema } from "@/lib/validations/drink";
import FormField from "@/components/forms/FormField";

const CATEGORIES = ["Кава", "Чай", "Їжа", "Інше"];

export default function DrinkForm({ mode = "create", initialData, drinkId }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createDrinkSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      category: initialData?.category ?? "",
      price: initialData?.price ?? 0,
      description: initialData?.description ?? "",
      emoji: initialData?.emoji ?? "🅿️",
      available: initialData?.isAvailable ?? true,
    },
  });

  const onSubmit = async (data) => {
    const url = isEdit ? `/api/drinks/${drinkId}` : "/api/drinks";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || body.errors?.join(", ") || "Не вдалося зберегти");
      }
      toast.success(isEdit ? "Зміни збережено" : "Напій додано");
      router.push(isEdit ? `/dashboard/drinks/${drinkId}` : "/dashboard/drinks");
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Назва" required error={errors.name?.message}>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField label="Категорія" required error={errors.category?.message}>
          <select
            {...register("category")}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Оберіть категорію</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Ціна (грн)" required error={errors.price?.message}>
          <input
            type="number"
            step="1"
            {...register("price", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
        </FormField>

        <FormField label="Емоджі" error={errors.emoji?.message} hint="Один-два символи">
          <input
            type="text"
            {...register("emoji")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500"
          />
        </FormField>
      </div>

      <FormField label="Опис" error={errors.description?.message}>
        <textarea
          rows="4"
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500"
        />
      </FormField>

      <FormField>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" {...register("available")} className="w-4 h-4" />
          <span className="text-gray-700">Доступний для бронювання</span>
        </label>
      </FormField>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 font-bold disabled:opacity-50"
        >
          {isSubmitting ? "Збереження..." : isEdit ? "Зберегти зміни" : "Створити"}
        </button>
        <Link
          href={isEdit ? `/dashboard/drinks/${drinkId}` : "/dashboard/drinks"}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
        >
          Скасувати
        </Link>
      </div>
    </form>
  );
}