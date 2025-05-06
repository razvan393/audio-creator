"use client"

import { useState } from "react"
import { Clock, Music, PlayCircle, Save, Type, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VoiceSelector } from "./voice-selector"
import type { AdScript } from "./types"

interface AdFormProps {
  adScript: AdScript
  setAdScript: (script: AdScript) => void
  onGeneratePreview: () => void
}

export function AdForm({ adScript, setAdScript, onGeneratePreview }: AdFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleChange = (field: keyof AdScript, value: string | number) => {
    setAdScript({ ...adScript, [field]: value })
  }

  const handleGenerateClick = () => {
    setIsGenerating(true)
    // Simulate API call delay
    setTimeout(() => {
      onGeneratePreview()
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Type className="h-5 w-5" />
        Ad Details
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Ad Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your ad"
            value={adScript.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="script">Ad Script</Label>
          <Textarea
            id="script"
            placeholder="Write your ad script here..."
            className="min-h-[120px]"
            value={adScript.script}
            onChange={(e) => handleChange("script", e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            {adScript.script.length} characters (approx. {Math.round(adScript.script.length / 20)} seconds)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice Settings
        </h2>

        <VoiceSelector selectedVoice={adScript.voiceId} onChange={(voiceId) => handleChange("voiceId", voiceId)} />

        <div>
          <Label htmlFor="tone">Voice Tone</Label>
          <Select value={adScript.tone} onValueChange={(value) => handleChange("tone", value)}>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="excited">Excited</SelectItem>
              <SelectItem value="serious">Serious</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tempo">Speaking Tempo</Label>
          <Select value={adScript.tempo} onValueChange={(value) => handleChange("tempo", value)}>
            <SelectTrigger id="tempo">
              <SelectValue placeholder="Select tempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Music className="h-5 w-5" />
          Audio Settings
        </h2>

        <div>
          <Label htmlFor="backgroundMusic">Background Music</Label>
          <Select value={adScript.backgroundMusic} onValueChange={(value) => handleChange("backgroundMusic", value)}>
            <SelectTrigger id="backgroundMusic">
              <SelectValue placeholder="Select background music" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="upbeat">Upbeat</SelectItem>
              <SelectItem value="relaxed">Relaxed</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between">
            <Label htmlFor="duration" className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Target Duration
            </Label>
            <span className="text-sm font-medium">{adScript.duration} seconds</span>
          </div>
          <Slider
            id="duration"
            min={15}
            max={60}
            step={5}
            value={[adScript.duration]}
            onValueChange={(value) => handleChange("duration", value[0])}
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={handleGenerateClick} className="flex-1" disabled={isGenerating || !adScript.script.trim()}>
          <PlayCircle className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Preview"}
        </Button>

        <Button variant="outline" className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Save Ad
        </Button>
      </div>
    </div>
  )
}
