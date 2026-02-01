import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { cn } from "@/lib/utils";
import type { SizeRecommendation, ProductType } from "@/lib/sizeMappingEngine";

// Platform icons as simple SVG components
const PlatformIcon = ({ platform, className }: { platform: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    amazon: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595.427-.16.764-.053.904.243.14.296-.02.568-.467.815-2.86 1.278-5.916 1.917-9.167 1.917-4.348 0-8.27-1.073-11.753-3.22-.228-.135-.345-.33-.182-.604zm11.87-5.94c-.802 0-1.582.212-2.342.635-.76.425-1.14.994-1.14 1.71 0 .735.375 1.316 1.125 1.744.61.347 1.35.52 2.22.52 1.33 0 2.39-.344 3.18-1.03.79-.686 1.185-1.526 1.185-2.52 0-.162-.014-.324-.042-.486-.028-.162-.07-.323-.126-.483-.056-.162-.117-.31-.182-.45-.065-.14-.145-.28-.238-.42-.093-.14-.182-.256-.266-.348-.084-.092-.184-.188-.3-.288-.116-.1-.224-.182-.322-.25-.098-.068-.214-.14-.346-.214-.132-.074-.254-.136-.365-.185-.112-.05-.242-.1-.392-.15-.15-.052-.286-.09-.405-.115-.12-.025-.256-.05-.41-.074-.154-.024-.295-.04-.42-.05-.127-.01-.27-.015-.43-.015-1.26 0-2.32.348-3.18 1.045-.86.697-1.29 1.567-1.29 2.61 0 1.074.405 1.938 1.215 2.595.81.657 1.86.986 3.15.986.39 0 .787-.04 1.192-.12.405-.08.802-.19 1.192-.33.39-.14.757-.31 1.102-.51.345-.2.66-.42.945-.66l.075.06c.24.19.36.38.36.57 0 .19-.12.38-.36.57-.24.19-.54.36-.9.51-.36.15-.787.27-1.28.36-.494.09-1.007.135-1.537.135-1.57 0-2.91-.37-4.02-1.11-1.11-.74-1.665-1.67-1.665-2.79 0-1.12.55-2.09 1.65-2.91 1.1-.82 2.45-1.23 4.05-1.23.57 0 1.12.06 1.65.18.53.12.99.27 1.38.45.39.18.75.4 1.08.66.33.26.59.51.78.75.19.24.34.48.45.72.11.24.19.46.24.66.05.2.08.39.09.57.01.18.015.34.015.48 0 1.1-.41 2-1.23 2.7-.82.7-1.91 1.05-3.27 1.05z"/>
      </svg>
    ),
    flipkart: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M3.833 1.5c-1.25 0-2.333.98-2.333 2.3v16.4c0 1.32 1.083 2.3 2.333 2.3h16.334c1.25 0 2.333-.98 2.333-2.3V3.8c0-1.32-1.083-2.3-2.333-2.3H3.833zm5.96 4.2h5.084c.39 0 .706.33.706.735 0 .405-.316.735-.706.735h-1.984v10.36c0 .405-.316.735-.706.735-.39 0-.706-.33-.706-.735V7.17H9.793c-.39 0-.706-.33-.706-.735 0-.405.316-.735.706-.735z"/>
      </svg>
    ),
    myntra: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    ajio: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">A</text>
      </svg>
    ),
    meesho: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  };
  return icons[platform] || null;
};

const platforms = [
  { id: "amazon", name: "Amazon", color: "hover:text-orange-400" },
  { id: "flipkart", name: "Flipkart", color: "hover:text-yellow-400" },
  { id: "myntra", name: "Myntra", color: "hover:text-pink-400" },
  { id: "ajio", name: "Ajio", color: "hover:text-purple-400" },
  { id: "meesho", name: "Meesho", color: "hover:text-rose-400" },
];

interface BrandResultsGridProps {
  recommendations: SizeRecommendation[];
  productType: ProductType;
}

type FilterCategory = "all" | "global" | "indian" | "premium" | "fast-fashion";

export function BrandResultsGrid({ recommendations, productType }: BrandResultsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const isCyan = productType === "footwear";

  const filteredRecommendations = activeFilter === "all" 
    ? recommendations 
    : recommendations.filter(r => r.brand.category === activeFilter);

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

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: "All", id: "all" as FilterCategory, count: recommendations.length },
          { label: "Global", id: "global" as FilterCategory, count: recommendations.filter(r => r.brand.category === "global").length },
          { label: "Indian", id: "indian" as FilterCategory, count: recommendations.filter(r => r.brand.category === "indian").length },
          { label: "Premium", id: "premium" as FilterCategory, count: recommendations.filter(r => r.brand.category === "premium").length },
          { label: "Fast Fashion", id: "fast-fashion" as FilterCategory, count: recommendations.filter(r => r.brand.category === "fast-fashion").length },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-colors min-h-[44px] min-w-[44px]",
              "border",
              activeFilter === filter.id
                ? isCyan 
                  ? "bg-primary/20 text-primary border-primary/50"
                  : "bg-secondary/20 text-secondary border-secondary/50"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border-border/30"
            )}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {filteredRecommendations.map((rec, index) => (
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
            <div className="mb-2 w-full flex justify-center">
              <ConfidenceMeter confidence={rec.confidence} size="sm" showLabel={true} />
            </div>

            {/* Fit Note */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 min-h-[2rem]">
              {rec.fitNote}
            </p>

            {/* Platform Quick-Links */}
            <div className="flex justify-center gap-1.5 mb-3 w-full">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  title={`Shop on ${platform.name}`}
                  className={cn(
                    "p-1.5 rounded-md bg-muted/30 text-muted-foreground transition-colors min-w-[28px] min-h-[28px]",
                    platform.color
                  )}
                >
                  <PlatformIcon platform={platform.id} className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            {/* Shop Button */}
            <Button
              variant="glass"
              size="sm"
              className="w-full text-xs h-10 opacity-80 group-hover:opacity-100 min-h-[44px]"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Shop Now
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
