import { CardCompact } from "@/components/card-compact";
import { passwordForgotPath, signUpPath } from "@/paths";
import { SignInForm } from "../features/auth/components/sign-in-form";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot Password?
            </Link>
          </>
        }
      />
    </div>
  );
};
export default SignInPage;
