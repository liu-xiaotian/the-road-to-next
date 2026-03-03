import { ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      // message: error.errors[0].message,
      message: error.issues[0]?.message,
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  } else {
    return {
      message: "An unkown error occured",
      fieldErrors: {},
      payload: formData,
    };
  }
};
