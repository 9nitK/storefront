"use client";

import { LoginFormData, loginSchema } from "@/form-schema/login-schema";
import { LOGIN_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Simulate used emails for async validation
const USED_EMAILS = ["admin1@example.com", "test@example.com"];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") || "/products";

  const [errorMsg, setErrorMsg] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin1@example.com",
      password: "admin",
    },
  });

  // Async email uniqueness check
  const checkEmail = async (email: string) => {
    setCheckingEmail(true);
    await new Promise((res) => setTimeout(res, 600));
    setCheckingEmail(false);
    if (USED_EMAILS.includes(email)) {
      setError("email", {
        type: "manual",
        message: "Email is already registered.",
      });
    } else {
      clearErrors("email");
    }
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (!data?.tokenCreate) {
        setErrorMsg("Invalid response from server. Please try again.");
        return;
      }

      if (
        data.tokenCreate.errors &&
        Array.isArray(data.tokenCreate.errors) &&
        data.tokenCreate.errors.length > 0
      ) {
        setErrorMsg(
          data.tokenCreate.errors[0]?.message ||
            "Login failed. Please try again."
        );
      } else if (data.tokenCreate.token) {
        document.cookie = `token=${data.tokenCreate.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`;
        router.push(next);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    },
    onError: () => {
      setErrorMsg("Something went wrong, try again.");
    },
  });

  const onSubmit = (formData: LoginFormData) => {
    setErrorMsg("");
    loginUser({ variables: formData });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          aria-label="Login form"
        >
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-300"
              htmlFor="email-input"
            >
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email-input"
              type="email"
              className="input-field"
              {...register("email", {
                onBlur: (e) => checkEmail(e.target.value),
              })}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {checkingEmail && (
              <p className="text-blue-400 text-xs mt-1">Checking email...</p>
            )}
            {errors.email && (
              <p className="text-red-500 text-xs mt-1" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="input-field"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button type="submit" disabled={loading} className="btn-gradient">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
