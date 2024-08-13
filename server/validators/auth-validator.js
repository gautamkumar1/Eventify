const { z } = require("zod");
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email address must be at least 3 characters" })
    .max(255, { message: "Email address must be at most 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password must be at most 1024 characters" }),
}

);

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(6, { message: "Username must be at least 6 characters" })
    .max(255, { message: "Username must be at most 32 characters" }),
});


module.exports = {signupSchema,loginSchema};
