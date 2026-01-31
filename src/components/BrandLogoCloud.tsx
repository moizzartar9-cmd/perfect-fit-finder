import { motion } from "framer-motion";

// Popular brand logos - using Clearbit logo API for real brand logos
const brands = [
  { name: "Nike", domain: "nike.com" },
  { name: "Adidas", domain: "adidas.com" },
  { name: "Puma", domain: "puma.com" },
  { name: "Levi's", domain: "levi.com" },
  { name: "H&M", domain: "hm.com" },
  { name: "Zara", domain: "zara.com" },
  { name: "Under Armour", domain: "underarmour.com" },
  { name: "New Balance", domain: "newbalance.com" },
  { name: "Reebok", domain: "reebok.com" },
  { name: "Converse", domain: "converse.com" },
  { name: "Vans", domain: "vans.com" },
  { name: "Tommy Hilfiger", domain: "tommy.com" },
];

export function BrandLogoCloud() {
  // Duplicate for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <motion.div
        className="flex items-center gap-12"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center h-12 w-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={`https://logo.clearbit.com/${brand.domain}`}
              alt={brand.name}
              className="h-8 w-auto object-contain filter brightness-0 invert"
              loading="lazy"
              onError={(e) => {
                // Fallback to text if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-sm font-medium text-muted-foreground">
              {brand.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
