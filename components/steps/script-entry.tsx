"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Sparkles } from "lucide-react"
import type { AdData } from "../audio-ad-creator"

interface ScriptEntryProps {
  adData: AdData
  updateAdData: (data: Partial<AdData>) => void
}

const MAX_CHARACTERS = 500

export function ScriptEntry({ adData, updateAdData }: ScriptEntryProps) {
  const [characterCount, setCharacterCount] = useState(adData.script.length)

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newScript = e.target.value
    setCharacterCount(newScript.length)
    updateAdData({ script: newScript })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Start Your Audio Ad</h2>
        <p className="text-gray-500">Create a compelling script for your audio advertisement</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Ad Script</h3>

        <div className="space-y-2">
          <label htmlFor="script" className="block text-sm font-medium text-gray-700">
            Option 1: Type your script
          </label>
          <Textarea
            id="script"
            placeholder="Enter your ad script here..."
            className="min-h-[200px] resize-y"
            value={adData.script}
            onChange={handleScriptChange}
            maxLength={MAX_CHARACTERS}
          />
          <div className="flex justify-between text-sm">
            <span className={characterCount > MAX_CHARACTERS * 0.9 ? "text-amber-600" : "text-gray-500"}>
              {characterCount} / {MAX_CHARACTERS} characters
            </span>
            <span className="text-gray-500">Approximately {Math.ceil(characterCount / 15)} seconds</span>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Option 2: Use AI to help write your script
          </label>
          <Button variant="outline" className="w-full sm:w-auto">
            <Sparkles className="mr-2 h-4 w-4" />
            Use AI Recommendation
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium">Tips for effective audio ads:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Keep it concise and focused on a single message</li>
          <li>Include a clear call-to-action</li>
          <li>Use conversational language that sounds natural when spoken</li>
          <li>Consider your target audience's needs and pain points</li>
        </ul>
      </div>
    </div>
  )
}
