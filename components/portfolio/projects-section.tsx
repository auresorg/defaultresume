"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"


export function ProjectsSection({projects} : { projects: { title: string, description: string, tech: string[], repo: string, live: string }[] }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section 
      ref={ref}
      id="projects" 
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-mono uppercase tracking-widest">Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 text-balance">
            Selected work
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => {
            console.log(project)
            const repoBase = `https://raw.githubusercontent.com/${project.repo}/refs/heads/main/`
            console.log(project.repo, repoBase)
            const previews = repoBase ? [
              { type: "gif", src: repoBase + "preview.gif" },
              { type: "img", src: repoBase + "preview.png" },
              { type: "img", src: repoBase + "preview.jpg" },
            ] : []

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="grid lg:grid-cols-5 gap-8 p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  {/* Project Image Placeholder */}
                  <div className="lg:col-span-2 aspect-video lg:aspect-square rounded-xl bg-secondary border border-border overflow-hidden relative">

                    {previews.map((p, i) => (
                      p.type === "gif" ? (
                        <video
                          key={i}
                          src={p.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget.style.display = "none") }}
                        />
                      ) : (
                        <img
                          key={i}
                          src={p.src}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget.style.display = "none") }}
                        />
                      )
                    ))}

                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 via-transparent to-transparent">
                      <span className="text-4xl font-bold text-primary/20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                  </div>

                  {/* Project Details */}
                  <div className="lg:col-span-3 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-secondary text-muted-foreground rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      <a 
                        href={`https://github.com/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}