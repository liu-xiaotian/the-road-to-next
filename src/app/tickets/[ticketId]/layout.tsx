import { getAuth } from "@/app/features/auth/queries/get-auth";
import { getAuthOrRedirect } from "@/app/features/auth/queries/get-auth-or-redirect";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();

  return (
    <>
      {children}
    </>
  );
}
