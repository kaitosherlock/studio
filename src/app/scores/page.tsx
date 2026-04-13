
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

// Dữ liệu điểm chuẩn thực tế từ diemthi.tuyensinh247.com (phương thức tốt nghiệp THPT)
// Cột: 2022, 2023, 2024
const ALL_SCHOOLS_DATA = [
  { id: "AJC", name: "HV Báo chí & Tuyên truyền", nganh: "Truyền thông đại chúng", scores: { "2022": 26.65, "2023": 26.8, "2024": 35.74 }, toHop: "D01", group: "top" },
  { id: "AJC2", name: "HV Báo chí & Tuyên truyền", nganh: "Truyền thông quốc tế", scores: { "2022": 36.06, "2023": 35.9, "2024": 37 }, toHop: "X78", group: "top" },
  { id: "AJC3", name: "HV Báo chí & Tuyên truyền", nganh: "Quảng cáo", scores: { "2022": 36.02, "2023": 35.58, "2024": 36 }, toHop: "X79", group: "top" },
  { id: "HANU", name: "ĐH Hà Nội", nganh: "Truyền thông doanh nghiệp", scores: { "2022": 34.1, "2023": 31.05, "2024": 26.35 }, toHop: "D01; D03", group: "top" },
  { id: "DAV", name: "HV Ngoại Giao", nganh: "Truyền thông quốc tế", scores: { "2022": 25.96, "2023": 29.05, "2024": 25.9 }, toHop: "A00; A01; D01", group: "top" },
  { id: "HUST", name: "ĐH Bách Khoa Hà Nội", nganh: "Truyền thông số & KT đa phương tiện", scores: { "2022": 25.73, "2023": 26.61, "2024": 26.62 }, toHop: "B03; C01; X02", group: "top" },
  { id: "UEH", name: "ĐH Kinh Tế TP.HCM", nganh: "Truyền thông số & Thiết kế ĐPT", scores: { "2022": 26.33, "2023": 26.6, "2024": 26.3 }, toHop: "A00; A01; D01", group: "top" },
  { id: "VHU", name: "ĐH Việt Hàn - ĐN", nganh: "Công nghệ truyền thông", scores: { "2022": null, "2023": 23.7, "2024": 21 }, toHop: "A00; A01; D01", group: "mid" },
  { id: "TNU", name: "ĐH Công Đoàn", nganh: "Truyền thông đại chúng", scores: { "2022": null, "2023": null, "2024": 24.7 }, toHop: "D01; D14; X79", group: "mid" },
  { id: "HKHN", name: "TH KHLN & Nghệ thuật HN", nganh: "Công nghệ truyền thông", scores: { "2022": null, "2023": null, "2024": 23 }, toHop: "D01", group: "mid" },
  { id: "QGHN", name: "Trường Quốc Tế ĐHQG HN", nganh: "Truyền thông số", scores: { "2022": null, "2023": null, "2024": 22 }, toHop: "A00; A01; D01", group: "mid" },
  { id: "HKH", name: "ĐH Khoa Học Huế", nganh: "Truyền thông số", scores: { "2022": 16.5, "2023": null, "2024": 20 }, toHop: "C00; D01", group: "mid" },
  { id: "TNUT", name: "ĐH CNTT&TT Thái Nguyên", nganh: "Công nghệ truyền thông", scores: { "2022": 17, "2023": 19.7, "2024": 19 }, toHop: "A00; A01; D01", group: "mid" },
  { id: "UEF", name: "ĐH Kinh Tế Tài Chính HCM", nganh: "Công nghệ TT (Truyền thông số)", scores: { "2022": 18, "2023": 18, "2024": 16 }, toHop: "C01; D01", group: "low" },
  { id: "VLU", name: "ĐH Văn Lang", nganh: "Công nghệ truyền thông", scores: { "2022": 16, "2023": 16, "2024": 15 }, toHop: "A00; C00; D01", group: "low" },
  { id: "HSU", name: "ĐH Hoa Sen", nganh: "Quản trị CN truyền thông", scores: { "2022": 15, "2023": 16, "2024": 15 }, toHop: "A00; A01; D01", group: "low" },
  { id: "GDU", name: "ĐH Gia Định", nganh: "Công nghệ truyền thông", scores: { "2022": null, "2023": 15, "2024": 15 }, toHop: "A00; C00; D01", group: "low" },
];

