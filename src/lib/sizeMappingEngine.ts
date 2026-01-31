// USID Size Mapping Engine - Sophisticated brand-specific size calculations

export type Category = "men" | "women" | "kids";
export type ProductType = "footwear" | "apparel";
export type FitPreference = "slim" | "regular" | "relaxed";

export interface BrandProfile {
  name: string;
  domain: string;
  category: "global" | "indian" | "premium" | "fast-fashion";
  fitType: "slim" | "regular" | "relaxed";
  // Apparel: size offset (-1 = runs small, 0 = true, +1 = runs large)
  apparelOffset: number;
  // Footwear: size offset in half sizes
  footwearOffset: number;
}

// 80+ brands with fit profiles
export const BRANDS: BrandProfile[] = [
  // Global Premium
  { name: "Nike", domain: "nike.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Adidas", domain: "adidas.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: -0.5 },
  { name: "Puma", domain: "puma.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Under Armour", domain: "underarmour.com", category: "global", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "New Balance", domain: "newbalance.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Reebok", domain: "reebok.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Converse", domain: "converse.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 1 },
  { name: "Vans", domain: "vans.com", category: "global", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0.5 },
  { name: "ASICS", domain: "asics.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Skechers", domain: "skechers.com", category: "global", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0.5 },
  { name: "Fila", domain: "fila.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Jordan", domain: "jordan.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Crocs", domain: "crocs.com", category: "global", fitType: "relaxed", apparelOffset: 0, footwearOffset: 0 },
  { name: "Birkenstock", domain: "birkenstock.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  
  // Fast Fashion (Slim-Fit Penalty)
  { name: "Zara", domain: "zara.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  { name: "H&M", domain: "hm.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Forever 21", domain: "forever21.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Mango", domain: "mango.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  { name: "Bershka", domain: "bershka.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Pull & Bear", domain: "pullandbear.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Stradivarius", domain: "stradivarius.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Massimo Dutti", domain: "massimodutti.com", category: "fast-fashion", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  
  // Indian Brands (Relaxed-Fit Bonus)
  { name: "Roadster", domain: "roadster.in", category: "indian", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0 },
  { name: "Zudio", domain: "zudio.com", category: "indian", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0.5 },
  { name: "Wrogn", domain: "wrogn.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "HRX", domain: "hrxbrand.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Allen Solly", domain: "allensolly.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Peter England", domain: "peterengland.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Van Heusen", domain: "vanheusen.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Louis Philippe", domain: "louisphilippe.com", category: "indian", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Fabindia", domain: "fabindia.com", category: "indian", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0 },
  { name: "Biba", domain: "biba.in", category: "indian", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0 },
  { name: "W", domain: "wforwoman.com", category: "indian", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0 },
  { name: "Global Desi", domain: "globaldesi.in", category: "indian", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0 },
  { name: "FBB", domain: "fbbonline.in", category: "indian", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0 },
  { name: "Max Fashion", domain: "maxfashion.com", category: "indian", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0.5 },
  { name: "Lifestyle", domain: "lifestylestores.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Pantaloons", domain: "pantaloons.com", category: "indian", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0 },
  { name: "Westside", domain: "westside.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Campus", domain: "campusshoes.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Sparx", domain: "sparxshoes.com", category: "indian", fitType: "relaxed", apparelOffset: 0, footwearOffset: 0.5 },
  { name: "Bata", domain: "bata.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Liberty", domain: "libertyshoes.com", category: "indian", fitType: "relaxed", apparelOffset: 0, footwearOffset: 0 },
  { name: "Woodland", domain: "woodland.in", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Red Tape", domain: "redtape.com", category: "indian", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Khadim's", domain: "khadims.com", category: "indian", fitType: "relaxed", apparelOffset: 0, footwearOffset: 0.5 },
  
  // Premium International
  { name: "Tommy Hilfiger", domain: "tommy.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Calvin Klein", domain: "calvinklein.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Levi's", domain: "levi.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Gap", domain: "gap.com", category: "premium", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0 },
  { name: "Old Navy", domain: "oldnavy.com", category: "premium", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0 },
  { name: "Banana Republic", domain: "bananarepublic.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "American Eagle", domain: "ae.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Abercrombie", domain: "abercrombie.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Hollister", domain: "hollister.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Superdry", domain: "superdry.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  { name: "Jack & Jones", domain: "jackjones.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Only", domain: "only.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Vero Moda", domain: "veromoda.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Selected", domain: "selected.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  
  // Basics & Essentials
  { name: "Uniqlo", domain: "uniqlo.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "MUJI", domain: "muji.com", category: "global", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0 },
  { name: "Decathlon", domain: "decathlon.com", category: "global", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0.5 },
  { name: "Champion", domain: "champion.com", category: "global", fitType: "relaxed", apparelOffset: 0.5, footwearOffset: 0 },
  { name: "Carhartt", domain: "carhartt.com", category: "global", fitType: "relaxed", apparelOffset: 1, footwearOffset: 0 },
  { name: "The North Face", domain: "thenorthface.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Columbia", domain: "columbia.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Patagonia", domain: "patagonia.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  
  // Luxury & Designer
  { name: "Lacoste", domain: "lacoste.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Ralph Lauren", domain: "ralphlauren.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Hugo Boss", domain: "hugoboss.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  { name: "Armani Exchange", domain: "armaniexchange.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  { name: "Guess", domain: "guess.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Diesel", domain: "diesel.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  { name: "G-Star Raw", domain: "g-star.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Ted Baker", domain: "tedbaker.com", category: "premium", fitType: "slim", apparelOffset: -1, footwearOffset: -0.5 },
  
  // Sports & Athletic
  { name: "Lululemon", domain: "lululemon.com", category: "premium", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Gymshark", domain: "gymshark.com", category: "global", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "2XU", domain: "2xu.com", category: "global", fitType: "slim", apparelOffset: -1, footwearOffset: 0 },
  { name: "Speedo", domain: "speedo.com", category: "global", fitType: "slim", apparelOffset: -0.5, footwearOffset: 0 },
  { name: "Mizuno", domain: "mizuno.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Brooks", domain: "brooksrunning.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Hoka", domain: "hoka.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0.5 },
  { name: "On Running", domain: "on-running.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Salomon", domain: "salomon.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: -0.5 },
  
  // Additional Footwear
  { name: "Clarks", domain: "clarks.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
  { name: "Steve Madden", domain: "stevemadden.com", category: "premium", fitType: "slim", apparelOffset: 0, footwearOffset: -0.5 },
  { name: "Aldo", domain: "aldoshoes.com", category: "premium", fitType: "slim", apparelOffset: 0, footwearOffset: -0.5 },
  { name: "Dr. Martens", domain: "drmartens.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 1 },
  { name: "Timberland", domain: "timberland.com", category: "premium", fitType: "regular", apparelOffset: 0, footwearOffset: 0.5 },
  { name: "UGG", domain: "ugg.com", category: "premium", fitType: "relaxed", apparelOffset: 0, footwearOffset: 0.5 },
  { name: "Havaianas", domain: "havaianas.com", category: "global", fitType: "regular", apparelOffset: 0, footwearOffset: 0 },
];

// Apparel size labels
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"] as const;
type ApparelSize = typeof APPAREL_SIZES[number];

// Map chest measurements to base sizes (in inches)
const CHEST_TO_SIZE: Record<string, { min: number; max: number; size: ApparelSize }> = {
  XS: { min: 32, max: 34, size: "XS" },
  S: { min: 34, max: 37, size: "S" },
  M: { min: 37, max: 40, size: "M" },
  L: { min: 40, max: 44, size: "L" },
  XL: { min: 44, max: 48, size: "XL" },
  XXL: { min: 48, max: 52, size: "XXL" },
  "3XL": { min: 52, max: 56, size: "3XL" },
};

// Footwear size systems
interface FootwearSizeMap {
  uk: number;
  us: number;
  eu: number;
  cm: number;
}

const FOOTWEAR_SIZES: FootwearSizeMap[] = [
  { uk: 5, us: 6, eu: 38, cm: 24 },
  { uk: 5.5, us: 6.5, eu: 38.5, cm: 24.5 },
  { uk: 6, us: 7, eu: 39, cm: 25 },
  { uk: 6.5, us: 7.5, eu: 40, cm: 25.5 },
  { uk: 7, us: 8, eu: 40.5, cm: 26 },
  { uk: 7.5, us: 8.5, eu: 41, cm: 26.5 },
  { uk: 8, us: 9, eu: 42, cm: 27 },
  { uk: 8.5, us: 9.5, eu: 42.5, cm: 27.5 },
  { uk: 9, us: 10, eu: 43, cm: 28 },
  { uk: 9.5, us: 10.5, eu: 44, cm: 28.5 },
  { uk: 10, us: 11, eu: 44.5, cm: 29 },
  { uk: 10.5, us: 11.5, eu: 45, cm: 29.5 },
  { uk: 11, us: 12, eu: 46, cm: 30 },
  { uk: 11.5, us: 12.5, eu: 46.5, cm: 30.5 },
  { uk: 12, us: 13, eu: 47, cm: 31 },
];

export interface SizeRecommendation {
  brand: BrandProfile;
  recommendedSize: string;
  confidence: number;
  fitNote: string;
}

export interface CalibrationData {
  category: Category;
  productType: ProductType;
  baseSize: string; // e.g., "UK 9" for footwear, "M" for apparel
  chestMeasurement?: number; // in inches
  footLength?: number; // in cm
  fitPreference: FitPreference;
}

// Calculate confidence based on brand reliability and fit match
function calculateConfidence(
  brand: BrandProfile,
  userFitPref: FitPreference
): number {
  let baseConfidence = 85;
  
  // Brand category reliability
  if (brand.category === "global") baseConfidence += 5;
  if (brand.category === "premium") baseConfidence += 3;
  if (brand.category === "indian") baseConfidence += 2;
  if (brand.category === "fast-fashion") baseConfidence -= 2;
  
  // Fit preference match
  if (brand.fitType === userFitPref) {
    baseConfidence += 7;
  } else if (
    (brand.fitType === "slim" && userFitPref === "relaxed") ||
    (brand.fitType === "relaxed" && userFitPref === "slim")
  ) {
    baseConfidence -= 5;
  }
  
  // Add some natural variance
  baseConfidence += Math.floor(Math.random() * 6) - 2;
  
  return Math.min(99, Math.max(60, baseConfidence));
}

// Get fit note based on brand characteristics
function getFitNote(brand: BrandProfile, productType: ProductType): string {
  const notes: string[] = [];
  
  if (productType === "apparel") {
    if (brand.fitType === "slim") {
      notes.push("Runs slim; consider sizing up for relaxed fit");
    } else if (brand.fitType === "relaxed") {
      notes.push("Generous cut; true to size for comfort");
    } else {
      notes.push("True to size for regular fit");
    }
    
    if (brand.apparelOffset < 0) {
      notes.push("Size up recommended");
    } else if (brand.apparelOffset > 0) {
      notes.push("Relaxed fit available");
    }
  } else {
    if (brand.footwearOffset > 0) {
      notes.push("Runs large; consider sizing down");
    } else if (brand.footwearOffset < 0) {
      notes.push("Runs narrow; consider half size up");
    } else {
      notes.push("True to size");
    }
  }
  
  return notes[0];
}

// Calculate apparel size for a brand
function calculateApparelSize(
  baseIndex: number,
  brand: BrandProfile,
  fitPreference: FitPreference
): ApparelSize {
  let adjustedIndex = baseIndex;
  
  // Apply brand offset
  adjustedIndex += Math.round(brand.apparelOffset);
  
  // Apply fit preference adjustment
  if (fitPreference === "slim" && brand.fitType !== "slim") {
    adjustedIndex -= 1;
  } else if (fitPreference === "relaxed" && brand.fitType !== "relaxed") {
    adjustedIndex += 1;
  }
  
  // Clamp to valid range
  adjustedIndex = Math.max(0, Math.min(APPAREL_SIZES.length - 1, adjustedIndex));
  
  return APPAREL_SIZES[adjustedIndex];
}

// Calculate footwear size for a brand
function calculateFootwearSize(
  baseUkSize: number,
  brand: BrandProfile
): string {
  const adjustedSize = baseUkSize + brand.footwearOffset;
  const sizeEntry = FOOTWEAR_SIZES.find(s => s.uk === adjustedSize) ||
    FOOTWEAR_SIZES.reduce((prev, curr) => 
      Math.abs(curr.uk - adjustedSize) < Math.abs(prev.uk - adjustedSize) ? curr : prev
    );
  
  return `UK ${sizeEntry.uk} / EU ${sizeEntry.eu}`;
}

// Main function: Get recommendations for all brands
export function getRecommendationsForAllBrands(
  calibration: CalibrationData
): SizeRecommendation[] {
  const { productType, fitPreference } = calibration;
  
  // Parse base size
  let baseIndex = 3; // Default to M/Size 9
  let baseUkSize = 9;
  
  if (productType === "apparel") {
    const sizeMatch = calibration.baseSize.match(/^(XS|S|M|L|XL|XXL|3XL)/i);
    if (sizeMatch) {
      baseIndex = APPAREL_SIZES.findIndex(s => s.toLowerCase() === sizeMatch[1].toLowerCase());
    }
  } else {
    const ukMatch = calibration.baseSize.match(/UK\s*(\d+\.?\d*)/i);
    if (ukMatch) {
      baseUkSize = parseFloat(ukMatch[1]);
    }
  }
  
  return BRANDS.map(brand => {
    let recommendedSize: string;
    
    if (productType === "apparel") {
      recommendedSize = calculateApparelSize(baseIndex, brand, fitPreference);
    } else {
      recommendedSize = calculateFootwearSize(baseUkSize, brand);
    }
    
    return {
      brand,
      recommendedSize,
      confidence: calculateConfidence(brand, fitPreference),
      fitNote: getFitNote(brand, productType),
    };
  }).sort((a, b) => b.confidence - a.confidence);
}

// Parse natural language size input
export function parseNaturalLanguageSize(input: string, productType: ProductType): { brand?: string; size: string } | null {
  const lowered = input.toLowerCase();
  
  // Look for brand mentions
  const brandMatch = BRANDS.find(b => lowered.includes(b.name.toLowerCase()));
  
  // Extract size
  let size = "";
  
  if (productType === "apparel") {
    const sizeMatch = lowered.match(/\b(xs|s|m|l|xl|xxl|3xl|\d{2})\b/i);
    if (sizeMatch) {
      size = sizeMatch[1].toUpperCase();
      // Convert numeric to letter
      const numericMap: Record<string, string> = { "32": "XS", "34": "S", "36": "S", "38": "M", "40": "M", "42": "L", "44": "XL", "46": "XXL", "48": "XXL" };
      size = numericMap[size] || size;
    }
  } else {
    const ukMatch = lowered.match(/(?:uk\s*)?(\d+\.?\d*)/i);
    const usMatch = lowered.match(/us\s*(\d+\.?\d*)/i);
    
    if (usMatch) {
      // Convert US to UK (US is typically 1 size larger)
      const usSize = parseFloat(usMatch[1]);
      size = `UK ${usSize - 1}`;
    } else if (ukMatch) {
      size = `UK ${ukMatch[1]}`;
    }
  }
  
  if (!size) return null;
  
  return {
    brand: brandMatch?.name,
    size,
  };
}
