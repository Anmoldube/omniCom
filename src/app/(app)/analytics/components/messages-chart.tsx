"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { analyticsData } from "@/lib/data";
import { ChannelIcon } from "@/components/channel-icon"

const chartConfig = {
  sms: {
    label: "SMS",
    color: "hsl(var(--chart-1))",
    icon: () => <ChannelIcon channel="sms" />,
  },
  whatsapp: {
    label: "WhatsApp",
    color: "hsl(var(--chart-2))",
    icon: () => <ChannelIcon channel="whatsapp" />,
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-3))",
    icon: () => <ChannelIcon channel="email" />,
  },
}

export function MessagesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Volume by Channel</CardTitle>
        <CardDescription>January - July 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart accessibilityLayer data={analyticsData.messagesChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="sms" fill="var(--color-sms)" radius={4} />
            <Bar dataKey="whatsapp" fill="var(--color-whatsapp)" radius={4} />
            <Bar dataKey="email" fill="var(--color-email)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
