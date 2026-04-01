import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  showNotch?: boolean;
}

export function PhoneFrame({ children, showNotch = true }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-background relative overflow-hidden rounded-[3rem] shadow-2xl border-8 border-foreground">
        {/* Notch */}
        {showNotch && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-2xl z-50" />
        )}
        {children}
      </div>
    </div>
  );
}