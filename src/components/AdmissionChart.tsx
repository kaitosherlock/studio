
"use client";

import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ScoreData {
  year: number;
  [key: string]: number | string;
}

interface AdmissionChartProps {
  data: ScoreData[];
  majors: string[];
}

export function AdmissionChart({ data, majors }: AdmissionChartProps) {
  const chartConfig = majors.reduce((acc, major, index) => {
    acc[major] = {
      label: major,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    };
    return acc;
  }, {} as any);

  return (
    <div className="h-[400px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              domain={([dataMin, dataMax]: [number, number]) => [Math.max(0, Math.floor(dataMin) - 2), Math.ceil(dataMax) + 2]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            {majors.map((major, index) => (
              <Line
                key={major}
                type="monotone"
                dataKey={major}
                stroke={`hsl(var(--chart-${(index % 5) + 1}))`}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
      </ChartContainer>
    </div>
  );
}
