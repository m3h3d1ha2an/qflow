"use client";

import { CheckCircle, ChevronsUpDown, CircleIcon, Settings05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

export const DataTableViewOptions = <TData,>({ table }: DataTableViewOptionsProps<TData>) => {
  const [open, setOpen] = useState(false);

  const columns = table
    .getAllColumns()
    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide());

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            aria-label="Toggle columns"
            className="ml-auto hidden h-8 cursor-pointer lg:flex"
            size="sm"
            variant="outline"
          />
        }
      >
        <HugeiconsIcon icon={Settings05Icon} className="mr-2 size-4" />
        View Options
        <HugeiconsIcon icon={ChevronsUpDown} className="ml-2 size-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-0">
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column) => (
                <CommandItem
                  key={column.id}
                  className="cursor-pointer capitalize"
                  onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                >
                  <div>
                    <HugeiconsIcon icon={CheckCircle} altIcon={CircleIcon} showAlt={!column.getIsVisible()} />
                  </div>
                  <span className="truncate">{column.id}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
