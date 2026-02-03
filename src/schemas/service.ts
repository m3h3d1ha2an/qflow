import z from "zod";

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Service name is required.").max(100, "Service name cannot exceed 100 characters."),
  duration: z.coerce
    .number()
    .refine((v) => [15, 30, 60].includes(v), { error: "Please select a valid duration: 15, 30, or 60 minutes." }),
  required: z
    .string()
    .trim()
    .min(1, "Required Staff Type is required.")
    .max(50, "Required Staff Type cannot exceed 50 characters."),
});

export type Service = z.infer<typeof serviceSchema>;
