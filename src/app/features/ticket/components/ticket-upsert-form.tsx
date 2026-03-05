"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { Ticket } from "@prisma/client";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState, useEffect, useRef } from "react";
import { FieldErrors } from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { toast } from "sonner";
import { Form } from "@/components/form/form";
import { fromCent } from "@/utils/currency";
import { DatePicker } from "@/components/date-picker";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const datePickerImperativeHandleRef = useRef<{ reset: () => void }>(null);
  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };
  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
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
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldErrors actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldErrors actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
