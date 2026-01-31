import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Ruler, 
  MessageSquare, 
  Camera, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Loader2,
  Footprints,
  Shirt
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalibrationMethod = "manual" | "chat" | "photo";
type ProductType = "footwear" | "apparel";

interface CalibrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: ProductType;
  onComplete: (data: CalibrationResult) => void;
}

interface CalibrationResult {
  method: CalibrationMethod;
  size: string;
  confidence: number;
}

const methods = [
  {
    id: "manual" as const,
    icon: Ruler,
    title: "Manual Entry",
    description: "Enter your measurements in CM, MM, or Inches",
  },
  {
    id: "chat" as const,
    icon: MessageSquare,
    title: "AI Chat",
    description: "Tell us what you usually wear",
  },
  {
    id: "photo" as const,
    icon: Camera,
    title: "Photo Scanner",
    description: "Scan your shoe or clothing label",
  },
];

export function CalibrationModal({
  open,
  onOpenChange,
  productType,
  onComplete,
}: CalibrationModalProps) {
  const [step, setStep] = useState<"select" | CalibrationMethod>("select");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMethodSelect = (method: CalibrationMethod) => {
    setStep(method);
  };

  const handleBack = () => {
    setStep("select");
  };

  const handleComplete = async (result: Omit<CalibrationResult, "method">) => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onComplete({ ...result, method: step as CalibrationMethod });
    setIsProcessing(false);
    onOpenChange(false);
    setStep("select");
  };

  const isCyan = productType === "footwear";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass-card border-border/50 bg-card/95 backdrop-blur-xl p-0 overflow-hidden">
        <div className={cn(
          "h-1 w-full",
          isCyan ? "bg-primary" : "bg-secondary"
        )} />
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {isCyan ? (
              <Footprints className="h-6 w-6 text-primary" />
            ) : (
              <Shirt className="h-6 w-6 text-secondary" />
            )}
            <div>
              <DialogTitle className="text-xl font-semibold">
                {productType === "footwear" ? "Footwear" : "Apparel"} Calibration
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Choose how you'd like to find your perfect size
              </DialogDescription>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "select" && (
              <MethodSelection
                key="select"
                methods={methods}
                onSelect={handleMethodSelect}
                accentColor={isCyan ? "cyan" : "magenta"}
              />
            )}

            {step === "manual" && (
              <ManualEntry
                key="manual"
                productType={productType}
                onBack={handleBack}
                onComplete={handleComplete}
                isProcessing={isProcessing}
              />
            )}

            {step === "chat" && (
              <AIChat
                key="chat"
                productType={productType}
                onBack={handleBack}
                onComplete={handleComplete}
                isProcessing={isProcessing}
              />
            )}

            {step === "photo" && (
              <PhotoScanner
                key="photo"
                productType={productType}
                onBack={handleBack}
                onComplete={handleComplete}
                isProcessing={isProcessing}
              />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Method Selection Component
function MethodSelection({
  methods,
  onSelect,
  accentColor,
}: {
  methods: { id: CalibrationMethod; icon: React.ElementType; title: string; description: string }[];
  onSelect: (method: CalibrationMethod) => void;
  accentColor: "cyan" | "magenta";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      {methods.map((method, index) => (
        <motion.button
          key={method.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(method.id)}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-muted/30",
            "hover:bg-muted/50 transition-all duration-200 group lift-hover",
            "focus:outline-none focus:ring-2",
            accentColor === "cyan" ? "focus:ring-primary" : "focus:ring-secondary"
          )}
        >
          <div className={cn(
            "p-3 rounded-lg",
            accentColor === "cyan" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
          )}>
            <method.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-medium text-foreground">{method.title}</h3>
            <p className="text-sm text-muted-foreground">{method.description}</p>
          </div>
          <ChevronRight className={cn(
            "h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform",
            accentColor === "cyan" ? "group-hover:text-primary" : "group-hover:text-secondary"
          )} />
        </motion.button>
      ))}
    </motion.div>
  );
}

