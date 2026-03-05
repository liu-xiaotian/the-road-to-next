"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { TICKET_STATUS_LABELS } from "../constants";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { toast } from "sonner";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};
const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 w-4 h-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  );
  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);
    toast.promise(promise, {
      loading: "Updating status...",
    });
    const result = await promise;
    if (result.status === "SUCCESS") {
      toast.success(result.message);
    } else if (result.status === "ERROR") {
      toast.error(result.message);
    }
  };

  const ticketStatusItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem value={key} key={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {ticketStatusItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMoreMenu };
