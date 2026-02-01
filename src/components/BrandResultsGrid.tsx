import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { cn } from "@/lib/utils";
import type { SizeRecommendation, ProductType } from "@/lib/sizeMappingEngine";

interface Platform {
  id: string;
  name: string;
  domain: string;
  searchUrl: (brand: string, size: string, productType: ProductType) => string;
}

const platforms: Platform[] = [
  {
    id: "amazon",
    name: "Amazon",
    domain: "amazon.in",
    searchUrl: (brand, size, productType) => {
      const query = productType === "footwear"
        ? `${brand} shoes size ${size}`
        : `${brand} ${productType} size ${size}`;
      return `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    }
  },
  {
    id: "flipkart",
    name: "Flipkart",
    domain: "flipkart.com",
    searchUrl: (brand, size, productType) => {
      const query = productType === "footwear"
        ? `${brand} shoes size ${size}`
        : `${brand} ${productType} size ${size}`;
      return `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    }
  },
  {
    id: "myntra",
    name: "Myntra",
    domain: "myntra.com",
    searchUrl: (brand, size, productType) => {
      const query = productType === "footwear"
        ? `${brand} shoes size ${size}`
        : `${brand} ${productType} size ${size}`;
      return `https://www.myntra.com/${encodeURIComponent(brand)}`;
    }
  },
  {
    id: "ajio",
    name: "Ajio",
    domain: "ajio.com",
    searchUrl: (brand, size, productType) => {
      const query = productType === "footwear"
        ? `${brand} shoes size ${size}`
        : `${brand} ${productType} size ${size}`;
      return `https://www.ajio.com/search/?text=${encodeURIComponent(query)}`;
    }
  },
  {
    id: "meesho",
    name: "Meesho",
    domain: "meesho.com",
    searchUrl: (brand, size, productType) => {
      const query = productType === "footwear"
        ? `${brand} shoes size ${size}`
        : `${brand} ${productType} size ${size}`;
      return `https://www.meesho.com/search?q=${encodeURIComponent(query)}`;
    }
  },
];

const extractSimpleSize = (sizeString: string): string => {
  const ukMatch = sizeString.match(/UK\s*(\d+\.?\d*)/i);
  if (ukMatch) return ukMatch[1];

  const letterMatch = sizeString.match(/\b(XS|S|M|L|XL|XXL|3XL)\b/i);
  if (letterMatch) return letterMatch[1];

  const numMatch = sizeString.match(/\b(\d+)\b/);
  if (numMatch) return numMatch[1];

  return sizeString;
};

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
            <div className="w-14 h-14 mb-3 flex items-center justify-center rounded-xl bg-white/10 overflow-hidden p-2">
              <img
                src={`https://cdn.brandfetch.io/${rec.brand.domain}`}
                alt={`${rec.brand.name} logo`}
                className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('brandfetch')) {
                    target.src = `https://logo.clearbit.com/${rec.brand.domain}`;
                  } else {
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.remove("hidden");
                  }
                }}
              />
              <span className="hidden text-xl font-bold text-muted-foreground">
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
              {platforms.map((platform) => {
                const simpleSize = extractSimpleSize(rec.recommendedSize);
                const searchUrl = platform.searchUrl(rec.brand.name, simpleSize, productType);

                return (
                  <a
                    key={platform.id}
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Shop ${rec.brand.name} on ${platform.name}`}
                    className={cn(
                      "p-1 rounded-md bg-white hover:bg-white/90 transition-all min-w-[28px] min-h-[28px] flex items-center justify-center hover:scale-110 shadow-sm"
                    )}
                  >
                    <img
                      src={`https://cdn.brandfetch.io/${platform.domain}`}
                      alt={platform.name}
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                    />
                  </a>
                );
              })}
            </div>

            {/* Shop Button */}
            <Button
              variant="glass"
              size="sm"
              className="w-full text-xs h-10 opacity-80 group-hover:opacity-100 min-h-[44px]"
              asChild
            >
              <a
                href={platforms[0].searchUrl(rec.brand.name, extractSimpleSize(rec.recommendedSize), productType)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Shop Now
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
