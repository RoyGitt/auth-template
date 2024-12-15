const { z } = require("zod");

const createUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(6, "Email must be atleast 6 Characters long"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 Characters long")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must include at least one uppercase letter, one lowercase letter, and one number"
    ),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

module.exports = { createUserSchema, loginSchema };
