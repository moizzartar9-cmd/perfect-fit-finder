import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryToggle } from "@/components/CategoryToggle";
import { CalibrationModal } from "@/components/CalibrationModal";
import { BrandLogoCloud } from "@/components/BrandLogoCloud";
import { FitResultCard, FitResult } from "@/components/FitResultCard";
import { Sparkles, ArrowRight, Footprints, Shirt, ShoppingBag, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "men" | "women" | "kids";
type ProductType = "footwear" | "apparel";

const Index = () => {
  const [category, setCategory] = useState<Category>("men");
  const [uid, setUid] = useState("");
  const [productType, setProductType] = useState<ProductType>("footwear");
  const [calibrationOpen, setCalibrationOpen] = useState(false);
  const [fitResult, setFitResult] = useState<FitResult | null>(null);

  const handleCalibrationComplete = (data: { method: string; size: string; confidence: number }) => {
    // Generate a simulated UID
    const generatedUid = `USID-${category.toUpperCase().slice(0, 1)}${productType.slice(0, 1).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setUid(generatedUid);

    // Set fit result
    setFitResult({
      uid: generatedUid,
      productType,
      recommendedSize: data.size,
      confidence: data.confidence,
      insights: productType === "footwear"
        ? [
            "Runs narrow; consider +0.5 size for wide feet",
            "True to size for regular width",
            "Break-in period: 2-3 wears recommended",
          ]
        : [
            "Relaxed fit; size down for slim preference",
            "True to size for regular fit",
            "Fabric has 2% stretch allowance",
          ],
      brandAdjustments: productType === "footwear"
        ? [
            { brand: "Nike", adjustment: "Size 9.5" },
            { brand: "Adidas", adjustment: "Size 9" },
            { brand: "Puma", adjustment: "Size 9.5" },
            { brand: "New Balance", adjustment: "Size 9 (Wide)" },
          ]
        : [
            { brand: "H&M", adjustment: "L" },
            { brand: "Zara", adjustment: "M" },
            { brand: "Uniqlo", adjustment: "L" },
            { brand: "Levi's", adjustment: "M (32)" },
          ],
    });
  };

  const handleLookup = () => {
    if (uid.startsWith("USID-")) {
      // Simulate looking up an existing UID
      const isFootwear = uid.includes("-F");
      setProductType(isFootwear ? "footwear" : "apparel");
      setFitResult({
        uid,
        productType: isFootwear ? "footwear" : "apparel",
        recommendedSize: isFootwear ? "UK 9 / EU 43" : "M (40)",
        confidence: 94,
        insights: isFootwear
          ? [
              "Runs narrow; consider +0.5 size for wide feet",
              "True to size for regular width",
            ]
          : [
              "Relaxed fit; size down for slim preference",
              "True to size for regular fit",
            ],
        brandAdjustments: isFootwear
          ? [
              { brand: "Nike", adjustment: "Size 9.5" },
              { brand: "Adidas", adjustment: "Size 9" },
            ]
          : [
              { brand: "H&M", adjustment: "L" },
              { brand: "Zara", adjustment: "M" },
            ],
      });
    }
  };

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
            <CategoryToggle value={category} onChange={setCategory} />
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
                  onClick={() => setProductType("footwear")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    productType === "footwear"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent"
                  )}
                >
                  <Footprints className="h-5 w-5" />
                  Footwear
                </button>
                <button
                  onClick={() => setProductType("apparel")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    productType === "apparel"
                      ? "bg-secondary/20 text-secondary border border-secondary/30"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground border border-transparent"
                  )}
                >
                  <Shirt className="h-5 w-5" />
                  Apparel
                </button>
              </div>

              {/* UID Input */}
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your Universal Size ID (e.g., USID-MF-ABC123)"
                    value={uid}
                    onChange={(e) => setUid(e.target.value.toUpperCase())}
                    className="h-14 text-center text-lg bg-muted/30 border-border/50 placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleLookup}
                    disabled={!uid}
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
              </div>
            </div>
          </motion.div>

          {/* Result Card */}
          {fitResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <FitResultCard
                result={fitResult}
                onRecalibrate={() => setCalibrationOpen(true)}
              />
            </motion.div>
          )}
        </section>

        {/* Trust Section */}
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

        {/* How It Works */}
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
