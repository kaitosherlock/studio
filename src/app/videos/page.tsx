
"use client";

import { useState } from "react";
import { MainHeader } from "@/components/MainHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";

// Video IDs thực tế từ YouTube về ngành Truyền thông Việt Nam
const VIDEOS = [
  {
    id: 1,
    title: "Review ngành Truyền thông của Học viện Báo chí và Tuyên truyền",
    category: "Hướng nghiệp",
    youtubeId: "AksyzKX85E8",
    description: "Chia sẻ thực tế về ngành Quan hệ công chúng và Truyền thông Đa phương tiện tại AJC – chuyện học hành, thực hành và cơ hội nghề nghiệp.",
  },
  {
    id: 2,
    title: "Học Truyền Thông Có Gì Thú Vị? – Review Ngành học",
    category: "Sinh viên",
    youtubeId: "ySGoUC4hksE",
    description: "Trò chuyện cùng sinh viên Đại học Hoa Sen về trải nghiệm học ngành Truyền thông – những điều thú vị và thách thức thực tế.",
  },
  {
    id: 3,
    title: "Review Ngành Truyền thông Doanh Nghiệp – Đại học Hà Nội",
    category: "Trường đại học",
    youtubeId: "9Og0xFgkmNY",
    description: "Sinh viên ngành Truyền thông Doanh Nghiệp tại Đại học Hà Nội chia sẻ về chương trình học, hoạt động ngoại khóa và định hướng tương lai.",
  },
  {
    id: 4,
    title: "Tổng quan ngành Truyền thông & hướng nghiệp",
    category: "Hướng nghiệp",
    youtubeId: "esYGvlhUZ9M",
    description: "Video tổng quan về ngành Truyền thông tại Việt Nam: các chuyên ngành, cơ hội việc làm và lời khuyên cho học sinh chọn ngành.",
  },
  {
    id: 5,
    title: "Ngành Quan hệ Công chúng – Học gì, Làm gì?",
    category: "Nghề nghiệp",
    youtubeId: "HWHVLjTmFac",
    description: "Khám phá ngành Quan hệ Công chúng (PR): chương trình đào tạo, kỹ năng cần có và các vị trí công việc sau khi ra trường.",
  },
  {
    id: 6,
    title: "Review ngành Truyền thông – Câu hỏi thường gặp",
    category: "Hướng nghiệp",
    youtubeId: "dfyZOBqQpRg",
    description: "Giải đáp các câu hỏi thường gặp khi chọn ngành Truyền thông: nên học trường nào, tổ hợp môn gì, ra trường làm gì.",
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-4xl font-headline font-bold text-primary mb-3">Video giới thiệu ngành</h1>
            <p className="text-muted-foreground text-base max-w-2xl">
              Xem chia sẻ thực tế từ sinh viên và chuyên gia về ngành Truyền thông & Quảng cáo tại các trường đại học Việt Nam.
            </p>
          </div>

          {/* Video đang phát (featured embed) */}
          {activeVideo && (
            <div className="mb-10 relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={() => setActiveVideo(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Lưới video */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-lg transition-all duration-200"
                onClick={() => setActiveVideo(video.youtubeId)}
              >
                {/* Thumbnail từ YouTube */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Overlay play button */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
                      <Play className="h-7 w-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                  {/* YouTube logo badge */}
                  <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    YouTube
                  </div>
                </div>

                {/* Thông tin video */}
                <div className="p-4">
                  <Badge variant="outline" className="text-secondary border-secondary mb-2 text-xs">
                    {video.category}
                  </Badge>
                  <h3 className="font-semibold text-sm text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA section */}
          <div className="mt-16 p-10 bg-white rounded-3xl text-center shadow-xl shadow-primary/5 border">
            <h2 className="text-2xl font-headline font-bold mb-4">Vẫn chưa biết chọn ngành phù hợp?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Sử dụng trợ lý AI của chúng tôi để nhận gợi ý chương trình học cá nhân hóa dựa trên sở thích và năng lực của bạn.
            </p>
            <Button size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90" asChild>
              <a href="/recommender">Dùng thử Tư vấn AI ngay</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