// Dữ liệu theo năm cho biểu đồ (top schools)
const CHART_DATA_BY_SCHOOL = {
  "AJC-TT": {
    label: "AJC - Truyền thông ĐC",
    data: [
      { year: "2022", score: 26.65 },
      { year: "2023", score: 26.8 },
      { year: "2024", score: 35.74 },
    ]
  },
  "AJC-QT": {
    label: "AJC - Truyền thông QT",
    data: [
      { year: "2022", score: 36.06 },
      { year: "2023", score: 35.9 },
      { year: "2024", score: 37 },
    ]
  },
  "HANU": {
    label: "ĐH Hà Nội",
    data: [
      { year: "2022", score: 34.1 },
      { year: "2023", score: 31.05 },
      { year: "2024", score: 26.35 },
    ]
  },
  "DAV": {
    label: "HV Ngoại Giao",
    data: [
      { year: "2022", score: 25.96 },
      { year: "2023", score: 29.05 },
      { year: "2024", score: 25.9 },
    ]
  },
  "HUST": {
    label: "ĐH Bách Khoa HN",
    data: [
      { year: "2022", score: 25.73 },
      { year: "2023", score: 26.61 },
      { year: "2024", score: 26.62 },
    ]
  },
  "UEH": {
    label: "ĐH Kinh Tế HCM",
    data: [
      { year: "2022", score: 26.33 },
      { year: "2023", score: 26.6 },
      { year: "2024", score: 26.3 },
    ]
  },
};

type SchoolKey = keyof typeof CHART_DATA_BY_SCHOOL;

const SCORE_LEGACY = {
  "AJC-TT": CHART_DATA_BY_SCHOOL["AJC-TT"].data.map(d => ({ year: parseInt(d.year), score: d.score })),
  "AJC-QT": CHART_DATA_BY_SCHOOL["AJC-QT"].data.map(d => ({ year: parseInt(d.year), score: d.score })),
  "HANU": CHART_DATA_BY_SCHOOL["HANU"].data.map(d => ({ year: parseInt(d.year), score: d.score })),
};

function getGroupLabel(g: string) {
  if (g === "top") return { label: "Top", color: "bg-blue-100 text-blue-800" };
  if (g === "mid") return { label: "Trung bình", color: "bg-yellow-100 text-yellow-800" };
  return { label: "Rộng đầu vào", color: "bg-green-100 text-green-800" };
}

