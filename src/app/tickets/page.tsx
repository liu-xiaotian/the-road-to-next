import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { TicketList } from "../features/ticket/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { Placeholder } from "@/components/placeholder";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "../features/ticket/components/ticket-upsert-form";

// export const dynamic = "force-dynamic"; 强制改为动态
export const revalidate = 5;

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"Tickets Page"}
        description={"All your tickets at one place"}
      />
      <CardCompact
        title="Create Ticket"
        description="A new Ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />
      <ErrorBoundary fallback={<Placeholder label="Something went wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
