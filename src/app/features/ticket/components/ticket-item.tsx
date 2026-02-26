import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketPath } from "@/paths";
import clsx from "clsx";
import Link from "next/link";
import { Ticket } from "../types";
import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card className="w-full max-w-[420px]">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate">{ticket.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span
          className={clsx("text-sm text-slate-500 truncate", {
            "line-through": ticket.status === "DONE",
          })}
        >
          {ticket.content}
        </span>
      </CardContent>
      <CardFooter>
        <Link href={ticketPath(ticket.id)} className="text-sm underline">
          View
        </Link>
      </CardFooter>
    </Card>
  );
};

export { TicketItem };
