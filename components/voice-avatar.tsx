import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VoiceAvatarProps {
  voiceId: string
  size?: "sm" | "md" | "lg"
}

export function VoiceAvatar({ voiceId, size = "md" }: VoiceAvatarProps) {
  // Map voice IDs to avatar images
  const avatarMap: Record<string, string> = {
    voice1: "/placeholder.svg?height=40&width=40",
    voice2: "/placeholder.svg?height=40&width=40",
    voice3: "/placeholder.svg?height=40&width=40",
    voice4: "/placeholder.svg?height=40&width=40",
    voice5: "/placeholder.svg?height=40&width=40",
    voice6: "/placeholder.svg?height=40&width=40",
  }

  // Map voice IDs to initials
  const initialsMap: Record<string, string> = {
    voice1: "M",
    voice2: "S",
    voice3: "J",
    voice4: "E",
    voice5: "D",
    voice6: "S",
  }

  // Map size to dimensions
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  return (
    <Avatar className={sizeMap[size]}>
      <AvatarImage src={avatarMap[voiceId] || "/placeholder.svg"} alt="Voice avatar" />
      <AvatarFallback className="bg-blue-100 text-blue-800">
        {size === "lg" ? initialsMap[voiceId] : <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  )
}
