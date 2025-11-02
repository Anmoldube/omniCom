import { StatsCards } from "./components/stats-cards";
import { MessagesChart } from "./components/messages-chart";
import { ResponseTimeChart } from "./components/response-time-chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Analytics Dashboard</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <MessagesChart />
        <ResponseTimeChart />
      </div>
    </div>
  );
}
