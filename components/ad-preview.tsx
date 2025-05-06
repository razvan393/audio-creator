"use client"

import { useState } from "react"
import { Download, Pause, Play, Share2, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { AdScript } from "./types"
import { VoiceAvatar } from "./voice-avatar"

interface AdPreviewProps {
  adScript: AdScript
  previewUrl: string | null
}

export function AdPreview({ adScript, previewUrl }: AdPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preview</h2>

      {previewUrl ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <VoiceAvatar voiceId={adScript.voiceId} size="lg" />

            <div>
              <h3 className="font-medium">{adScript.title || "Untitled Ad"}</h3>
              <p className="text-sm text-gray-500">
                {adScript.duration} seconds • {adScript.tone} tone
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
            <p>{adScript.script || "No script provided."}</p>
          </div>

          <div className="space-y-2">
            <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden">
              {/* Audio waveform visualization */}
              <img src={previewUrl || "/placeholder.svg"} alt="Audio waveform" className="w-full h-full object-cover" />

              {/* Playback progress overlay */}
              <div
                className="absolute top-0 left-0 h-full bg-blue-200/30"
                style={{ width: `${(currentTime / adScript.duration) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={togglePlayback}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  max={adScript.duration}
                  step={0.1}
                  onValueChange={(value) => setCurrentTime(value[0])}
                />
              </div>

              <div className="text-sm font-medium text-gray-500 w-16 text-right">
                {formatTime(currentTime)}/{formatTime(adScript.duration)}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="icon">
              <Sliders className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg text-gray-500">
          <div className="mb-4">
            <Play className="h-12 w-12" />
          </div>
          <p className="text-center">Fill out the form and click "Generate Preview" to create your audio ad</p>
        </div>
      )}
    </div>
  )
}
