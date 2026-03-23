import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";

function parseYearMonth(value: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})$/.exec(value?.trim() ?? "");
  if (!m) return undefined;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  if (mo < 1 || mo > 12 || y < 1000 || y > 9999) return undefined;
  return new Date(y, mo - 1, 1);
}

function formatYearMonth(d: Date): string {
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  return `${y}-${String(mo).padStart(2, "0")}`;
}

const RANGE_START = new Date(1960, 0, 1);
const RANGE_END = new Date(new Date().getFullYear() + 10, 11, 1);

export function MonthPickerField({
  id,
  value,
  onChange,
  placeholder = "Select month",
  disabled,
  className,
}: {
  id?: string;
  value: string;
  onChange: (yearMonth: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = parseYearMonth(value);
  const label = selected ? format(selected, "MMM yyyy") : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-start text-left font-normal",
            !value?.trim() && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" aria-hidden />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          startMonth={RANGE_START}
          endMonth={RANGE_END}
          defaultMonth={selected ?? new Date()}
          selected={selected}
          onSelect={(d) => {
            if (d) {
              onChange(formatYearMonth(d));
              setOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
