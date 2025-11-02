import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export function StatsCards() {
  const { stats } = analyticsData;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={cn("text-xs text-muted-foreground flex items-center", {
                'text-green-600': stat.changeType === 'positive',
                'text-red-600': stat.changeType === 'negative',
            })}>
              {stat.changeType === 'positive' ? <ArrowUp className="h-3 w-3 mr-1"/> : <ArrowDown className="h-3 w-3 mr-1" />}
              {stat.change} vs last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
