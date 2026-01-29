import z from "zod";

export const serviceSchema = z.object({
  name: z.string().trim().min(1, "Service name is required").max(100, "Service name cannot exceed 100 character"),
  // duration: z.enum([15, 30, 60])
})