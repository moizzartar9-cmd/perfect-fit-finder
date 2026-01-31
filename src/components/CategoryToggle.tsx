import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = "men" | "women" | "kids";

interface CategoryToggleProps {
  value: Category;
  onChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
];

export function CategoryToggle({ value, onChange }: CategoryToggleProps) {
  return (
    <div className="relative flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={cn(
            "relative z-10 px-6 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg",
            value === category.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === category.id && (
            <motion.div
              layoutId="categoryToggle"
              className={cn(
                "absolute inset-0 rounded-lg",
                category.id === "women" ? "bg-secondary" : "bg-primary"
              )}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
