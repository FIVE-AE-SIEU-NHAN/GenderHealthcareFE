"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150, cuNghiet: 350 },
  { date: "2024-04-02", desktop: 97, mobile: 180, cuNghiet: 280 },
  { date: "2024-04-03", desktop: 167, mobile: 120, cuNghiet: 151 },
  { date: "2024-04-04", desktop: 242, mobile: 260, cuNghiet: 290 },
  { date: "2024-04-05", desktop: 373, mobile: 290, cuNghiet: 217 },
  { date: "2024-04-06", desktop: 301, mobile: 340, cuNghiet: 283 },
  { date: "2024-04-07", desktop: 245, mobile: 180, cuNghiet: 168 },
  { date: "2024-04-08", desktop: 409, mobile: 320, cuNghiet: 279 },
  { date: "2024-04-09", desktop: 59, mobile: 110, cuNghiet: 162 },
  { date: "2024-04-10", desktop: 261, mobile: 190, cuNghiet: 150 },
  { date: "2024-04-11", desktop: 327, mobile: 350, cuNghiet: 280 },
  { date: "2024-04-12", desktop: 292, mobile: 210, cuNghiet: 223 },
  { date: "2024-04-13", desktop: 342, mobile: 380, cuNghiet: 203 },
  { date: "2024-04-14", desktop: 137, mobile: 220, cuNghiet: 310 },
  { date: "2024-04-15", desktop: 120, mobile: 170, cuNghiet: 166 },
  { date: "2024-04-16", desktop: 138, mobile: 190, cuNghiet: 288 },
  { date: "2024-04-17", desktop: 446, mobile: 360, cuNghiet: 250 },
  { date: "2024-04-18", desktop: 364, mobile: 410, cuNghiet: 307 },
  { date: "2024-04-19", desktop: 243, mobile: 180, cuNghiet: 236 },
  { date: "2024-04-20", desktop: 89, mobile: 150, cuNghiet: 298 },
  { date: "2024-04-21", desktop: 137, mobile: 200, cuNghiet: 302 },
  { date: "2024-04-22", desktop: 224, mobile: 170, cuNghiet: 245 },
  { date: "2024-04-23", desktop: 138, mobile: 230, cuNghiet: 282 },
  { date: "2024-04-24", desktop: 387, mobile: 290, cuNghiet: 242 },
  { date: "2024-04-25", desktop: 215, mobile: 250, cuNghiet: 295 },
  { date: "2024-04-26", desktop: 75, mobile: 130, cuNghiet: 202 },
  { date: "2024-04-27", desktop: 383, mobile: 420, cuNghiet: 292 },
  { date: "2024-04-28", desktop: 122, mobile: 180, cuNghiet: 226 },
  { date: "2024-04-29", desktop: 315, mobile: 240, cuNghiet: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380, cuNghiet: 235 },
  { date: "2024-05-01", desktop: 165, mobile: 220, cuNghiet: 155 },
  { date: "2024-05-02", desktop: 293, mobile: 310, cuNghiet: 241 },
  { date: "2024-05-03", desktop: 247, mobile: 190, cuNghiet: 235 },
  { date: "2024-05-04", desktop: 385, mobile: 420, cuNghiet: 278 },
  { date: "2024-05-05", desktop: 481, mobile: 390, cuNghiet: 175 },
  { date: "2024-05-06", desktop: 498, mobile: 520, cuNghiet: 250 },
  { date: "2024-05-07", desktop: 388, mobile: 300, cuNghiet: 234 },
  { date: "2024-05-08", desktop: 149, mobile: 210, cuNghiet: 209 },
  { date: "2024-05-09", desktop: 227, mobile: 180, cuNghiet: 208 },
  { date: "2024-05-10", desktop: 293, mobile: 330, cuNghiet: 205 },
  { date: "2024-05-11", desktop: 335, mobile: 270, cuNghiet: 213 },
  { date: "2024-05-12", desktop: 197, mobile: 240, cuNghiet: 277 },
  { date: "2024-05-13", desktop: 197, mobile: 160, cuNghiet: 237 },
  { date: "2024-05-14", desktop: 448, mobile: 490, cuNghiet: 230 },
  { date: "2024-05-15", desktop: 473, mobile: 380, cuNghiet: 263 },
  { date: "2024-05-16", desktop: 338, mobile: 400, cuNghiet: 156 },
  { date: "2024-05-17", desktop: 499, mobile: 420, cuNghiet: 295 },
  { date: "2024-05-18", desktop: 315, mobile: 350, cuNghiet: 193 },
  { date: "2024-05-19", desktop: 235, mobile: 180, cuNghiet: 291 },
  { date: "2024-05-20", desktop: 177, mobile: 230, cuNghiet: 221 },
  { date: "2024-05-21", desktop: 82, mobile: 140, cuNghiet: 160 },
  { date: "2024-05-22", desktop: 81, mobile: 120, cuNghiet: 254 },
  { date: "2024-05-23", desktop: 252, mobile: 290, cuNghiet: 275 },
  { date: "2024-05-24", desktop: 294, mobile: 220, cuNghiet: 204 },
  { date: "2024-05-25", desktop: 201, mobile: 250, cuNghiet: 234 },
  { date: "2024-05-26", desktop: 213, mobile: 170, cuNghiet: 153 },
  { date: "2024-05-27", desktop: 420, mobile: 460, cuNghiet: 166 },
  { date: "2024-05-28", desktop: 233, mobile: 190, cuNghiet: 308 },
  { date: "2024-05-29", desktop: 78, mobile: 130, cuNghiet: 257 },
  { date: "2024-05-30", desktop: 340, mobile: 280, cuNghiet: 292 },
  { date: "2024-05-31", desktop: 178, mobile: 230, cuNghiet: 185 },
  { date: "2024-06-01", desktop: 178, mobile: 200, cuNghiet: 172 },
  { date: "2024-06-02", desktop: 470, mobile: 410, cuNghiet: 150 },
  { date: "2024-06-03", desktop: 103, mobile: 160, cuNghiet: 288 },
  { date: "2024-06-04", desktop: 439, mobile: 380, cuNghiet: 309 },
  { date: "2024-06-05", desktop: 88, mobile: 140, cuNghiet: 284 },
  { date: "2024-06-06", desktop: 294, mobile: 250, cuNghiet: 254 },
  { date: "2024-06-07", desktop: 323, mobile: 370, cuNghiet: 219 },
  { date: "2024-06-08", desktop: 385, mobile: 320, cuNghiet: 275 },
  { date: "2024-06-09", desktop: 438, mobile: 480, cuNghiet: 303 },
  { date: "2024-06-10", desktop: 155, mobile: 200, cuNghiet: 250 },
  { date: "2024-06-11", desktop: 92, mobile: 150, cuNghiet: 315 },
  { date: "2024-06-12", desktop: 492, mobile: 420, cuNghiet: 297 },
  { date: "2024-06-13", desktop: 81, mobile: 130, cuNghiet: 236 },
  { date: "2024-06-14", desktop: 426, mobile: 380, cuNghiet: 258 },
  { date: "2024-06-15", desktop: 307, mobile: 350, cuNghiet: 171 },
  { date: "2024-06-16", desktop: 371, mobile: 310, cuNghiet: 282 },
  { date: "2024-06-17", desktop: 475, mobile: 520, cuNghiet: 237 },
  { date: "2024-06-18", desktop: 107, mobile: 170, cuNghiet: 242 },
  { date: "2024-06-19", desktop: 341, mobile: 290, cuNghiet: 214 },
  { date: "2024-06-20", desktop: 408, mobile: 450, cuNghiet: 243 },
  { date: "2024-06-21", desktop: 169, mobile: 210, cuNghiet: 177 },
  { date: "2024-06-22", desktop: 317, mobile: 270, cuNghiet: 234 },
  { date: "2024-06-23", desktop: 480, mobile: 530, cuNghiet: 210 },
  { date: "2024-06-24", desktop: 132, mobile: 180, cuNghiet: 301 },
  { date: "2024-06-25", desktop: 141, mobile: 190, cuNghiet: 319 },
  { date: "2024-06-26", desktop: 434, mobile: 380, cuNghiet: 277 },
  { date: "2024-06-27", desktop: 448, mobile: 490, cuNghiet: 236 },
  { date: "2024-06-28", desktop: 149, mobile: 200, cuNghiet: 308 },
  { date: "2024-06-29", desktop: 103, mobile: 160, cuNghiet: 206 },
  { date: "2024-06-30", desktop: 446, mobile: 400, cuNghiet: 211 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  cuNghiet: {
    label: "Cu Nghiệt",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="cuNghiet"
              type="natural"
              fill="purple"
              stroke="purple"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
