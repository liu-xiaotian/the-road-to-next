"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useImperativeHandle, useState } from "react";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: React.Ref<{ reset: () => void }>;
};

export function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }));

  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover>
      <PopoverTrigger className="w-full" id={id} asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 w-4 h-4" />
          {formattedDate}
          <input type="hidden" name={name} value={formattedDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
