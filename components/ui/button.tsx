import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" };

export function Button({ className, variant = "default", ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-medium transition",
        variant === "default" && "bg-primary text-white hover:opacity-90",
        variant === "outline" && "border border-border bg-transparent",
        variant === "ghost" && "hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
