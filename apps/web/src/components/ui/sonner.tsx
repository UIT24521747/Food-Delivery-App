"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#13110e] group-[.toaster]:text-[#f4f0ea] group-[.toaster]:border-[#c5a059]/40 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-none font-serif-display",
          description: "group-[.toast]:text-[#968b7b] font-sans text-xs",
          actionButton:
            "group-[.toast]:bg-[#c5a059] group-[.toast]:text-[#0c0b09] rounded-none uppercase tracking-widest text-[10px]",
          cancelButton:
            "group-[.toast]:bg-[#1b1814] group-[.toast]:text-[#968b7b] rounded-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