export default function ScoreTracker() {
  const [selectedSchool, setSelectedSchool] = useState<SchoolKey>("AJC-TT");
  const chartData = CHART_DATA_BY_SCHOOL[selectedSchool].data.map(d => ({
    year: parseInt(d.year),
    "Điểm chuẩn": d.score,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl font-headline font-bold text-primary mb-3">Điểm chuẩn ngành Truyền thông</h1>
            <p className="text-muted-foreground max-w-3xl text-base">
              Tổng hợp điểm chuẩn thực tế (phương thức xét tốt nghiệp THPT) các trường đào tạo ngành Truyền thông & Quảng cáo từ năm 2022–2024.
              Nguồn: <a href="https://diemthi.tuyensinh247.com/nganh-dao-tao/truyen-thong-quang-cao-58.html" target="_blank" rel="noopener noreferrer" className="text-primary underline">diemthi.tuyensinh247.com</a>
            </p>
            <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 mt-3 max-w-3xl">
              ⚠️ Lưu ý: Điểm chuẩn cao hơn 30 (như AJC) là do cộng điểm ưu tiên khu vực và đối tượng. Điểm gốc 3 môn thi tối đa là 30.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Biểu đồ */}
            <Card className="border shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b flex flex-row items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-lg">Xu hướng điểm chuẩn theo năm</CardTitle>
                  <CardDescription>Biến thiên điểm chuẩn 2022–2024 theo từng trường</CardDescription>
                </div>
                <div className="w-72">
                  <Select
                    value={selectedSchool}
                    onValueChange={(v) => setSelectedSchool(v as SchoolKey)}
                  >
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Chọn trường / ngành" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CHART_DATA_BY_SCHOOL).map(([key, val]) => (
                        <SelectItem key={key} value={key}>{val.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-8 pb-4">
                <AdmissionChart data={chartData} majors={["Điểm chuẩn"]} />
              </CardContent>
            </Card>

            {/* Bảng tất cả các trường */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle>Bảng điểm chuẩn tất cả các trường (2022–2024)</CardTitle>
                <CardDescription>Dữ liệu điểm chuẩn xét tuyển bằng phương thức tốt nghiệp THPT</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="pl-6 w-8">#</TableHead>
                        <TableHead>Trường đại học</TableHead>
                        <TableHead>Ngành / Chuyên ngành</TableHead>
                        <TableHead className="text-center w-20">Tổ hợp</TableHead>
                        <TableHead className="text-right w-20">2022</TableHead>
                        <TableHead className="text-right w-20">2023</TableHead>
                        <TableHead className="text-right w-20">2024</TableHead>
                        <TableHead className="text-center w-28">Mức độ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ALL_SCHOOLS_DATA.map((row, idx) => {
                        const g = getGroupLabel(row.group);
                        return (
                          <TableRow key={row.id} className="hover:bg-muted/30">
                            <TableCell className="pl-6 text-muted-foreground text-sm">{idx + 1}</TableCell>
                            <TableCell className="font-semibold text-sm">{row.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{row.nganh}</TableCell>
                            <TableCell className="text-center text-xs text-muted-foreground">{row.toHop.split(";")[0]}…</TableCell>
                            <TableCell className="text-right">
                              {row.scores["2022"] ? (
                                <span className="font-semibold text-primary">{row.scores["2022"]}</span>
                              ) : <span className="text-muted-foreground text-xs">—</span>}
                            </TableCell>
                            <TableCell className="text-right">
                              {row.scores["2023"] ? (
                                <span className="font-semibold text-primary">{row.scores["2023"]}</span>
                              ) : <span className="text-muted-foreground text-xs">—</span>}
                            </TableCell>
                            <TableCell className="text-right">
                              {row.scores["2024"] ? (
                                <span className="font-bold text-primary text-base">{row.scores["2024"]}</span>
                              ) : <span className="text-muted-foreground text-xs">—</span>}
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${g.color}`}>{g.label}</span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Nhận định & Thông tin tổ hợp */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border shadow-sm bg-primary text-white">
                <CardHeader>
                  <CardTitle>Nhận định xu hướng điểm chuẩn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white/10 rounded-xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary text-white">AJC dẫn đầu</Badge>
                    </h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Học viện Báo chí & Tuyên truyền có điểm chuẩn cao nhất (35–37 điểm có cộng ưu tiên), 
                      đặc biệt ngành Truyền thông quốc tế luôn trên 35 điểm qua các năm.
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary text-white">Top trường 25–27 điểm</Badge>
                    </h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Bách Khoa HN, ĐH Hà Nội, HV Ngoại Giao, ĐH Kinh Tế HCM duy trì ổn định 
                      ở mức 25–27 điểm, phù hợp với học sinh khá–giỏi.
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary text-white">Cơ hội cho mọi học sinh</Badge>
                    </h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Nhiều trường tư thục và địa phương nhận từ 15–20 điểm, 
                      tạo cơ hội học tập rộng rãi cho tất cả học sinh yêu thích ngành truyền thông.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Tổ hợp xét tuyển phổ biến</CardTitle>
                  <CardDescription>Các khối môn thường gặp ngành Truyền thông & Quảng cáo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { code: "D01", desc: "Toán, Ngữ Văn, Tiếng Anh", popular: true },
                      { code: "A01", desc: "Toán, Vật lí, Tiếng Anh", popular: true },
                      { code: "A00", desc: "Toán, Vật lí, Hóa học", popular: false },
                      { code: "C00", desc: "Ngữ Văn, Lịch Sử, Địa Lý", popular: false },
                      { code: "C01", desc: "Ngữ Văn, Toán, Vật lí", popular: false },
                      { code: "D14", desc: "Ngữ Văn, Lịch Sử, Tiếng Anh", popular: true },
                    ].map((t) => (
                      <div key={t.code} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border">
                        <span className="font-bold text-primary w-10 text-sm">{t.code}</span>
                        <span className="text-sm text-foreground flex-1">{t.desc}</span>
                        {t.popular && <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Phổ biến</span>}
                      </div>
                    ))}
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