// Manual Entry Component
function ManualEntry({
  productType,
  onBack,
  onComplete,
  isProcessing,
}: {
  productType: ProductType;
  onBack: () => void;
  onComplete: (result: Omit<CalibrationResult, "method">) => void;
  isProcessing: boolean;
}) {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<"cm" | "mm" | "in">("cm");

  const handleSubmit = () => {
    // Simulate size calculation
    const calculatedSize = productType === "footwear" ? "UK 9 / EU 43" : "M (40)";
    onComplete({ size: calculatedSize, confidence: 92 });
  };

  const isCyan = productType === "footwear";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div className="space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            {productType === "footwear" ? "Foot Length" : "Chest/Bust Measurement"}
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-muted/50 border-border/50 focus:border-primary"
            />
            <div className="flex rounded-lg border border-border/50 overflow-hidden">
              {(["cm", "mm", "in"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors",
                    unit === u
                      ? isCyan
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!value || isProcessing}
          className="w-full"
          variant={isCyan ? "hero" : "heroSecondary"}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Find My Size
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// AI Chat Component
function AIChat({
  productType,
  onBack,
  onComplete,
  isProcessing,
}: {
  productType: ProductType;
  onBack: () => void;
  onComplete: (result: Omit<CalibrationResult, "method">) => void;
  isProcessing: boolean;
}) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content: productType === "footwear"
        ? "Hi! Tell me what shoe size you usually wear. For example: 'I wear Nike 10' or 'My Adidas are UK 9'"
        : "Hi! Tell me what clothing size you usually wear. For example: 'I wear L in H&M' or 'My Zara shirts are 40'"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          role: "ai",
          content: "Got it! Based on your input, I've calculated your Universal Size. Let me finalize the results..."
        }
      ]);
      
      setTimeout(() => {
        const calculatedSize = productType === "footwear" ? "UK 9.5 / EU 44" : "L (42)";
        onComplete({ size: calculatedSize, confidence: 87 });
      }, 1000);
    }, 1500);
  };

  const isCyan = productType === "footwear";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div className="h-48 overflow-y-auto space-y-3 scrollbar-hide">
        {chatHistory.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-3 rounded-xl max-w-[85%]",
              msg.role === "ai"
                ? "bg-muted/50 text-foreground"
                : isCyan
                  ? "bg-primary/20 text-foreground ml-auto"
                  : "bg-secondary/20 text-foreground ml-auto"
            )}
          >
            <p className="text-sm">{msg.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your size info..."
          className="flex-1 bg-muted/50 border-border/50"
          disabled={isProcessing}
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isProcessing}
          variant={isCyan ? "hero" : "heroSecondary"}
          size="default"
        >
          {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
        </Button>
      </div>
    </motion.div>
  );
}

// Photo Scanner Component
function PhotoScanner({
  productType,
  onBack,
  onComplete,
  isProcessing,
}: {
  productType: ProductType;
  onBack: () => void;
  onComplete: (result: Omit<CalibrationResult, "method">) => void;
  isProcessing: boolean;
}) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleUpload = () => {
    setScanning(true);
    
    // Simulate scanning animation
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      
      setTimeout(() => {
        const calculatedSize = productType === "footwear" ? "UK 9 / EU 43" : "M (40)";
        onComplete({ size: calculatedSize, confidence: 95 });
      }, 500);
    }, 3000);
  };

  const isCyan = productType === "footwear";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </button>

      <div className="relative">
        <div className={cn(
          "aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-colors",
          scanning 
            ? isCyan ? "border-primary bg-primary/5" : "border-secondary bg-secondary/5"
            : scanned
              ? "border-green-500 bg-green-500/5"
              : "border-border/50 hover:border-muted-foreground/50"
        )}>
          {scanning && (
            <motion.div
              className={cn(
                "absolute inset-0 overflow-hidden rounded-xl",
              )}
            >
              <motion.div
                className={cn(
                  "absolute left-0 right-0 h-1",
                  isCyan ? "bg-primary shadow-lg shadow-primary" : "bg-secondary shadow-lg shadow-secondary"
                )}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}

          {scanned ? (
            <>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">Label detected!</p>
            </>
          ) : scanning ? (
            <>
              <Loader2 className={cn(
                "h-10 w-10 animate-spin",
                isCyan ? "text-primary" : "text-secondary"
              )} />
              <p className="text-sm text-muted-foreground">Scanning label...</p>
            </>
          ) : (
            <>
              <Camera className="h-10 w-10 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Upload label photo</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Take a clear photo of your {productType === "footwear" ? "shoe" : "clothing"} size label
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Button
        onClick={handleUpload}
        disabled={scanning || isProcessing}
        className="w-full"
        variant={isCyan ? "hero" : "heroSecondary"}
      >
        {scanning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Scanning...
          </>
        ) : (
          <>
            <Camera className="h-4 w-4" />
            Upload Photo
          </>
        )}
      </Button>
    </motion.div>
  );
}
