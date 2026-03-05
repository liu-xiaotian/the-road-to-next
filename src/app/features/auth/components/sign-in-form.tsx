"use client";

import { Input } from "@/components/ui/input";
import { FieldErrors } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import { Form } from "@/components/form/form";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { signIn } from "../actions/sign-in";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input
        id="email"
        name="email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldErrors actionState={actionState} name="email" />
      <Input
        name="password"
        placeholder="Enter your Password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldErrors actionState={actionState} name="password" />
      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
