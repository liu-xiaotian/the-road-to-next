"use server";

import prisma from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string },
  formData: FormData,
) => {
  const data = {
    // id: formData.get("id"),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.upsert({
    where: { id: id || "" },
    update: data,
    create: data,
  });

  // await prisma.ticket.update({
  //   where: {
  //     // id: data.id as string,
  //     id,
  //   },
  //   data: {
  //     title: data.title as string,
  //     content: data.content as string,
  //   },
  // });

  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketPath(id));
  }

  return { message: "Ticket create" };
};
