"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AdData } from "../audio-ad-creator"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"

interface VoiceSelectionProps {
  adData: AdData
  updateAdData: (data: Partial<AdData>) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
  openModal: () => void
}

// Update the voice data to include language information
const voices = [
  {
    id: "voice1",
    name: "Michael",
    gender: "Male",
    accent: "American",
    language: "English",
    description: "Deep, authoritative voice ideal for corporate messaging",
    isNew: false,
    isPremium: true,
    category: "premium",
  },
  {
    id: "voice2",
    name: "Sarah",
    gender: "Female",
    accent: "American",
    language: "English",
    description: "Warm, friendly voice perfect for approachable brands",
    isNew: true,
    isPremium: true,
    category: "premium",
  },
  {
    id: "voice3",
    name: "James",
    gender: "Male",
    accent: "British",
    language: "English",
    description: "Sophisticated, refined voice with excellent articulation",
    isNew: false,
    isPremium: true,
    category: "premium",
  },
  {
    id: "voice4",
    name: "Emma",
    gender: "Female",
    accent: "British",
    language: "English",
    description: "Clear, professional voice with excellent pacing",
    isNew: true,
    isPremium: false,
    category: "new",
  },
  {
    id: "voice5",
    name: "David",
    gender: "Male",
    accent: "Australian",
    language: "English",
    description: "Casual, relatable voice with natural inflection",
    isNew: true,
    isPremium: false,
    category: "new",
  },
  {
    id: "voice6",
    name: "Sophia",
    gender: "Female",
    accent: "Australian",
    language: "English",
    description: "Energetic, upbeat voice ideal for promotional content",
    isNew: false,
    isPremium: false,
    category: "standard",
  },
  {
    id: "voice7",
    name: "Carlos",
    gender: "Male",
    accent: "Latin American",
    language: "Spanish",
    description: "Warm, engaging voice with perfect Spanish pronunciation",
    isNew: true,
    isPremium: true,
    category: "premium",
  },
  {
    id: "voice8",
    name: "Marie",
    gender: "Female",
    accent: "Parisian",
    language: "French",
    description: "Elegant, sophisticated voice with authentic French accent",
    isNew: false,
    isPremium: true,
    category: "premium",
  },
  {
    id: "voice9",
    name: "Hans",
    gender: "Male",
    accent: "Standard",
    language: "German",
    description: "Clear, authoritative voice with precise diction",
    isNew: false,
    isPremium: false,
    category: "standard",
  },
  {
    id: "voice10",
    name: "Yuki",
    gender: "Female",
    accent: "Tokyo",
    language: "Japanese",
    description: "Polite, professional voice with natural intonation",
    isNew: true,
    isPremium: false,
    category: "new",
  },
]

interface VoiceItemProps {
  voice: (typeof voices)[0]
  isSelected: boolean
  onSelect: (voiceId: string) => void
  onPreview: (voiceId: string) => void
}

