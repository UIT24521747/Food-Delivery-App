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
            "group toast group-[.toaster]:bg-[#1c1814] group-[.toaster]:text-[#faf7f2] group-[.toaster]:border-[#eab308]/40 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-[#a89f91]",
          actionButton:
            "group-[.toast]:bg-[#eab308] group-[.toast]:text-[#12100e] font-semibold",
          cancelButton:
            "group-[.toast]:bg-[#27221c] group-[.toast]:text-[#a89f91]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
