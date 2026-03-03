import { useEffect } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {actionState: ActionState}

type UseActionFeedbackOptions = {
  onSuccess?: ({actionState}: {actionState: ActionState}) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  option: UseActionFeedbackOptions,
) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      option.onSuccess?.({actionState});
    }
    if (actionState.status === "ERROR") {
      option.onError?.({actionState});
    }
  }, [actionState, option]);
};

export { useActionFeedback };
