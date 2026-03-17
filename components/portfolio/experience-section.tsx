"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink } from "lucide-react"

export function ExperienceSection(
  { experiences }: { experiences: { period: string, title: string, company: string, description: string, skills: string[], link: string }[] }
) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-32 px-6 bg-secondary/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 text-balance">
            My journey so far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary/50"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? "md:text-right" : ""
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.25 md:-translate-x-1.5 mt-2" />

                {/* Content */}
                <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12 md:text-left"}`}>
                  <span className="text-sm text-primary font-mono">{exp.period}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1">
                    {exp.title}
                  </h3>
                  {exp.link === "#" ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      {exp.company}
                    </span>
                  ) : (
                    <a
                      href={exp.link}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm mt-1"
                    >
                      {exp.company}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
