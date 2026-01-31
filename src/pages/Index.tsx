import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryToggle } from "@/components/CategoryToggle";
import { CalibrationModal } from "@/components/CalibrationModal";
import { BrandLogoCloud } from "@/components/BrandLogoCloud";
import { BrandResultsGrid } from "@/components/BrandResultsGrid";
import { Sparkles, ArrowRight, Footprints, Shirt, ShoppingBag, CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getRecommendationsForAllBrands, 
  type SizeRecommendation,
  type CalibrationData,
  type Category,
  type ProductType,
  type FitPreference
} from "@/lib/sizeMappingEngine";

// Isolated state for each product type
interface ProductState {
  uid: string;
  calibration: CalibrationData | null;
  recommendations: SizeRecommendation[];
  isCalibrated: boolean;
}

const initialProductState: ProductState = {
  uid: "",
  calibration: null,
  recommendations: [],
  isCalibrated: false,
};

const Index = () => {
  const [category, setCategory] = useState<Category>("men");
  const [productType, setProductType] = useState<ProductType>("footwear");
  const [calibrationOpen, setCalibrationOpen] = useState(false);
  
  // ISOLATED STATE: Separate state for footwear and apparel
  const [footwearState, setFootwearState] = useState<ProductState>(initialProductState);
  const [apparelState, setApparelState] = useState<ProductState>(initialProductState);
  
  // Get current state based on product type
  const currentState = productType === "footwear" ? footwearState : apparelState;
  const setCurrentState = productType === "footwear" ? setFootwearState : setApparelState;

  // Handle product type switch - NO data leakage between types
  const handleProductTypeChange = useCallback((newType: ProductType) => {
    setProductType(newType);
    // State is already isolated - no reset needed, each type keeps its own data
  }, []);

  // Handle category change - reset both states to prevent stale data
  const handleCategoryChange = useCallback((newCategory: Category) => {
    setCategory(newCategory);
    // Reset both product type states when category changes
    setFootwearState(initialProductState);
    setApparelState(initialProductState);
  }, []);

  const handleCalibrationComplete = useCallback((data: { method: string; size: string; confidence: number }) => {
    // Generate a simulated UID
    const generatedUid = `USID-${category.toUpperCase().slice(0, 1)}${productType.slice(0, 1).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Create calibration data
    const calibration: CalibrationData = {
      category,
      productType,
      baseSize: data.size,
      fitPreference: "regular" as FitPreference,
    };
    
    // Get recommendations for all brands
    const recommendations = getRecommendationsForAllBrands(calibration);
    
    // Update the correct state based on product type
    const newState: ProductState = {
      uid: generatedUid,
      calibration,
      recommendations,
      isCalibrated: true,
    };
    
    if (productType === "footwear") {
      setFootwearState(newState);
    } else {
      setApparelState(newState);
    }
  }, [category, productType]);

  const handleLookup = useCallback(() => {
    if (currentState.uid.startsWith("USID-")) {
      // Simulate looking up an existing UID and regenerating recommendations
      if (currentState.calibration) {
        const recommendations = getRecommendationsForAllBrands(currentState.calibration);
        setCurrentState(prev => ({ ...prev, recommendations }));
      }
    }
  }, [currentState, setCurrentState]);

  const handleReset = useCallback(() => {
    if (productType === "footwear") {
      setFootwearState(initialProductState);
    } else {
      setApparelState(initialProductState);
    }
  }, [productType]);

  const handleUidChange = useCallback((value: string) => {
    setCurrentState(prev => ({ ...prev, uid: value.toUpperCase() }));
  }, [setCurrentState]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                80+ Brands · Universal Sizing
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Find Your Fit </span>
              <span className="gradient-text">Once</span>
              <span className="text-foreground">,</span>
              <br />
              <span className="text-foreground">Shop </span>
              <span className="text-primary glow-text-cyan">Anywhere</span>
              <span className="text-foreground"> With Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Universal Size ID works across Flipkart, Amazon, Ajio, and Meesho.
              No more returns. No more guesswork.
            </p>
          </motion.div>

          {/* Category Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <CategoryToggle value={category} onChange={handleCategoryChange} />
          </motion.div>

          {/* Main Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8 md:p-10">
              {/* Product Type Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => handleProductTypeChange("footwear")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    productType === "footwear"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent"
                  )}
                >
                  <Footprints className="h-5 w-5" />
                  Footwear
                  {footwearState.isCalibrated && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </button>
                <button
                  onClick={() => handleProductTypeChange("apparel")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    productType === "apparel"
                      ? "bg-secondary/20 text-secondary border border-secondary/30"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent"
                  )}
                >
                  <Shirt className="h-5 w-5" />
                  Apparel
                  {apparelState.isCalibrated && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </button>
              </div>

              {/* UID Display or Input */}
              <div className="space-y-4">
                {currentState.isCalibrated ? (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">Your Universal Size ID</p>
                    <div className={cn(
                      "text-2xl font-mono font-bold py-3 px-6 rounded-xl inline-block",
                      productType === "footwear" 
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-secondary/10 text-secondary border border-secondary/30"
                    )}>
                      {currentState.uid}
                    </div>
                    <div className="flex gap-3 justify-center pt-2">
                      <Button
                        onClick={() => setCalibrationOpen(true)}
                        variant="glass"
                        size="sm"
                      >
                        <Sparkles className="h-4 w-4" />
                        Recalibrate
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter your Universal Size ID (e.g., USID-MF-ABC123)"
                        value={currentState.uid}
                        onChange={(e) => handleUidChange(e.target.value)}
                        className="h-14 text-center text-lg bg-muted/30 border-border/50 placeholder:text-muted-foreground/50 focus:border-primary"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleLookup}
                        disabled={!currentState.uid}
                        variant={productType === "footwear" ? "hero" : "heroSecondary"}
                        className="flex-1"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        Look Up My Size
                      </Button>
                      <Button
                        onClick={() => setCalibrationOpen(true)}
                        variant="glass"
                        className="flex-1"
                      >
                        <Sparkles className="h-5 w-5" />
                        Get My Universal ID
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Brand Results Grid */}
          <AnimatePresence mode="wait">
            {currentState.isCalibrated && currentState.recommendations.length > 0 && (
              <motion.div
                key={`${productType}-results`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-12"
              >
                <BrandResultsGrid 
                  recommendations={currentState.recommendations}
                  productType={productType}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Trust Section - Only show when not calibrated */}
        {!currentState.isCalibrated && (
          <section className="py-12 border-t border-border/30">
            <div className="container mx-auto px-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm text-muted-foreground mb-6"
              >
                Trusted by leading global and Indian brands
              </motion.p>
              <BrandLogoCloud />
            </div>
          </section>
        )}

        {/* How It Works - Only show when not calibrated */}
        {!currentState.isCalibrated && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How It Works
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Three simple steps to never guess your size again
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    step: "01",
                    title: "Calibrate Once",
                    description:
                      "Enter your measurements, chat with our AI, or scan a size label to create your Universal Size ID.",
                    icon: Sparkles,
                    color: "primary",
                  },
                  {
                    step: "02",
                    title: "Get Your UID",
                    description:
                      "Your unique identifier stores your exact fit profile across all brands and categories.",
                    icon: CheckCircle2,
                    color: "secondary",
                  },
                  {
                    step: "03",
                    title: "Shop Anywhere",
                    description:
                      "Use your UID on any platform. Get instant, personalized size recommendations.",
                    icon: ShoppingBag,
                    color: "primary",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 lift-hover text-center"
                  >
                    <div
                      className={cn(
                        "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                        item.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/10 text-secondary"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div
                      className={cn(
                        "text-xs font-bold mb-2",
                        item.color === "primary" ? "text-primary" : "text-secondary"
                      )}
                    >
                      STEP {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="py-16 border-t border-border/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "80+", label: "Brands Supported" },
                { value: "94%", label: "Accuracy Rate" },
                { value: "60%", label: "Fewer Returns" },
                { value: "100K+", label: "Happy Shoppers" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center glass-card p-10 md:p-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Shop Without Doubt?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Get your Universal Size ID in under 2 minutes. It's free, instant, and
                works everywhere you shop.
              </p>
              <Button
                onClick={() => setCalibrationOpen(true)}
                variant="hero"
                size="xl"
              >
                <Sparkles className="h-5 w-5" />
                Get My Universal ID
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-xs font-bold text-background">US</span>
                </div>
                <span className="font-semibold text-foreground">USID</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 Universal Size ID. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Calibration Modal */}
      <CalibrationModal
        open={calibrationOpen}
        onOpenChange={setCalibrationOpen}
        productType={productType}
        onComplete={handleCalibrationComplete}
      />
    </div>
  );
};

export default Index;
