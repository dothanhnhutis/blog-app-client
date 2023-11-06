import { z } from "zod";

export const signinSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const signupSchema = z
  .object({
    email: z.string().email("invaid_email"),
    password: z
      .string()
      .min(8, "too_small")
      .max(40, "too_big")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "format_error"
      ),
    code: z.string().length(6, "length_error"),
  })
  .strict();

export const sendOTPSchema = z
  .object({
    email: z.string().email("invaid_email"),
    type: z.enum(["SIGNINUP", "RESETPASSWORD"] as const).optional(),
  })
  .strict();

export const createTagSchema = z.object({
  name: z
    .string({
      required_error: "name field is required",
      invalid_type_error: "name field must be string",
    })
    .min(1, "name field must be at least 1 character"),
  slug: z
    .string({
      required_error: "slug field is required",
      invalid_type_error: "slug field must be string",
    })
    .min(1, "slug field must be at least 1 character"),
});

export type SigninFormType = z.infer<typeof signinSchema>;
export type SignupFormType = z.infer<typeof signupSchema>;
export type SendOTPInputType = z.infer<typeof sendOTPSchema>;
export type CreateTagInputType = z.infer<typeof createTagSchema>;
