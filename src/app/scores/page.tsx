
"use client";

import { useState } from "react";
import { MainHeader } from "@/components/MainHeader";
import { AdmissionChart } from "@/components/AdmissionChart";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const SCORE_DATA = {
  "AJC": [
    { year: 2018, "Báo chí": 21.0, "Truyền thông đa phương tiện": 22.5, "Quan hệ công chúng": 22.0 },
    { year: 2019, "Báo chí": 22.5, "Truyền thông đa phương tiện": 23.5, "Quan hệ công chúng": 24.0 },
    { year: 2020, "Báo chí": 24.0, "Truyền thông đa phương tiện": 26.5, "Quan hệ công chúng": 27.0 },
    { year: 2021, "Báo chí": 25.5, "Truyền thông đa phương tiện": 28.0, "Quan hệ công chúng": 28.5 },
    { year: 2022, "Báo chí": 26.0, "Truyền thông đa phương tiện": 28.5, "Quan hệ công chúng": 29.0 },
    { year: 2023, "Báo chí": 25.0, "Truyền thông đa phương tiện": 28.0, "Quan hệ công chúng": 28.5 },
    { year: 2024, "Báo chí": 26.5, "Truyền thông đa phương tiện": 28.7, "Quan hệ công chúng": 29.2 },
  ],
  "USSH-HCM": [
    { year: 2018, "Báo chí": 23.0, "Truyền thông đa phương tiện": 24.0, "Quan hệ công chúng": 23.5 },
    { year: 2019, "Báo chí": 24.0, "Truyền thông đa phương tiện": 25.5, "Quan hệ công chúng": 25.0 },
    { year: 2020, "Báo chí": 25.5, "Truyền thông đa phương tiện": 27.0, "Quan hệ công chúng": 27.5 },
    { year: 2021, "Báo chí": 27.0, "Truyền thông đa phương tiện": 28.0, "Quan hệ công chúng": 28.2 },
    { year: 2022, "Báo chí": 27.5, "Truyền thông đa phương tiện": 28.5, "Quan hệ công chúng": 28.7 },
    { year: 2023, "Báo chí": 26.5, "Truyền thông đa phương tiện": 28.0, "Quan hệ công chúng": 28.5 },
    { year: 2024, "Báo chí": 27.8, "Truyền thông đa phương tiện": 29.0, "Quan hệ công chúng": 29.1 },
  ]
};

const UNIVERSITIES_MAP = {
  "AJC": "Học viện Báo chí và Tuyên truyền",
  "USSH-HCM": "Đại học KHXH&NV TP.HCM"
};

export default function ScoreTracker() {
  const [selectedUni, setSelectedUni] = useState<keyof typeof SCORE_DATA>("AJC");
  const data = SCORE_DATA[selectedUni];
  const majors = Object.keys(data[0]).filter(k => k !== 'year');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary mb-4">Theo dõi Điểm chuẩn</h1>
            <p className="text-muted-foreground max-w-2xl">
              Phân tích xu hướng điểm chuẩn các ngành truyền thông từ năm 2018 đến nay của các trường đại học top đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Xu hướng điểm chuẩn</CardTitle>
                  <CardDescription>Biểu đồ biến thiên điểm qua các năm</CardDescription>
                </div>
                <div className="w-64">
                  <Select 
                    value={selectedUni} 
                    onValueChange={(v) => setSelectedUni(v as keyof typeof SCORE_DATA)}
                  >
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Chọn trường đại học" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(UNIVERSITIES_MAP).map(([key, name]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-10">
                <AdmissionChart data={data} majors={majors} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Bảng dữ liệu chi tiết</CardTitle>
                  <CardDescription>Số liệu cụ thể từng năm của {UNIVERSITIES_MAP[selectedUni]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Năm</TableHead>
                        {majors.map(m => (
                          <TableHead key={m} className="text-right">{m}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...data].reverse().map((row) => (
                        <TableRow key={row.year}>
                          <TableCell className="font-medium">{row.year}</TableCell>
                          {majors.map(m => (
                            <TableCell key={m} className="text-right font-semibold text-primary">
                              {row[m]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-primary text-white">
                <CardHeader>
                  <CardTitle>Nhận định xu hướng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-white/10 rounded-xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary text-primary">Tăng mạnh</Badge>
                      Giai đoạn 2020-2022
                    </h4>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Điểm chuẩn các ngành truyền thông có xu hướng tăng vọt do nhu cầu nhân lực chất lượng cao trong thời kỳ chuyển đổi số.
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary text-primary">Ổn định</Badge>
                      Giai đoạn 2023-2024
                    </h4>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Điểm chuẩn có dấu hiệu bão hòa và ổn định ở mức cao (trên 27 điểm đối với các trường top đầu).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
