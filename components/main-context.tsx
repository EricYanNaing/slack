"use client";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-preferences";
import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const { color } = useColorPreferences();

  let backgroundColor = "bg-primary-dark";
  if (color === "green") {
    backgroundColor = "bg-green-700";
  } else if (color === "blue") {
    backgroundColor = "bg-primary";
  }
  return (
    <div
      className={cn("md:px-2 md:pb-2 md:pt-14 md:h-screen", backgroundColor)}
    >
      <main
        className={cn(
          "md:ml-[290px] text-black lg:ml-[430px] md:h-full rounded-r-xl overflow-y-scroll ",
          theme === "dark" ? "bg-[#232529]" : "bg-slate-200"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
