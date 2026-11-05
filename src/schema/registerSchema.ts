import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(4, "min length is 4").max(20, "max length is 20"),
    email: z.email("invalid email"),
    password: z.string().min(6, "must be atleast 6 chars"),
    rePassword: z.string().min(6, "must be atleast 6 chars"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "invalid number"),
  })
  .refine(
    function (data) {
      if (data.password === data.rePassword) {
        return true;
      }
      return false;
    },
    {
      path: ["rePassword"],
      error: "enter the same password",
    },
  );

export type registerSchemaType = z.infer<typeof registerSchema>;
