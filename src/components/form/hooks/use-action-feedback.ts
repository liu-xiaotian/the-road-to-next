import { useEffect, useRef } from "react";
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
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdated = prevTimestamp.current !== actionState.timestamp;
  useEffect(() => {
    if (!isUpdated) return;
    if (actionState.status === "SUCCESS") {
      option.onSuccess?.({actionState});
    }
    if (actionState.status === "ERROR") {
      option.onError?.({actionState});
    }
    prevTimestamp.current = actionState.timestamp;
  }, [actionState, option, isUpdated]);
};

export { useActionFeedback };
