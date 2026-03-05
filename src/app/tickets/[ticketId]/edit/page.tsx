import { TicketUpsertForm } from "@/app/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/app/features/ticket/queries/get-ticket";
import { CardCompact } from "@/components/card-compact";
import { notFound } from "next/navigation";

// 1. 类型定义也要更新，表明 params 是一个 Promise
type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};
const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  // 2. 【关键修复】必须 await params 才能获取里面的属性
  const { ticketId } = await params;

  // 现在 ticketId 是正常的字符串了
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-1 flex-col justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket"
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </>
  );
};

export default TicketEditPage;
