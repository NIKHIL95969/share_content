"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Copy, Check, Expand } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import typescript from "highlight.js/lib/languages/typescript"
import json from "highlight.js/lib/languages/json"
import css from "highlight.js/lib/languages/css"

// Register languages
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("json", json)
hljs.registerLanguage("css", css)

interface CodeCardProps {
  code: string
  createdAt?: string
  title?: string
  language?: string
}

export function CodeCard({ code, createdAt, title, language }: CodeCardProps) {
  const [copied, setCopied] = useState(false)
  const [modalCopied, setModalCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState("")
  const [detectedLanguage, setDetectedLanguage] = useState("")
  const { theme } = useTheme()

  useEffect(() => {
    const lightThemeUrl = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
    const darkThemeUrl = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/tokyo-night-dark.min.css"

    const linkId = "highlight-theme"
    let link = document.getElementById(linkId) as HTMLLinkElement | null

    if (!link) {
      link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }

    link.href = theme === "dark" ? darkThemeUrl : lightThemeUrl
  }, [theme])
  
  useEffect(() => {
    if (!code || typeof code !== "string") {
      setHighlightedCode("")
      setDetectedLanguage("text")
      return
    }
  
    let result
    try {
      if (language) {
        result = hljs.highlight(code, { language })
      } else {
        result = hljs.highlightAuto(code, ["javascript", "python", "typescript", "json", "css"])
      }
      setHighlightedCode(result.value)
      setDetectedLanguage(result.language || "text")
    } catch (err) {
      console.error("Highlighting failed:", err)
      setHighlightedCode(code) // fallback to raw
      setDetectedLanguage("text")
    }
  }, [code, language])

  useEffect(() => {
    // Auto-detect language or use provided language
    let result
    if (language) {
      result = hljs.highlight(code, { language })
    } else {
      result = hljs.highlightAuto(code, ["javascript", "python", "typescript", "json", "css"])
    }

    setHighlightedCode(result.value)
    setDetectedLanguage(result.language || "text")
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleModalCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setModalCopied(true)
      setTimeout(() => setModalCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <Card className="overflow-hidden min-h-96 transition-transform duration-200 ease-in-out hover:scale-105">
      {/* Code content with theme-aware background */}
      <div className="p-6 relative">
        {title && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          </div>
        )}

        <pre className="overflow-x-auto overflow-y-auto min-h-72 max-h-72 rounded custom-scrollbar max-w-full">
          <code
            className={`hljs language-${detectedLanguage} text-sm leading-relaxed min-h-72 custom-scrollbar max-w-full`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Expand className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-6xl h-auto max-h-[90vh] p-0">
              <DialogHeader className="p-4 sm:p-6 pb-0">
                <DialogTitle className="text-lg font-semibold">
                  {title || "Code Viewer"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="m-4 sm:m-6 rounded-lg relative flex-1 overflow-hidden">
                <div className="p-4 sm:p-6 h-[70vh] overflow-auto">
                  <pre className="overflow-auto h-full rounded custom-scrollbar">
                    <code
                      className={`hljs language-${detectedLanguage} text-sm leading-relaxed`}
                      dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                  </pre>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                    onClick={handleModalCopy}
                  >
                    {modalCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Footer with timestamp */}
      {createdAt && (
        <div className="px-6 py-4 max-h-12 bg-muted/50 border-t flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex-grow">Created: {createdAt}</span>
        </div>
      )}
    </Card>
  )
}
