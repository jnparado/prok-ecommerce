"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortSelect({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder = "Choose an option...",
  className,
}: {
  id?: string;
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {label ? (
        <Label htmlFor={id} className="font-normal text-zinc-700">
          {label}
        </Label>
      ) : (
        <Label htmlFor={id} className="sr-only">
          {placeholder}
        </Label>
      )}
      <Select
        value={value}
        onValueChange={(next) => {
          if (next != null) onValueChange(String(next));
        }}
      >
        <SelectTrigger id={id} className={className ?? "h-10 min-w-[220px] bg-white"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
