import { Shield } from "lucide-react";

interface AppHeaderProps {
  showLogo?: boolean;
  className?: string;
}

export function AppHeader({ showLogo = true, className = "" }: AppHeaderProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLogo && (
        <div className="w-8 h-8 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-lg flex items-center justify-center shadow-md">
          <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      )}
      <div className="flex items-baseline gap-1">
        <span className="font-bold text-foreground">WeeTee 360</span>
        <span className="font-bold text-[#22C55E]">VPN</span>

      </div>
    </div>
  );
}
