"use client"

import { useState } from "react"
import { ScriptEntry } from "./steps/script-entry"
import { VoiceSelection } from "./steps/voice-selection"
import { BackgroundTrackSelection } from "./steps/background-track-selection"
import { MixingOptions } from "./steps/mixing-options"
import { PreviewFinalization } from "./steps/preview-finalization"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Step = 1 | 2 | 3 | 4 | 5

export type AdData = {
  script: string
  selectedVoiceId: string | null
  selectedTrackId: string | null
  mixingOptions: {
    voiceDelay: number
    voiceHug: number
    bedVolume: number
    bedDelay: number
    mixRatio: number
    fadeInDuration: number
    fadeOutDuration: number
    duckingEffectDuration: number
  }
  advertiser: string
  adName: string
}

export function AudioAdCreator() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const [showTrackModal, setShowTrackModal] = useState(false)
  const [adData, setAdData] = useState<AdData>({
    script: "",
    selectedVoiceId: null,
    selectedTrackId: null,
    mixingOptions: {
      voiceDelay: 0,
      voiceHug: 200,
      bedVolume: 50,
      bedDelay: 0,
      mixRatio: 70,
      fadeInDuration: 0.5,
      fadeOutDuration: 0.5,
      duckingEffectDuration: 300,
    },
    advertiser: "",
    adName: "",
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const updateAdData = (newData: Partial<AdData>) => {
    setAdData({ ...adData, ...newData })
  }

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
      window.scrollTo(0, 0)
    }
  }

  const openVoiceModal = () => {
    setShowVoiceModal(true)
  }

  const openTrackModal = () => {
    setShowTrackModal(true)
  }

  const generatePreview = () => {
    // Simulate generating a preview
    toast({
      title: "Generating preview",
      description: "Your audio ad is being generated...",
    })

    setTimeout(() => {
      setPreviewUrl("/placeholder.svg?height=80&width=400")
      toast({
        title: "Preview ready",
        description: "Your audio ad preview is ready to play.",
      })
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ScriptEntry adData={adData} updateAdData={updateAdData} />
      case 2:
        return (
          <VoiceSelection
            adData={adData}
            updateAdData={updateAdData}
            showModal={showVoiceModal}
            setShowModal={setShowVoiceModal}
            openModal={openVoiceModal}
          />
        )
      case 3:
        return (
          <BackgroundTrackSelection
            adData={adData}
            updateAdData={updateAdData}
            showModal={showTrackModal}
            setShowModal={setShowTrackModal}
            openModal={openTrackModal}
          />
        )
      case 4:
        return <MixingOptions adData={adData} updateAdData={updateAdData} />
      case 5:
        return (
          <PreviewFinalization
            adData={adData}
            updateAdData={updateAdData}
            previewUrl={previewUrl}
            generatePreview={generatePreview}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">AudioMatic Ad Creator</h1>

      {/* Progress Steps */}
      <div className="mb-8 hidden md:block">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex flex-col items-center ${step <= currentStep ? "text-blue-600" : "text-gray-400"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step < currentStep
                    ? "bg-blue-600 text-white"
                    : step === currentStep
                      ? "border-2 border-blue-600 text-blue-600"
                      : "border-2 border-gray-300 text-gray-400"
                }`}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : step}
              </div>
              <span className="text-sm font-medium">
                {step === 1
                  ? "Script"
                  : step === 2
                    ? "Voice"
                    : step === 3
                      ? "Track"
                      : step === 4
                        ? "Mixing"
                        : "Preview"}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 25}%` }}
          ></div>
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="mb-6 md:hidden">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <span className="text-blue-600 font-medium">
            Step {currentStep} of 5:{" "}
            {currentStep === 1
              ? "Script Entry"
              : currentStep === 2
                ? "Voice Selection"
                : currentStep === 3
                  ? "Background Track"
                  : currentStep === 4
                    ? "Mixing Options"
                    : "Preview & Finalize"}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
          Back
        </Button>

        <Button
          onClick={handleNextStep}
          disabled={
            (currentStep === 1 && !adData.script.trim()) ||
            (currentStep === 2 && !adData.selectedVoiceId) ||
            (currentStep === 3 && !adData.selectedTrackId) ||
            currentStep === 5
          }
        >
          {currentStep < 5 ? (
            <>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </>
          ) : (
            "Finish"
          )}
        </Button>
      </div>
    </div>
  )
}
