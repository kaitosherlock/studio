
"use client";

import { MainHeader } from "@/components/MainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Review Ngành Truyền thông Đa phương tiện - Có gì hot?",
    category: "Hướng nghiệp",
    thumbnail: "https://picsum.photos/seed/v1/600/400",
    embedId: "q5S6789", // Placeholder
    duration: "12:45"
  },
  {
    id: 2,
    title: "Một ngày làm sinh viên RMIT ngành Truyền thông chuyên nghiệp",
    category: "Sinh viên",
    thumbnail: "https://picsum.photos/seed/v2/600/400",
    embedId: "w123456",
    duration: "15:20"
  },
  {
    id: 3,
    title: "Phỏng vấn Chuyên gia: Tương lai ngành Giải trí tại Việt Nam",
    category: "Chuyên gia",
    thumbnail: "https://picsum.photos/seed/v3/600/400",
    embedId: "e789012",
    duration: "08:15"
  },
  {
    id: 4,
    title: "Campus Tour: Tham quan Học viện Báo chí & Tuyên truyền",
    category: "Tham quan",
    thumbnail: "https://picsum.photos/seed/v4/600/400",
    embedId: "r345678",
    duration: "10:30"
  },
  {
    id: 5,
    title: "Cơ hội việc làm ngành Quan hệ Công chúng (PR)",
    category: "Nghề nghiệp",
    thumbnail: "https://picsum.photos/seed/v5/600/400",
    embedId: "t901234",
    duration: "06:40"
  }
];

export default function VideoShowcase() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary mb-4">Video thực tế</h1>
            <p className="text-muted-foreground">
              Lắng nghe chia sẻ từ các chuyên gia, giảng viên và sinh viên đang theo học ngành Truyền thông & Giải trí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map((video) => (
              <Card key={video.id} className="overflow-hidden border-none shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-secondary text-primary flex items-center justify-center">
                      <Play className="h-6 w-6 fill-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <Badge variant="outline" className="text-secondary border-secondary">{video.category}</Badge>
                  </div>
                  <CardTitle className="text-lg font-headline mt-2 leading-tight group-hover:text-primary transition-colors">
                    {video.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-20 p-12 bg-white rounded-3xl text-center shadow-xl shadow-primary/5">
            <h2 className="text-2xl font-headline font-bold mb-6">Bạn có thắc mắc khác?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Sử dụng trợ lý AI của chúng tôi để nhận các gợi ý chương trình học cá nhân hóa dựa trên sở thích và năng lực của bạn.
            </p>
            <Button size="lg" className="rounded-full bg-primary" asChild>
              <a href="/recommender">Dùng thử Tư vấn AI</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
