import zod from "zod";

// login schema
export const loginSchema = zod.object({
  username: zod.string().trim(),
  password: zod
    .string()
    .trim()
    .min(6, { message: "Minimum password length is 6" })
    .max(16, { message: "Maximum password length is 16" }),
});

// signup schema
export const signupSchema = zod.object({
  username: zod.string().trim(),
  email: zod.email().trim(),
  password: zod
    .string()
    .trim()
    .min(6, { message: "Minimum password length is 6" })
    .max(16, { message: "Maximum password length is 16" }),
});
