
"use client";

import { useState } from "react";
import { MainHeader } from "@/components/MainHeader";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Globe, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UNIVERSITIES = [
  {
    id: 1,
    name: "Đại học RMIT Việt Nam",
    location: "TP. Hồ Chí Minh & Hà Nội",
    type: "Quốc tế",
    programs: ["Truyền thông chuyên nghiệp", "Sản xuất Phim kỹ thuật số", "Thiết kế (Truyền thông đa phương tiện)"],
    website: "https://www.rmit.edu.vn",
    image: "https://picsum.photos/seed/rmit/600/400",
    description: "Môi trường học tập chuẩn quốc tế với các trang thiết bị hiện đại hàng đầu."
  },
  {
    id: 2,
    name: "Học viện Báo chí và Tuyên truyền (AJC)",
    location: "Hà Nội",
    type: "Công lập",
    programs: ["Báo chí", "Truyền thông đa phương tiện", "Quan hệ công chúng"],
    website: "https://ajc.hcma.vn",
    image: "https://picsum.photos/seed/ajc/600/400",
    description: "Cái nôi đào tạo những nhà báo và chuyên gia truyền thông hàng đầu Việt Nam."
  },
  {
    id: 3,
    name: "Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM",
    location: "TP. Hồ Chí Minh",
    type: "Công lập",
    programs: ["Báo chí", "Truyền thông đa phương tiện", "Quan hệ công chúng"],
    website: "https://hcmussh.edu.vn",
    image: "https://picsum.photos/seed/ussh/600/400",
    description: "Một trong những trường đại học uy tín nhất trong đào tạo các ngành nhân văn và truyền thông."
  },
  {
    id: 4,
    name: "Đại học FPT",
    location: "Toàn quốc",
    type: "Tư thục",
    programs: ["Truyền thông đa phương tiện"],
    website: "https://fpt.edu.vn",
    image: "https://picsum.photos/seed/fpt/600/400",
    description: "Tập trung vào kỹ năng thực hành và ứng dụng công nghệ trong truyền thông."
  },
  {
    id: 5,
    name: "Đại học Swinburne Việt Nam",
    location: "Toàn quốc",
    type: "Quốc tế",
    programs: ["Truyền thông đa phương tiện"],
    website: "https://swinburne-vn.edu.vn",
    image: "https://picsum.photos/seed/swin/600/400",
    description: "Chương trình đào tạo từ Úc với định hướng nghề nghiệp thực tế."
  }
];

export default function UniversityDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredUnis = UNIVERSITIES.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          uni.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "All" || uni.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-xl">
              <h1 className="text-4xl font-headline font-bold text-primary mb-4">Danh mục các trường Đại học</h1>
              <p className="text-muted-foreground">
                Tìm kiếm và so sánh các trường đại học đào tạo ngành Truyền thông & Giải trí uy tín nhất tại Việt Nam.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Bộ lọc tìm kiếm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Từ khóa</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Tên trường, ngành học..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Loại hình trường</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Công lập", "Tư thục", "Quốc tế"].map((type) => (
                        <Button
                          key={type}
                          variant={filterType === type ? "default" : "outline"}
                          size="sm"
                          className="rounded-full"
                          onClick={() => setFilterType(type)}
                        >
                          {type === "All" ? "Tất cả" : type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* University List */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUnis.length > 0 ? (
                  filteredUnis.map((uni) => (
                    <Card key={uni.id} className="overflow-hidden hover:shadow-lg transition-all border-none">
                      <div className="relative h-48">
                        <Image 
                          src={uni.image} 
                          alt={uni.name} 
                          fill 
                          className="object-cover" 
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-white border-none">{uni.type}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-headline leading-tight hover:text-primary transition-colors cursor-pointer">
                          {uni.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <MapPin className="h-4 w-4" />
                          {uni.location}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {uni.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ngành đào tạo chính:</p>
                          <div className="flex flex-wrap gap-2">
                            {uni.programs.map((p) => (
                              <Badge key={p} variant="secondary" className="font-normal text-[10px]">{p}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between items-center">
                        <Link href={uni.website} target="_blank" className="text-sm text-primary flex items-center gap-1 hover:underline font-medium">
                          <Globe className="h-4 w-4" />
                          Trang web
                        </Link>
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                          Chi tiết
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-muted-foreground">Không tìm thấy trường nào phù hợp với tiêu chí của bạn.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
