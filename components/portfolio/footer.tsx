"use client"

import { motion } from "framer-motion"

export function Footer(
  {text, name}: {
    text: string,
    name: string
  }
) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {text}
        </p>
        <p className="text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} ${name}. All rights reserved.`}
        </p>
      </div>
    </motion.footer>
  )
}
