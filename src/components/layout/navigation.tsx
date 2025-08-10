"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  FileText,
  Upload,
  User,
  LogOut,
  Menu,
  Sparkles,
  Settings,
  Globe,
  Shield,
} from "lucide-react";
import { useClientStore } from "@/hooks/use-client-store";

interface NavigationProps {
  readonly children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview and statistics",
  },
  {
    name: "Global Destinations",
    href: "/destinations",
    icon: Globe,
    description: "Explore migration opportunities",
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
    description: "View and manage files",
  },
  {
    name: "Upload",
    href: "/upload",
    icon: Upload,
    description: "Add new documents",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    description: "Account settings",
  },
  {
    name: "Admin Reports",
    href: "/admin/reports",
    icon: Shield,
    description: "Manage defamation reports",
  },
];

const NavLinks = ({
  mobile = false,
  pathname,
  onItemClick,
}: {
  mobile?: boolean;
  pathname: string;
  onItemClick?: () => void;
}) => (
  <nav className={`space-y-2 ${mobile ? "mt-6" : ""}`}>
    {navigation.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
            isActive
              ? "bg-white/20 text-white shadow-lg shadow-purple-500/25"
              : "text-purple-200/80 hover:bg-white/10 hover:text-white"
          }`}
          onClick={() => mobile && onItemClick?.()}
        >
          <Icon
            className={`h-5 w-5 ${
              isActive ? "text-white" : "text-purple-300/80"
            }`}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.name}</span>
            {!mobile && (
              <span className="text-xs text-purple-200/60">
                {item.description}
              </span>
            )}
          </div>
        </Link>
      );
    })}
  </nav>
);

export function Navigation({ children }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { client, reset } = useClientStore();

  const handleSignOut = () => {
    reset();
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white/10 backdrop-blur-xl border-r border-white/20 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-8">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LINAK</h1>
                <p className="text-sm text-purple-200/60">Client Portal</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-6">
              <NavLinks pathname={pathname} />
            </div>

            {/* User Profile */}
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-purple-400 to-blue-400">
                  <AvatarFallback className="bg-transparent text-white font-semibold">
                    {client?.name ? getInitials(client.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {client?.name || "Guest User"}
                  </p>
                  <p className="text-xs text-purple-200/60 truncate">
                    {client?.email || "guest@example.com"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-white">LINAK</h1>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/5 border-white/20 text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gradient-to-b from-purple-900 to-blue-900 border-white/20"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 pb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">LINAK</h1>
                      <p className="text-sm text-purple-200/60">
                        Client Portal
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1">
                    <NavLinks
                      mobile
                      pathname={pathname}
                      onItemClick={() => setIsMobileMenuOpen(false)}
                    />
                  </div>

                  {/* Mobile User Profile */}
                  <div className="pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-purple-400 to-blue-400">
                        <AvatarFallback className="bg-transparent text-white font-semibold">
                          {client?.name ? getInitials(client.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {client?.name || "Guest User"}
                        </p>
                        <p className="text-xs text-purple-200/60 truncate">
                          {client?.email || "guest@example.com"}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:pl-72">
          <main className="relative z-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
