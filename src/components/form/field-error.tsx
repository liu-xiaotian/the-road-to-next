import { error } from "console";
import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};
const FieldErrors = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];
  if (!message) return null;
  return <span className="text-xs text-red-500">{message}</span>;
};

export { FieldErrors };
