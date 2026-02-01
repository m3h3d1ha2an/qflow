import type z from "zod";
import type { serviceSchema } from "@/schemas/service";

export type Service = z.infer<typeof serviceSchema>;
