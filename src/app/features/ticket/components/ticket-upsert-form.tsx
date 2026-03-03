"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { Ticket } from "@prisma/client";
import { useTransition } from "react";
import { LucideLoaderCircle } from "lucide-react";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [isPending, startTransiton] = useTransition();

  const usertTicketAction = (formData: FormData) => {
    startTransiton(async () => {
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  };
  return (
    <form action={usertTicketAction} className="flex flex-col gap-y-2">
      {/* <Input name="id" type="hidden" defaultValue={ticket.id} /> */}
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />
      <Button type="submit">
        {isPending && (
          <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin " />
        )}
        {ticket ? "Edit" : "Create"}
      </Button>
    </form>
  );
};

export { TicketUpsertForm };
