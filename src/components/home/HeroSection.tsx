"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-dark-secondary">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10" />

      {/* Decorative gold line pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gold" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-gold" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gold" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6"
        >
          Curated Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-primary mb-6 leading-tight"
        >
          Premium Jewelry
          <span className="block text-gold">&amp; Sneakers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Where luxury meets streetwear. Discover authentic pieces crafted for
          those who dare to stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/shop" variant="primary">
            Shop Now
          </Button>
          <Button href="/about" variant="secondary">
            Our Story
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-5 h-8 border border-text-secondary/30 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1.5 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
