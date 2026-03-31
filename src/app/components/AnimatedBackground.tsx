import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function AnimatedBackground({ variant = "default" }: { variant?: "default" | "green" | "blue" }) {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    // Generate random floating shapes
    const newShapes: FloatingShape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      duration: Math.random() * 10 + 20,
      delay: Math.random() * 5,
    }));
    setShapes(newShapes);
  }, []);

  const gradients = {
    default: "from-[#F8FAFC] via-[#EFF6FF] to-[#F0FDF4]",
    green: "from-[#F0FDF4] via-[#DCFCE7] to-[#F8FAFC]",
    blue: "from-[#EFF6FF] via-[#DBEAFE] to-[#F8FAFC]",
  };

  const shapeColors = {
    default: ["#22C55E20", "#3B82F620", "#F59E0B20"],
    green: ["#22C55E20", "#10B98120", "#84CC1620"],
    blue: ["#3B82F620", "#60A5FA20", "#818CF820"],
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]}`} />

      {/* Mesh Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, #22C55E15 0px, transparent 50%),
            radial-gradient(at 80% 20%, #3B82F615 0px, transparent 50%),
            radial-gradient(at 50% 80%, #F59E0B15 0px, transparent 50%)
          `,
        }}
      />

      {/* Floating Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shapeColors[variant][shape.id % 3],
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern Overlay (subtle) */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0F172A 1px, transparent 1px),
            linear-gradient(to bottom, #0F172A 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
