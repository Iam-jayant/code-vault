import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Radial gradient glow effect - top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid pattern overlay (optional subtle effect) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}