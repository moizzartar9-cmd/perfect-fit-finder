import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  confidence: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ConfidenceMeter({
  confidence,
  size = "md",
  showLabel = true,
}: ConfidenceMeterProps) {
  const getColor = () => {
    if (confidence >= 85) return "primary";
    if (confidence >= 70) return "yellow";
    return "orange";
  };

  const color = getColor();

  const sizeClasses = {
    sm: "h-1.5 w-24",
    md: "h-2 w-32",
    lg: "h-3 w-48",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={cn("rounded-full bg-muted/50 overflow-hidden", sizeClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            color === "primary" && "bg-primary shadow-lg shadow-primary/30",
            color === "yellow" && "bg-yellow-400 shadow-lg shadow-yellow-400/30",
            color === "orange" && "bg-orange-400 shadow-lg shadow-orange-400/30"
          )}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            "font-semibold tabular-nums",
            textSizeClasses[size],
            color === "primary" && "text-primary",
            color === "yellow" && "text-yellow-400",
            color === "orange" && "text-orange-400"
          )}
        >
          {confidence}%
        </span>
      )}
    </div>
  );
}
