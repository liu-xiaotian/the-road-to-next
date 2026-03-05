"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LucideLoader2 } from "lucide-react";
import { cloneElement } from "react";
import clsx from "clsx";

type submitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const SubmitButton = ({ label, icon, variant, size }: submitButtonProps) => {
  const { pending } = useFormStatus();
  // const { pending } = { pending: true };

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && (
        <LucideLoader2
          className={clsx("mr-2 h-4 w-4 animate-spin ", { "ml-2": !!label })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span className={clsx({ "ml-2": !!label })}>{cloneElement(icon)}</span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };
