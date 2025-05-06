"use client"

import { Check } from "lucide-react"
import { VoiceAvatar } from "./voice-avatar"

interface VoiceSelectorProps {
  selectedVoice: string
  onChange: (voiceId: string) => void
}

// Sample voice data
const voices = [
  { id: "voice1", name: "Michael", gender: "Male", accent: "American" },
  { id: "voice2", name: "Sarah", gender: "Female", accent: "American" },
  { id: "voice3", name: "James", gender: "Male", accent: "British" },
  { id: "voice4", name: "Emma", gender: "Female", accent: "British" },
  { id: "voice5", name: "David", gender: "Male", accent: "Australian" },
  { id: "voice6", name: "Sophia", gender: "Female", accent: "Australian" },
]

export function VoiceSelector({ selectedVoice, onChange }: VoiceSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`
              flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all
              ${selectedVoice === voice.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}
            `}
            onClick={() => onChange(voice.id)}
          >
            <VoiceAvatar voiceId={voice.id} />

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{voice.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {voice.gender} • {voice.accent}
              </p>
            </div>

            {selectedVoice === voice.id && (
              <div className="flex-shrink-0 text-blue-500">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
