"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  interest: z.string().min(2, "Please select an insurance interest"),
  message: z.string().min(10, "Please share a few details")
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ variant = "contact" }: { variant?: "contact" | "claim" | "career" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: variant === "claim" ? "Claims Assistance" : "" }
  });

  async function onSubmit(values: FormValues) {
    try {
      let apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
      if (!apiUrl.endsWith("/api/v1")) apiUrl = `${apiUrl.replace(/\/$/, "")}/api/v1`;
      
      const res = await fetch(`${apiUrl}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: variant })
      });
      if (!res.ok) throw new Error("Failed to submit enquiry");
      reset();
      alert("Thank you. The InsuCARE team will contact you shortly.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting your form. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card grid gap-5 rounded-[2rem] p-6 shadow-premium">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register("name")} className="input" placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} className="input" placeholder="you@example.com" />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className="input" placeholder="+91" />
        </Field>
        <Field label="Insurance interest" error={errors.interest?.message}>
          <select {...register("interest")} className="input">
            <option value="">Select interest</option>
            <option>Corporate Insurance</option>
            <option>Employee Benefits</option>
            <option>Health Insurance</option>
            <option>Motor Insurance</option>
            <option>Claims Assistance</option>
            <option>Career Application</option>
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} className="input min-h-32" placeholder="Tell us what you need help with" />
      </Field>
      <button disabled={isSubmitting} className="rounded-full bg-oxblood px-6 py-3 font-bold text-white disabled:opacity-60">
        {isSubmitting ? "Sending..." : "Submit Enquiry"}
      </button>
      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(139, 17, 22, 0.14);
          background: white;
          padding: 0.85rem 1rem;
          outline: none;
        }
        .input:focus {
          border-color: #8b1116;
          box-shadow: 0 0 0 4px rgba(139, 17, 22, 0.08);
        }
      `}</style>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      {children}
      {error ? <span className="text-xs font-semibold text-oxblood">{error}</span> : null}
    </label>
  );
}
