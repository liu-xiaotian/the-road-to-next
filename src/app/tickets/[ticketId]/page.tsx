import { TicketItem } from "@/app/features/ticket/components/ticket-item";
import { getTicket } from "@/app/features/ticket/queries/get-ticket";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Placeholder } from "@/components/placeholder";
import { RedirectToast } from "@/components/redirect-toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";
import Link from "next/link";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
