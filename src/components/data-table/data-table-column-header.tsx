import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type DataTableColumnHeaderProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<TData, TValue>;
  title: string;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8" />}
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <HugeiconsIcon icon={ArrowDown} />
          ) : column.getIsSorted() === "asc" ? (
            <HugeiconsIcon icon={ArrowUp} />
          ) : (
            <HugeiconsIcon icon={ChevronsUpDown} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <HugeiconsIcon icon={ArrowUp} />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <HugeiconsIcon icon={ArrowDown} />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.clearSorting()}>
            <HugeiconsIcon icon={X} />
            Reset
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <HugeiconsIcon icon={EyeOff} />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
