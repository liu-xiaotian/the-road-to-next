import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(20)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces",
      ),
    email: z.string().min(1, "Email is required").max(191),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Signed up successfully");
};
