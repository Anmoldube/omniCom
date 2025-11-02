"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { analyticsData } from "@/lib/data";

const chartConfig = {
  'Response Time': {
    label: "Response Time (s)",
    color: "hsl(var(--chart-1))",
  },
}

export function ResponseTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Response Time</CardTitle>
        <CardDescription>Shows the average response time in seconds for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={analyticsData.responseTimeChart}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(new Date(value), 'MMM d')}
            />
            <YAxis 
                tickFormatter={(value) => `${value}s`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
                <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-Response-Time)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-Response-Time)" stopOpacity={0.1}/>
                </linearGradient>
            </defs>
            <Area
              dataKey="Response Time"
              type="natural"
              fill="url(#fillTime)"
              stroke="var(--color-Response-Time)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
