import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(6, "must be atleast 6 chars"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
