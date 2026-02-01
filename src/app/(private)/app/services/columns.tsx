"use client";

import type { ColumnDef } from "@tanstack/react-table";
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

export const serviceColumns: ColumnDef<Service>[] = [
  {
    id: "SN",
    header: "S/N",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => row.original.duration,
  },
  {
    accessorKey: "required",
    header: "Required Staff Type",
    cell: ({ row }) => row.original.required,
  },
];
