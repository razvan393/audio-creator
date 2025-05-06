"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Play, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AdData } from "../audio-ad-creator"

interface BackgroundTrackSelectionProps {
  adData: AdData
  updateAdData: (data: Partial<AdData>) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
  openModal: () => void
}

// Sample track data
const tracks = [
  {
    id: "track1",
    name: "Corporate Success",
    description: "Uplifting corporate track with modern elements",
    duration: 120,
    tags: ["Corporate", "Uplifting", "Professional"],
    isPremium: true,
  },
  {
    id: "track2",
    name: "Inspiring Journey",
    description: "Emotional piano-driven composition with strings",
    duration: 90,
    tags: ["Emotional", "Inspiring", "Cinematic"],
    isPremium: true,
  },
  {
    id: "track3",
    name: "Tech Innovation",
    description: "Modern electronic track with a forward-thinking feel",
    duration: 60,
    tags: ["Technology", "Modern", "Dynamic"],
    isPremium: true,
  },
  {
    id: "track4",
    name: "Gentle Acoustic",
    description: "Warm acoustic guitar with subtle percussion",
    duration: 180,
    tags: ["Acoustic", "Warm", "Relaxed"],
    isPremium: false,
  },
  {
    id: "track5",
    name: "Urban Energy",
    description: "Upbeat urban track with contemporary rhythm",
    duration: 75,
    tags: ["Urban", "Energetic", "Contemporary"],
    isPremium: false,
  },
]

export function BackgroundTrackSelection({
  adData,
  updateAdData,
  showModal,
  setShowModal,
  openModal,
}: BackgroundTrackSelectionProps) {
  const selectedTrack = tracks.find((track) => track.id === adData.selectedTrackId)

  const handleSelectTrack = (trackId: string) => {
    updateAdData({ selectedTrackId: trackId })
    setShowModal(false)
  }

  const handlePreviewTrack = (trackId: string) => {
    // In a real implementation, this would play a sample of the track
    console.log(`Previewing track: ${trackId}`)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Background Track Selection</h2>
        <p className="text-gray-500">Choose background music to enhance your audio advertisement</p>
      </div>

      {selectedTrack ? (
        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-4">
          <div className="bg-blue-100 rounded-full p-3 text-blue-600">
            <Music className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-blue-900">{selectedTrack.name}</h3>
              {selectedTrack.isPremium && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-sm text-blue-700 mb-1">
              {formatDuration(selectedTrack.duration)} • {selectedTrack.tags.join(", ")}
            </p>
            <p className="text-sm text-blue-600">{selectedTrack.description}</p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-blue-600"
                onClick={() => handlePreviewTrack(selectedTrack.id)}
              >
                <Play className="mr-1 h-3 w-3" /> Preview
              </Button>
              <Button size="sm" variant="outline" className="text-blue-600" onClick={openModal}>
                Change Track
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-8 text-center">
          <Music className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Background Track Selected</h3>
          <p className="text-gray-500 mb-4">Choose background music for your audio advertisement</p>
          <Button onClick={openModal}>Select a Track</Button>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Background Track</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="premium" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="premium">Premium Tracks</TabsTrigger>
              <TabsTrigger value="custom">Custom Tracks</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="premium" className="h-full mt-0 border-0 p-0">
                <div className="p-4 mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Helper tip:</span> Longer tracks are better for longer scripts
                  </p>
                </div>
                <ScrollArea className="h-[calc(100%-40px)]">
                  <div className="p-4 space-y-2">
                    {tracks
                      .filter((t) => t.isPremium)
                      .map((track) => (
                        <TrackItem
                          key={track.id}
                          track={track}
                          isSelected={track.id === adData.selectedTrackId}
                          onSelect={handleSelectTrack}
                          onPreview={handlePreviewTrack}
                          formatDuration={formatDuration}
                        />
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="custom" className="h-full mt-0 border-0 p-0">
                <div className="p-4 mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Helper tip:</span> Upload your own tracks in MP3 or WAV format
                  </p>
                </div>
                <div className="h-[calc(100%-40px)] flex flex-col items-center justify-center p-4 text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-md">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Custom Track</h3>
                    <p className="text-sm text-gray-500 mb-4">Drag and drop your audio file here, or click to browse</p>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" /> Browse Files
                    </Button>
                    <p className="text-xs text-gray-400 mt-4">Supports MP3, WAV up to 10MB</p>
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

interface TrackItemProps {
  track: (typeof tracks)[0]
  isSelected: boolean
  onSelect: (id: string) => void
  onPreview: (id: string) => void
  formatDuration: (seconds: number) => string
}

function TrackItem({ track, isSelected, onSelect, onPreview, formatDuration }: TrackItemProps) {
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
            <h3 className="font-medium">{track.name}</h3>
            {track.isPremium && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                Premium
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-1">{formatDuration(track.duration)}</p>
          <p className="text-sm text-gray-600">{track.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {track.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onPreview(track.id)}>
            <Play className="mr-1 h-3 w-3" /> Preview
          </Button>
          <Button size="sm" onClick={() => onSelect(track.id)}>
            Select
          </Button>
        </div>
      </div>
    </div>
  )
}
