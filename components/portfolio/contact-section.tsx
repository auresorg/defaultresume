"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react"

// const links = [
//   { name: "Email", href: "mailto:hello@example.com", icon: Mail },
//   { name: "GitHub", href: "https://github.com", icon: Github },
//   { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
// ]

export function ContactSection({
  title, bio, email, linkedin, username
}: { title: string, bio: string, email: string, linkedin: string, username: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -50])

  return (
    <section 
      ref={ref}
      id="contact" 
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Contact</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 text-balance">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {bio}
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-primary/25"
          >
            <span>Say Hello</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-8"
        >
            <a
            href={`mailto:${email}`}
            target={undefined}
            rel={undefined}
            className="group flex flex-col items-center gap-2"
            >
            <div className="p-4 rounded-xl bg-secondary border border-border group-hover:border-primary/50 transition-all group-hover:-translate-y-1">
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              Email
            </span>
            </a>

            <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
            >
            <div className="p-4 rounded-xl bg-secondary border border-border group-hover:border-primary/50 transition-all group-hover:-translate-y-1">
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              GitHub
            </span>
            </a>

            <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
            >
            <div className="p-4 rounded-xl bg-secondary border border-border group-hover:border-primary/50 transition-all group-hover:-translate-y-1">
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
              LinkedIn
            </span>
            </a>
        </motion.div>
      </div>
    </section>
  )
}
