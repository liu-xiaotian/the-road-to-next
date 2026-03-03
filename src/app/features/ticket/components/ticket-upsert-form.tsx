"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { Ticket } from "@prisma/client";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState, useEffect } from "react";
import { FieldErrors } from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { toast } from "sonner";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );
  useActionFeedback(actionState, {
    onSuccess: ({actionState}) => {
      toast.success(actionState.message);
    },
    onError: ({actionState}) => {
      toast.error(actionState.message);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {/* <Input name="id" type="hidden" defaultValue={ticket.id} /> */}
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldErrors actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldErrors actionState={actionState} name="content" />

      {/* <span className="text-xs text-red-500">
        {actionState.fieldErrors.content?.[0]}
      </span> */}
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </form>
  );
};

export { TicketUpsertForm };
