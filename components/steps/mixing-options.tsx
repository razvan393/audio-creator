"use client"

import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { AdData } from "../audio-ad-creator"

interface MixingOptionsProps {
  adData: AdData
  updateAdData: (data: Partial<AdData>) => void
}

export function MixingOptions({ adData, updateAdData }: MixingOptionsProps) {
  const handleMixingChange = (option: keyof AdData["mixingOptions"], value: number) => {
    updateAdData({
      mixingOptions: {
        ...adData.mixingOptions,
        [option]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Advanced Mixing Options</h2>
        <p className="text-gray-500">Fine-tune your audio advertisement with professional mixing controls</p>
      </div>

      <TooltipProvider>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Delay */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="voiceDelay">Voice Delay (ms)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Delay before the voice starts after the background track begins</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="voiceDelay"
                  min={0}
                  max={2000}
                  step={10}
                  value={[adData.mixingOptions.voiceDelay]}
                  onValueChange={(value) => handleMixingChange("voiceDelay", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.voiceDelay}
                  onChange={(e) => handleMixingChange("voiceDelay", Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={2000}
                />
              </div>
            </div>

            {/* Voice Hug */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="voiceHug">Voice Hug (ms)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Extra time before and after voice for natural spacing</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="voiceHug"
                  min={0}
                  max={1000}
                  step={10}
                  value={[adData.mixingOptions.voiceHug]}
                  onValueChange={(value) => handleMixingChange("voiceHug", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.voiceHug}
                  onChange={(e) => handleMixingChange("voiceHug", Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={1000}
                />
              </div>
            </div>

            {/* Bed Volume */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="bedVolume">Bed Volume (%)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Volume level of the background track</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="bedVolume"
                  min={0}
                  max={100}
                  step={1}
                  value={[adData.mixingOptions.bedVolume]}
                  onValueChange={(value) => handleMixingChange("bedVolume", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.bedVolume}
                  onChange={(e) => handleMixingChange("bedVolume", Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={100}
                />
              </div>
            </div>

            {/* Bed Delay */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="bedDelay">Bed Delay (ms)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Delay before the background track starts</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="bedDelay"
                  min={0}
                  max={2000}
                  step={10}
                  value={[adData.mixingOptions.bedDelay]}
                  onValueChange={(value) => handleMixingChange("bedDelay", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.bedDelay}
                  onChange={(e) => handleMixingChange("bedDelay", Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={2000}
                />
              </div>
            </div>

            {/* Mix Ratio */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="mixRatio">Mix Ratio (voice:bed)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Balance between voice and background track (higher = more voice)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="mixRatio"
                  min={0}
                  max={100}
                  step={1}
                  value={[adData.mixingOptions.mixRatio]}
                  onValueChange={(value) => handleMixingChange("mixRatio", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.mixRatio}
                  onChange={(e) => handleMixingChange("mixRatio", Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={100}
                />
              </div>
            </div>

            {/* Fade In Duration */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="fadeInDuration">Fade In Duration (s)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Time it takes for audio to fade in at the beginning</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="fadeInDuration"
                  min={0}
                  max={5}
                  step={0.1}
                  value={[adData.mixingOptions.fadeInDuration]}
                  onValueChange={(value) => handleMixingChange("fadeInDuration", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.fadeInDuration}
                  onChange={(e) => handleMixingChange("fadeInDuration", Number.parseFloat(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={5}
                  step={0.1}
                />
              </div>
            </div>

            {/* Fade Out Duration */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="fadeOutDuration">Fade Out Duration (s)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Time it takes for audio to fade out at the end</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="fadeOutDuration"
                  min={0}
                  max={5}
                  step={0.1}
                  value={[adData.mixingOptions.fadeOutDuration]}
                  onValueChange={(value) => handleMixingChange("fadeOutDuration", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.fadeOutDuration}
                  onChange={(e) => handleMixingChange("fadeOutDuration", Number.parseFloat(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={5}
                  step={0.1}
                />
              </div>
            </div>

            {/* Ducking Effect Duration */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="duckingEffectDuration">Ducking Effect Duration (ms)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">How quickly the background volume lowers when voice is present</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="duckingEffectDuration"
                  min={0}
                  max={1000}
                  step={10}
                  value={[adData.mixingOptions.duckingEffectDuration]}
                  onValueChange={(value) => handleMixingChange("duckingEffectDuration", value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={adData.mixingOptions.duckingEffectDuration}
                  onChange={(e) => handleMixingChange("duckingEffectDuration", Number.parseInt(e.target.value) || 0)}
                  className="w-20"
                  min={0}
                  max={1000}
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium">Professional mixing tips:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>For clearer voice, increase the mix ratio to favor the voice</li>
              <li>Add a slight voice delay (100-200ms) for a more natural sound</li>
              <li>Use ducking to automatically lower background music when voice is present</li>
              <li>Short fade in/out durations (0.5-1s) work well for most ads</li>
            </ul>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}
