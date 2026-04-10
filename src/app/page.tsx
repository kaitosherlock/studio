
import Image from "next/image";
import Link from "next/link";
import { MainHeader } from "@/components/MainHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tv, 
  Megaphone, 
  Users, 
  Clapperboard, 
  Briefcase, 
  ChevronRight,
  MonitorPlay,
  Share2,
  TrendingUp,
  Sparkles,
  Compass
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const sectors = [
  {
    title: "Sản xuất Phim & Truyền hình",
    description: "Từ biên kịch, đạo diễn đến hậu kỳ, tạo ra những câu chuyện hình ảnh lay động lòng người.",
    icon: Clapperboard,
  },
  {
    title: "Báo chí & Truyền thông số",
    description: "Cung cấp tin tức và nội dung trên các nền tảng đa phương tiện hiện đại.",
    icon: Tv,
  },
  {
    title: "Quan hệ công chúng (PR)",
    description: "Xây dựng và duy trì hình ảnh, uy tín của tổ chức trong mắt công chúng.",
    icon: Users,
  },
  {
    title: "Quảng cáo & Marketing",
    description: "Sáng tạo các chiến dịch truyền thông nhằm kết nối sản phẩm với khách hàng.",
    icon: Megaphone,
  },
];

const careers = [
  "Nhà sản xuất nội dung (Content Creator)",
  "Chuyên viên truyền thông mạng xã hội",
  "Biên tập viên truyền hình/báo chí",
  "Đạo diễn nghệ thuật/sáng tạo",
  "Quản lý sự kiện & giải trí",
  "Chuyên gia tư vấn thương hiệu",
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-media');

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover brightness-[0.4]"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-6xl font-headline font-bold mb-6 leading-tight">
                Định hướng tương lai <br />
                <span className="text-secondary">Ngành Truyền thông</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                Khám phá thế giới đa sắc màu của ngành Truyền thông & Giải trí. Media Compass cung cấp lộ trình chi tiết về chương trình đào tạo, cơ hội nghề nghiệp và danh sách các trường đại học hàng đầu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-12 px-8">
                  Bắt đầu khám phá
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-full h-12 px-8">
                  Tư vấn cùng AI
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-headline font-bold mb-4 text-primary">Ngành Truyền thông & Giải trí là gì?</h2>
              <p className="text-muted-foreground text-lg">
                Đây là lĩnh vực chuyên nghiên cứu về cách thức tạo ra, phân phối và quản lý thông tin, nội dung giải trí thông qua các phương tiện đại chúng và nền tảng số.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sectors.map((sector) => (
                <Card key={sector.title} className="border-none shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform">
                  <CardContent className="pt-8">
                    <div className="h-12 w-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center mb-6">
                      <sector.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-3">{sector.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {sector.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Career Paths & Curriculum */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-headline font-bold mb-6 text-primary">Cơ hội nghề nghiệp rộng mở</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Với sự bùng nổ của kinh tế số, cử nhân ngành Truyền thông & Giải trí luôn được săn đón tại các tập đoàn đa quốc gia, agency sáng tạo và các cơ quan truyền thông lớn.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {careers.map((career) => (
                    <div key={career} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-primary/5">
                      <div className="h-2 w-2 rounded-full bg-secondary" />
                      <span className="font-medium text-sm">{career}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-10 rounded-full h-12 bg-primary group" asChild>
                  <Link href="/universities" className="flex items-center gap-2">
                    Xem danh sách các trường
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  {PlaceHolderImages.find(i => i.id === 'industry-career') && (
                    <Image
                      src={PlaceHolderImages.find(i => i.id === 'industry-career')!.imageUrl}
                      alt="Industry Career"
                      fill
                      className="object-cover"
                      data-ai-hint="media professional"
                    />
                  )}
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border-l-4 border-secondary">
                  <p className="text-sm italic text-muted-foreground">
                    "Truyền thông là công cụ mạnh mẽ nhất để thay đổi thế giới trong kỷ nguyên hiện nay."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold mb-6">Bạn đã sẵn sàng để bắt đầu?</h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto">
              Sử dụng các công cụ của chúng tôi để tìm kiếm trường đại học phù hợp và theo dõi xu hướng điểm chuẩn các năm.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/scores" className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors w-40">
                <TrendingUp className="h-8 w-8 text-secondary" />
                <span className="font-medium">Điểm chuẩn</span>
              </Link>
              <Link href="/videos" className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors w-40">
                <MonitorPlay className="h-8 w-8 text-secondary" />
                <span className="font-medium">Video thực tế</span>
              </Link>
              <Link href="/recommender" className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors w-40">
                <Sparkles className="h-8 w-8 text-secondary" />
                <span className="font-medium">Tư vấn AI</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-lg font-headline font-bold text-primary tracking-tight">
                MEDIA COMPASS
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Media Compass. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Share2 className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
