import React from "react";


export const BrandLogo: React.FC<{ className?: string; size?: "sm" | "md" | "lg" }> = ({
  className = "",
  size = "md",
}) => {
  const iconSize = size === "sm" ? 28 : size === "lg" ? 44 : 36;
  return (
    <div className={`flex items-center gap-3 font-display tracking-wider ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-amber-700 p-2 shadow-lg shadow-amber-500/20 border border-amber-400/40"
        style={{ width: iconSize + 12, height: iconSize + 12 }}
      >
        {/* Stylized Pale Horse & Engineering Road Chevron Icon */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-950"
        >
          {/* Stylized Horse Head Profile meeting Asphalt Paving Angle */}
          <path
            d="M8 38L18 10C19 7 24 6 28 8C33 10 38 15 36 21L34 24L42 27C40 33 34 35 28 34L26 31L22 38H8Z"
            fill="currentColor"
          />
          {/* Pale Horse Eye & Mane Blade */}
          <circle cx="28" cy="14" r="2.5" fill="#F59E0B" />
          <path
            d="M17 14L13 22M21 16L18 26M26 19L23 29"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Road Chevron Bottom Baseline */}
          <path
            d="M6 42H42L36 37H12L6 42Z"
            fill="#B45309"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-1.5">
          Pale Horse
          <span className="text-amber-500 text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 tracking-widest font-bold">
            AE
          </span>
        </span>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-amber-400/90 font-sans">
          Asphalt Engineering
        </span>
      </div>
    </div>
  );
};


