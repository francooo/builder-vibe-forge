import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  CalendarClock,
  Building2,
  FileSpreadsheet,
  FileCheck2,
  ClipboardCheck,
  Map as MapIcon,
  Users,
  Settings,
  BarChart3,
  Leaf,
  Search,
} from "lucide-react";
import React from "react";

const routes = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/licencas", label: "Licenças", icon: FileCheck2 },
  { to: "/empreendimentos", label: "Empreendimentos", icon: Building2 },
  { to: "/estudos", label: "Estudos Ambientais", icon: FileText },
  { to: "/condicionantes", label: "Condicionantes", icon: ClipboardCheck },
  { to: "/vistorias", label: "Vistorias", icon: CalendarClock },
  { to: "/agenda", label: "Agenda & Prazos", icon: CalendarClock },
  { to: "/mapa", label: "Mapa", icon: MapIcon },
  { to: "/documentos", label: "Documentos", icon: FileSpreadsheet },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/equipe", label: "Equipe", icon: Users },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
];

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 px-2 py-1">
      <div className="size-6 rounded-md bg-gradient-to-br from-primary to-emerald-500" />
      <span className="font-extrabold tracking-tight">EcoLicenças</span>
    </Link>
  );
}

export default function AppLayout() {
  const location = useLocation();

  const crumbs = React.useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const items = [
      { href: "/", label: "Início" },
      ...parts.map((p, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        const found = routes.find((r) => r.to === href);
        return { href, label: found?.label || capitalize(p) };
      }),
    ];
    return items;
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Brand />
          <div className="px-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Geral</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.slice(0, 8).map((r) => (
                  <SidebarMenuItem key={r.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === r.to}
                    >
                      <NavLink to={r.to} className="flex items-center gap-2">
                        <r.icon className="size-4" />
                        <span>{r.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.slice(8).map((r) => (
                  <SidebarMenuItem key={r.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === r.to}
                    >
                      <NavLink to={r.to} className="flex items-center gap-2">
                        <r.icon className="size-4" />
                        <span>{r.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-2 py-1.5">
            <Avatar className="size-6">
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-xs font-medium leading-none">Andrews Franco</p>
              <p className="text-[10px] text-muted-foreground leading-none">
                admin
              </p>
            </div>
            <Button asChild size="sm" variant="outline" className="h-7 text-xs">
              <Link to="/configuracoes">Painel</Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-3 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              {crumbs.map((c, i) => (
                <BreadcrumbItem key={c.href}>
                  <BreadcrumbLink asChild>
                    <NavLink
                      to={c.href}
                      className={cn(
                        i === crumbs.length - 1 &&
                          "text-foreground font-medium",
                      )}
                    >
                      {c.label}
                    </NavLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Button asChild size="sm" className="hidden sm:flex">
                <Link to="/licencas">Nova Licença</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
