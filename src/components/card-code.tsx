"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import typescript from "highlight.js/lib/languages/typescript"
import json from "highlight.js/lib/languages/json"
import css from "highlight.js/lib/languages/css"
import "highlight.js/styles/tokyo-night-dark.css"

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
  const [highlightedCode, setHighlightedCode] = useState("")
  const [detectedLanguage, setDetectedLanguage] = useState("")

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

  return (
    <Card className="overflow-hidden bg-white shadow-lg min-h-96">
      {/* Code content with dark background */}
      <div className="bg-[#1a1b26] p-6 relative">
        {title && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
          </div>
        )}

        <pre className="overflow-x-auto overflow-y-auto min-h-72 max-h-72 rounded">
          <code
            className={`hljs language-${detectedLanguage} text-sm leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>

        {/* Copy button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* Footer with timestamp */}
      {createdAt && (
        <div className="px-6 py-4 max-h-12 bg-gray-50 border-t flex items-center justify-between">
          <span className="text-sm text-gray-500">Created: {createdAt}</span>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}
