import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  LucideCircleCheckBig,
  LucideFileText,
  LucidePencil,
} from "lucide-react";
import { Heading } from "@/components/heading";
const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheckBig />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"Tickets Page"}
        description={"All your tickets at one place"}
      />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
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
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
