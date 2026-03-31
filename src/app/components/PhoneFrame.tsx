import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  showNotch?: boolean;
}

export function PhoneFrame({ children, showNotch = true }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-[#F8FAFC] relative overflow-hidden rounded-[3rem] shadow-2xl border-8 border-[#0F172A]">
        {/* Notch */}
        {showNotch && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0F172A] rounded-b-2xl z-50" />
        )}
        {children}
      </div>
    </div>
  );
}
