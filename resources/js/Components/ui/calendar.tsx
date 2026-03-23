import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-2", className)}
      classNames={classNames}
      components={{
        Chevron: ({ className: chClass, orientation }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("h-4 w-4", chClass)} aria-hidden />;
          }
          if (orientation === "right") {
            return <ChevronRight className={cn("h-4 w-4", chClass)} aria-hidden />;
          }
          return <ChevronDown className={cn("h-4 w-4", chClass)} aria-hidden />;
        },
        ...components,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