// Update the VoiceSelection component to include filtering
export function VoiceSelection({ adData, updateAdData, showModal, setShowModal, openModal }: VoiceSelectionProps) {
  const selectedVoice = voices.find((voice) => voice.id === adData.selectedVoiceId)
  const [activeTab, setActiveTab] = useState("premium")
  const [filters, setFilters] = useState({
    gender: "",
    language: "",
  })

  // Get unique languages and genders for filter options
  const languages = Array.from(new Set(voices.map((voice) => voice.language)))
  const genders = Array.from(new Set(voices.map((voice) => voice.gender)))

  const handleSelectVoice = (voiceId: string) => {
    updateAdData({ selectedVoiceId: voiceId })
    setShowModal(false)
  }

  const handlePreviewVoice = (voiceId: string) => {
    // In a real implementation, this would play a sample of the voice
    console.log(`Previewing voice: ${voiceId}`)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleFilterChange = (filterType: "gender" | "language", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      gender: "",
      language: "",
    })
  }

  // Filter voices based on active tab and filters
  const filteredVoices = voices.filter((voice) => {
    // Filter by tab
    if (activeTab === "premium" && !voice.isPremium) return false
    if (activeTab === "new" && !voice.isNew) return false
    if (activeTab === "bookmarked") return false // No bookmarked voices in this example
    if (activeTab === "custom") return false // No custom voices in this example

    // Filter by gender
    if (filters.gender && voice.gender !== filters.gender) return false

    // Filter by language
    if (filters.language && voice.language !== filters.language) return false

    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Voice Selection</h2>
        <p className="text-gray-500">Choose the perfect voice for your audio advertisement</p>
      </div>

      {selectedVoice ? (
        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-4">
          <div className="bg-blue-100 rounded-full p-3 text-blue-600">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-blue-900">{selectedVoice.name}</h3>
              {selectedVoice.isNew && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  New
                </Badge>
              )}
              {selectedVoice.isPremium && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-sm text-blue-700 mb-1">
              {selectedVoice.gender} • {selectedVoice.accent} • {selectedVoice.language}
            </p>
            <p className="text-sm text-blue-600">{selectedVoice.description}</p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-blue-600"
                onClick={() => handlePreviewVoice(selectedVoice.id)}
              >
                <Play className="mr-1 h-3 w-3" /> Preview
              </Button>
              <Button size="sm" variant="outline" className="text-blue-600" onClick={openModal}>
                Change Voice
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-8 text-center">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Voice Selected</h3>
          <p className="text-gray-500 mb-4">Choose a voice for your audio advertisement</p>
          <Button onClick={openModal}>Select a Voice</Button>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select a Voice</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="premium" className="flex-1 flex flex-col" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="premium">Premium Voices</TabsTrigger>
              <TabsTrigger value="new">New Voices</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="custom">Custom Voice</TabsTrigger>
            </TabsList>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 p-4 border-b">
              <div className="flex items-center gap-1">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              {/* Gender Filter */}
              <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
                <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Language Filter */}
              <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
                <SelectTrigger className="h-8 w-auto min-w-[120px] text-xs">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-1 ml-1">
                {filters.gender && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700">
                    Gender: {filters.gender}
                    <button onClick={() => handleFilterChange("gender", "")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.language && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700">
                    Language: {filters.language}
                    <button onClick={() => handleFilterChange("language", "")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>

              {/* Clear Filters */}
              {(filters.gender || filters.language) && (
                <Button variant="ghost" size="sm" className="h-7 px-2 ml-auto text-xs" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="premium" className="h-full mt-0 border-0 p-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-2">
                    {filteredVoices.length > 0 ? (
                      filteredVoices.map((voice) => (
                        <VoiceItem
                          key={voice.id}
                          voice={voice}
                          isSelected={voice.id === adData.selectedVoiceId}
                          onSelect={handleSelectVoice}
                          onPreview={handlePreviewVoice}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No voices match your current filters.</p>
                        <Button variant="link" onClick={clearFilters} className="mt-2">
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="new" className="h-full mt-0 border-0 p-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-2">
                    {filteredVoices.length > 0 ? (
                      filteredVoices.map((voice) => (
                        <VoiceItem
                          key={voice.id}
                          voice={voice}
                          isSelected={voice.id === adData.selectedVoiceId}
                          onSelect={handleSelectVoice}
                          onPreview={handlePreviewVoice}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No voices match your current filters.</p>
                        <Button variant="link" onClick={clearFilters} className="mt-2">
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="bookmarked" className="h-full mt-0 border-0 p-0">
                <div className="h-full flex items-center justify-center p-4 text-center">
                  <div>
                    <p className="text-gray-500 mb-2">You haven't bookmarked any voices yet.</p>
                    <p className="text-sm text-gray-400">Bookmark your favorite voices for quick access.</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="h-full mt-0 border-0 p-0">
                <div className="h-full flex items-center justify-center p-4 text-center">
                  <div>
                    <p className="text-gray-500 mb-2">Custom voice creation is available on Enterprise plans.</p>
                    <Button variant="outline" size="sm">
                      Upgrade to Enterprise
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Update the VoiceItem component to display language
function VoiceItem({ voice, isSelected, onSelect, onPreview }: VoiceItemProps) {
  return (
    <div
      className={`
        p-4 rounded-lg border transition-all cursor-pointer
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{voice.name}</h3>
            {voice.isNew && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                New
              </Badge>
            )}
            {voice.isPremium && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                Premium
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-1">
            {voice.gender} • {voice.accent} • {voice.language}
          </p>
          <p className="text-sm text-gray-600">{voice.description}</p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onPreview(voice.id)}>
            <Play className="mr-1 h-3 w-3" /> Preview
          </Button>
          <Button size="sm" onClick={() => onSelect(voice.id)}>
            Select
          </Button>
        </div>
      </div>
    </div>
  )
}
