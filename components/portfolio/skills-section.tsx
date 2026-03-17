"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function SkillsSection({skills} : { skills: { category: string, items: string[] }[] }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section 
      ref={ref}
      id="skills" 
      className="relative py-32 px-6 bg-secondary/30"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ x }}
        className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 text-balance">
            Technologies I work with
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full">
                <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li 
                      key={skill}
                      className="text-muted-foreground text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
