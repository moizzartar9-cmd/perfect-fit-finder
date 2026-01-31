import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { Footprints, Shirt, AlertTriangle, Check, TrendingUp } from "lucide-react";

export interface FitResult {
  uid: string;
  productType: "footwear" | "apparel";
  recommendedSize: string;
  confidence: number;
  insights: string[];
  brandAdjustments: { brand: string; adjustment: string }[];
}

interface FitResultCardProps {
  result: FitResult;
  onRecalibrate?: () => void;
}

export function FitResultCard({ result, onRecalibrate }: FitResultCardProps) {
  const isCyan = result.productType === "footwear";
  const Icon = isCyan ? Footprints : Shirt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "glass-card p-6 lift-hover",
        isCyan ? "glow-cyan" : "glow-magenta"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-3 rounded-xl",
              isCyan ? "bg-primary/10" : "bg-secondary/10"
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                isCyan ? "text-primary" : "text-secondary"
              )}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {result.productType === "footwear" ? "Footwear Size" : "Apparel Size"}
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {result.recommendedSize}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Confidence</p>
          <ConfidenceMeter confidence={result.confidence} size="sm" />
        </div>
      </div>

      {/* UID Badge */}
      <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-muted/30 border border-border/50">
        <span className="text-xs text-muted-foreground">Universal ID:</span>
        <code
          className={cn(
            "text-sm font-mono font-semibold",
            isCyan ? "text-primary" : "text-secondary"
          )}
        >
          {result.uid}
        </code>
      </div>

      {/* Fit Insights */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Fit Insights
        </h4>
        <div className="space-y-2">
          {result.insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-2 text-sm"
            >
              {insight.toLowerCase().includes("narrow") ||
              insight.toLowerCase().includes("small") ? (
                <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              )}
              <span className="text-muted-foreground">{insight}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand Adjustments */}
      {result.brandAdjustments.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Brand-Specific Recommendations
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {result.brandAdjustments.map((adj, index) => (
              <motion.div
                key={adj.brand}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-3 rounded-lg bg-muted/20 border border-border/30"
              >
                <p className="text-xs text-muted-foreground">{adj.brand}</p>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isCyan ? "text-primary" : "text-secondary"
                  )}
                >
                  {adj.adjustment}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recalibrate button */}
      {onRecalibrate && (
        <button
          onClick={onRecalibrate}
          className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Recalibrate measurement
        </button>
      )}
    </motion.div>
  );
}
