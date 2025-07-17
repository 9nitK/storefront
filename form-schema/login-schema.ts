import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
