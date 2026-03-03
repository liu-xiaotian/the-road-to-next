"use server";

import prisma from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { title } from "process";
import { z } from "zod";

const upsertTickeSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string },
  formData: FormData,
) => {
  try {
    const data = upsertTickeSchema.parse({
      // id: formData.get("id"),
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: data,
      create: data,
    });
  } catch (error) {
    return { message: "Something went wrong" };
  }

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
