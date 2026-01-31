import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { cn } from "@/lib/utils";
import type { SizeRecommendation, ProductType } from "@/lib/sizeMappingEngine";

interface BrandResultsGridProps {
  recommendations: SizeRecommendation[];
  productType: ProductType;
}

export function BrandResultsGrid({ recommendations, productType }: BrandResultsGridProps) {
  const isCyan = productType === "footwear";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Your Size Across{" "}
          <span className={isCyan ? "text-primary" : "text-secondary"}>
            {recommendations.length}+ Brands
          </span>
        </h2>
        <p className="text-muted-foreground">
          Personalized recommendations based on your Universal Size ID
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.brand.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
            className={cn(
              "glass-card p-4 flex flex-col items-center text-center lift-hover group",
              "border border-border/30 hover:border-border/50 transition-all duration-300"
            )}
          >
            {/* Brand Logo */}
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-lg bg-muted/50 overflow-hidden">
              <img
                src={`https://logo.clearbit.com/${rec.brand.domain}`}
                alt={rec.brand.name}
                className="w-8 h-8 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <span className="hidden text-lg font-bold text-muted-foreground">
                {rec.brand.name.charAt(0)}
              </span>
            </div>

            {/* Brand Name */}
            <h3 className="text-sm font-medium text-foreground mb-1 truncate w-full">
              {rec.brand.name}
            </h3>

            {/* Recommended Size */}
            <div
              className={cn(
                "text-lg font-bold mb-2",
                isCyan ? "text-primary" : "text-secondary"
              )}
            >
              {rec.recommendedSize}
            </div>

            {/* Confidence Meter */}
            <div className="mb-3 w-full flex justify-center">
              <ConfidenceMeter confidence={rec.confidence} size="sm" showLabel={true} />
            </div>

            {/* Fit Note */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 min-h-[2rem]">
              {rec.fitNote}
            </p>

            {/* Shop Button */}
            <Button
              variant="glass"
              size="sm"
              className="w-full text-xs h-8 opacity-80 group-hover:opacity-100"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Shop Now
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 pt-4">
        {[
          { label: "All", count: recommendations.length },
          { label: "Global", count: recommendations.filter(r => r.brand.category === "global").length },
          { label: "Indian", count: recommendations.filter(r => r.brand.category === "indian").length },
          { label: "Premium", count: recommendations.filter(r => r.brand.category === "premium").length },
          { label: "Fast Fashion", count: recommendations.filter(r => r.brand.category === "fast-fashion").length },
        ].map((filter) => (
          <button
            key={filter.label}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
              "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
              "border border-border/30"
            )}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
    </div>
  );
}
