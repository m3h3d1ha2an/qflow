"use client";

import { Delete, Edit } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { Service } from "@/schemas/service";

export const serviceColumns: ColumnDef<Service>[] = [
  {
    id: "SN",
    header: () => <h4 className="text-center font-medium">SN</h4>,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: () => <h4 className="text-center font-medium">Name</h4>,
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "duration",
    header: () => <h4 className="text-center font-medium">Duration</h4>,
    cell: ({ row }) => row.original.duration,
  },
  {
    accessorKey: "required",
    header: () => <h4 className="text-center font-medium">Required Staff Type</h4>,
    cell: ({ row }) => row.original.required,
  },
  {
    id: "actions",
    header: () => <h4 className="text-center font-medium">Actions</h4>,
    cell: () => (
      <div className="flex items-center gap-2">
        <Button size="icon-lg" variant="outline">
          <HugeiconsIcon icon={Edit} />
        </Button>
        <Button size="icon-lg" variant="outline">
          <HugeiconsIcon icon={Delete} />
        </Button>
      </div>
    ),
  },
];
