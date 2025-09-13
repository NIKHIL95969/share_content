"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Home, Code, Plus } from "lucide-react"

const icons = {
  home: Home,
  code: Code,
  upload: Plus,
}


export function SiteFooter() {
  const pathname = usePathname()
  const navItems = siteConfig.navItems

  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 dark:bg-transparent">
      {/* Static footer info */}
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) mb-16 items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn
            </a>{" "}
            at{" "}
            <a
              href="https://vercel.com/new?utm_source=shadcn_site&utm_medium=web&utm_campaign=docs_cta_deploy_now_callout"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center justify-around border-t px-6 py-4 backdrop-blur-sm sm:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = icons[item.icon as keyof typeof icons]

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {Icon && <Icon className="h-5 w-5" />}
              {/* Uncomment if you also want labels */}
              {/* <span>{item.label}</span> */}
            </Link>
          )
        })}
      </div>
    </footer>
  )
}
