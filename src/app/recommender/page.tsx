
"use client";

import { useState } from "react";
import { MainHeader } from "@/components/MainHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, BookOpen, MapPin, GraduationCap } from "lucide-react";
import { personalizedProgramRecommender, type PersonalizedProgramRecommenderOutput } from "@/ai/flows/personalized-program-recommender-flow";

export default function AIRecommender() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedProgramRecommenderOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const interests = formData.get("interests") as string;
    const academicBackground = formData.get("academicBackground") as string;
    const careerAspirations = formData.get("careerAspirations") as string;

    try {
      const output = await personalizedProgramRecommender({
        interests,
        academicBackground,
        careerAspirations
      });
      setResult(output);
    } catch (err) {
      setError("Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-secondary" />
              Tư vấn AI Cá nhân hóa
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cung cấp một vài thông tin về bản thân để nhận được gợi ý những chương trình học và chuyên ngành phù hợp nhất với bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Thông tin của bạn</CardTitle>
                  <CardDescription>Vui lòng điền chi tiết để AI có thể đưa ra kết quả chính xác nhất.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="interests">Sở thích & Đam mê</Label>
                      <Textarea 
                        id="interests" 
                        name="interests"
                        placeholder="VD: Quay phim, chỉnh sửa video, viết blog, tổ chức sự kiện..." 
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicBackground">Nền tảng học thuật</Label>
                      <Input 
                        id="academicBackground" 
                        name="academicBackground"
                        placeholder="VD: HS lớp 12, khối D, điểm trung bình 8.5..." 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="careerAspirations">Định hướng nghề nghiệp</Label>
                      <Input 
                        id="careerAspirations" 
                        name="careerAspirations"
                        placeholder="VD: Đạo diễn, Content Creator, Chuyên viên PR..." 
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary h-12 rounded-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang phân tích...
                        </>
                      ) : (
                        "Nhận gợi ý ngay"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-3 space-y-6">
              {loading && (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-primary/20">
                  <div className="relative mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
                      <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute top-0 right-0 h-4 w-4 bg-secondary rounded-full animate-bounce" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">Đang xử lý dữ liệu...</h3>
                  <p className="text-muted-foreground text-center">AI đang tìm kiếm các chương trình học phù hợp nhất dựa trên hồ sơ của bạn.</p>
                </div>
              )}

              {error && (
                <div className="p-6 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 text-center">
                  {error}
                </div>
              )}

              {!loading && !result && !error && (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-60">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">Kết quả sẽ hiển thị ở đây</h3>
                  <p className="text-muted-foreground">Hãy điền thông tin bên trái và nhấn nút để bắt đầu.</p>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-headline font-bold text-primary px-2">Gợi ý dành riêng cho bạn:</h2>
                  {result.recommendations.map((rec, index) => (
                    <Card key={index} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-secondary">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 text-primary font-bold">
                            <GraduationCap className="h-5 w-5" />
                            {rec.universityName}
                          </div>
                          <Badge variant="outline" className="text-secondary border-secondary">Phù hợp</Badge>
                        </div>
                        <CardTitle className="text-xl font-headline mt-1">{rec.programName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/30 p-4 rounded-xl mb-4">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            <span className="font-bold text-primary/80">Lý do: </span>
                            {rec.reasoning}
                          </p>
                        </div>
                        {rec.detailsLink && (
                          <Button variant="link" className="p-0 h-auto text-primary" asChild>
                            <a href={rec.detailsLink} target="_blank" className="flex items-center gap-1">
                              Xem chi tiết chương trình học
                              <MapPin className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
