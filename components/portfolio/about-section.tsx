"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AboutSection({title, name, p1, p2, p3, username}: { title: string, name: string, p1: string, p2: string, p3: string, username: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      ref={ref}
      id="about" 
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-mono uppercase tracking-widest">About</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-8 text-balance">
              {title}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                {p1}
              </p>
              <p>
                {p2}
              </p>
              <p>
                {p3}
              </p>
            </div>
          </motion.div>

          {/* Right Column - Parallax Image */}
          <motion.div
            style={{ y }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-border"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                    <img
                      src={`https://github.com/${username}.png`}
                      alt={`${name}'s profile`}
                      className="w-full h-full rounded-full object-cover"
                      onError={e => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <span
                      className="text-5xl font-bold text-primary absolute inset-0 flex items-center justify-center"
                      style={{ display: "none" }}
                    >
                      {name.split(" ").map(word => word[0]).join("")}
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {name}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-lg -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
