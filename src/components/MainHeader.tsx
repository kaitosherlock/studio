
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, GraduationCap, TrendingUp, Sparkles, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tổng quan", href: "/", icon: Compass },
  { name: "Trường Đại học", href: "/universities", icon: GraduationCap },
  { name: "Điểm chuẩn", href: "/scores", icon: TrendingUp },
  { name: "Video", href: "/videos", icon: Youtube },
  { name: "Tư vấn AI", href: "/recommender", icon: Sparkles },
];

export function MainHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass className="h-6 w-6" />
          </div>
          <span className="text-xl font-headline font-bold text-primary tracking-tight">
            MEDIA COMPASS
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu would go here */}
        </div>
      </div>
    </header>
  );
}
