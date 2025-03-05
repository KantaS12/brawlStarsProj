import React from "react"
import { Trophy, Star, Zap, Swords, Users, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Define Player Interface for Type Safety
interface Player {
  name: string
  tag: string
  trophies?: number
  expLevel?: number
  expPoints?: number
  victories?: number
  soloVictories?: number
  duoVictories?: number
  club?: {
    name: string
  }
  brawlers?: Array<{
    name?: string
    trophies?: number
    power?: number
  }>
  battleLog?: Array<{
    event?: {
      mode?: string
      map?: string
    }
    battle?: {
      result?: "victory" | "defeat"
    }
  }>
  icon?: {
    id?: string
  }
}

interface PlayerProfileProps {
  player: Player
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
  if (!player) return null

  // Default Values for Missing Data
  const brawlers = player.brawlers || []
  const battleLog = player.battleLog || []

  return (
    <div className="space-y-6">
      {/* Player Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-purple-900 flex items-center justify-center overflow-hidden border-4 border-purple-600">
            {player.icon?.id ? (
              <img
                src={`https://example.com/icons/${player.icon.id}.png`} // Replace with actual image URL
                alt="Player Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <Star className="w-12 h-12 text-yellow-400" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-1">
            <Trophy className="w-5 h-5 text-yellow-300" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{player.name}</h2>
            <span className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300 inline-flex items-center">
              #{player.tag?.replace("#", "")}
            </span>
          </div>

          <div className="mt-2 text-gray-400 text-sm">
            {player.club?.name ? (
              <div className="flex items-center justify-center md:justify-start gap-1">
                <Users className="w-4 h-4" />
                <span>Club: {player.club.name}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center md:justify-start gap-1">
                <Users className="w-4 h-4" />
                <span>No Club</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
            <Badge icon={<Trophy />} value={player.trophies || 0} label="Trophies" color="yellow" />
            <Badge icon={<Star />} value={player.expLevel || 0} label="Level" color="blue" />
            <Badge icon={<Zap />} value={player.expPoints || 0} label="XP" color="green" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Victories"
          value={player.victories || 0}
          icon={<Trophy className="h-5 w-5 text-yellow-400" />}
          color="from-yellow-900 to-yellow-800"
        />
        <StatCard
          title="Solo Victories"
          value={player.soloVictories || 0}
          icon={<Award className="h-5 w-5 text-purple-400" />}
          color="from-purple-900 to-purple-800"
        />
        <StatCard
          title="Duo Victories"
          value={player.duoVictories || 0}
          icon={<Users className="h-5 w-5 text-blue-400" />}
          color="from-blue-900 to-blue-800"
        />
      </div>

      {/* Brawlers Section */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Swords className="h-5 w-5 text-red-400" />
            Brawlers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {brawlers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {brawlers.slice(0, 6).map((brawler, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center">
                      <img
                        src={`https://example.com/brawlers/${brawler.name?.toLowerCase()}.png`} // Replace with actual image URL
                        alt={brawler.name || `Brawler ${index}`}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{brawler.name || `Brawler ${index + 1}`}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <Trophy className="w-3 h-3 text-yellow-400" />
                        <span>{brawler.trophies || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Power</span>
                      <span>Level {brawler.power || 1}</span>
                    </div>
                    <Progress value={((brawler.power || 1) / 10) * 100} className="h-2 bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-gray-400">No brawlers data available</div>
          )}

          {brawlers.length > 6 && (
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
                View All {brawlers.length} Brawlers
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Battle Log Section */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Swords className="h-5 w-5 text-red-400" />
            Recent Battles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {battleLog.length > 0 ? (
            <div className="space-y-3">
              {battleLog.slice(0, 3).map((battle, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-white">{battle.event?.mode || "Battle"}</h3>
                      <p className="text-sm text-gray-400">{battle.event?.map || "Unknown Map"}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm ${
                        battle.battle?.result === "victory" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                      }`}
                    >
                      {battle.battle?.result === "victory" ? "Victory" : "Defeat"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-gray-400">No recent battle data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Badge Component
function Badge({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: string }) {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      yellow: "bg-yellow-900 text-yellow-300 border-yellow-700",
      blue: "bg-blue-900 text-blue-300 border-blue-700",
      green: "bg-green-900 text-green-300 border-green-700",
      red: "bg-red-900 text-red-300 border-red-700",
      purple: "bg-purple-900 text-purple-300 border-purple-700",
    }
    return colorMap[color] || colorMap.yellow
  }

  return (
    <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${getColorClass(color)}`}>
      {icon}
      <span className="font-bold">{value}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  )
}

// StatCard Component
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <Card className={`bg-gradient-to-br ${color} border-gray-700`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-300">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-black/20 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Button Component
function Button({
  children,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "outline"
  className?: string
  [key: string]: any
}) {
  const baseClass = "px-4 py-2 rounded-md font-medium transition-colors"
  const variantClasses = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "bg-transparent border border-current",
  }

  return (
    <button
      className={`${baseClass} ${variantClasses[variant]} ${className || ""}`}
      {...props}
      aria-label={props["aria-label"] || "Button"}
    >
      {children}
    </button>
  )
}