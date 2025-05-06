"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Pause, Play, Save } from "lucide-react"
import type { AdData } from "../audio-ad-creator"

interface PreviewFinalizationProps {
  adData: AdData
  updateAdData: (data: Partial<AdData>) => void
  previewUrl: string | null
  generatePreview: () => void
}

export function PreviewFinalization({ adData, updateAdData, previewUrl, generatePreview }: PreviewFinalizationProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    advertiser: false,
    adName: false,
  })

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const handleGenerateClick = () => {
    setIsGenerating(true)
    // Simulate API call delay
    setTimeout(() => {
      generatePreview()
      setIsGenerating(false)
    }, 1500)
  }

  const handleSaveAd = () => {
    // Validate required fields
    const errors = {
      advertiser: !adData.advertiser.trim(),
      adName: !adData.adName.trim(),
    }

    setValidationErrors(errors)

    if (!errors.advertiser && !errors.adName) {
      // In a real implementation, this would save the ad to a library
      console.log("Saving ad:", adData)
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate estimated duration based on script length
  const estimatedDuration = Math.max(15, Math.ceil(adData.script.length / 15))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Preview and Finalization</h2>
        <p className="text-gray-500">Generate your audio ad and save it to your creative library</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Generate Audio Ad</h3>
            <p className="text-sm text-gray-500">Create your audio ad with all selected options</p>
          </div>
          <Button
            onClick={handleGenerateClick}
            disabled={isGenerating || !adData.script.trim() || !adData.selectedVoiceId || !adData.selectedTrackId}
            className="sm:w-auto"
          >
            {isGenerating ? "Generating..." : "Generate Ad"}
          </Button>
        </div>

        {previewUrl ? (
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="text-center mb-2">
              <h3 className="font-medium text-gray-900">Audio Preview</h3>
              <p className="text-sm text-gray-500">Mixing and mastering applied automatically</p>
            </div>

            <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden">
              {/* Audio waveform visualization */}
              <img src={previewUrl || "/placeholder.svg"} alt="Audio waveform" className="w-full h-full object-cover" />

              {/* Playback progress overlay */}
              <div
                className="absolute top-0 left-0 h-full bg-blue-200/30"
                style={{ width: `${(currentTime / estimatedDuration) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={togglePlayback}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${(currentTime / estimatedDuration) * 100}%` }}
                ></div>
              </div>

              <div className="text-sm font-medium text-gray-500 w-16 text-right">
                {formatTime(currentTime)}/{formatTime(estimatedDuration)}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download Preview
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-8 text-center">
            <Play className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Preview Available</h3>
            <p className="text-gray-500 mb-4">Generate your audio ad to preview it</p>
          </div>
        )}
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Add to Creative Library</h3>
            <p className="text-sm text-gray-500">Save your audio ad for future use</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advertiser" className={validationErrors.advertiser ? "text-red-500" : ""}>
                Advertiser
              </Label>
              <Select
                value={adData.advertiser}
                onValueChange={(value) => {
                  updateAdData({ advertiser: value })
                  setValidationErrors({ ...validationErrors, advertiser: false })
                }}
              >
                <SelectTrigger id="advertiser" className={validationErrors.advertiser ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select advertiser" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="globex">Globex Industries</SelectItem>
                  <SelectItem value="initech">Initech Technologies</SelectItem>
                  <SelectItem value="umbrella">Umbrella Corp</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.advertiser && <p className="text-xs text-red-500">Please select an advertiser</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adName" className={validationErrors.adName ? "text-red-500" : ""}>
                Ad Name
              </Label>
              <Input
                id="adName"
                placeholder="Enter a name for your ad"
                value={adData.adName}
                onChange={(e) => {
                  updateAdData({ adName: e.target.value })
                  setValidationErrors({ ...validationErrors, adName: false })
                }}
                className={validationErrors.adName ? "border-red-500" : ""}
              />
              {validationErrors.adName && <p className="text-xs text-red-500">Please enter an ad name</p>}
            </div>
          </div>

          <Button onClick={handleSaveAd} disabled={!previewUrl} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Add to Creative Library
          </Button>
        </div>
      </div>
    </div>
  )
}
