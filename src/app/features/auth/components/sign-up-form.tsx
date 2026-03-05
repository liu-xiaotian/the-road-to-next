"use client";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";
import { useActionState } from "react";
import { FieldErrors } from "@/components/form/field-error";
import { Form } from "@/components/form/form";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="Enter your Username"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldErrors actionState={actionState} name="username" />
      <Input
        name="email"
        placeholder="Enter your Email"
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
      <Input
        name="confirmPassword"
        placeholder="Confirm your Password"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldErrors actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
