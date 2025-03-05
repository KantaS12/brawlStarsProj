"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import PlayerProfile from "@/components/player-profile"

export default function Home() {
  const [playerId, setPlayerId] = useState("")
  const [playerData, setPlayerData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchPlayerData = async () => {
    if (!playerId.trim()) {
      setError("Please enter a player ID")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Format the player ID by removing # if present
      const formattedId = playerId.startsWith("#") ? playerId.substring(1) : playerId

      // Replace this URL with your actual backend endpoint
      const response = await fetch(`https://api.brawlstars.com/v1/players/%23{normalized_tag}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setPlayerData(data)
    } catch (err) {
      setError("Failed to fetch player data. Please check the ID and try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white p-4">
      <div className="max-w-5xl w-full space-y-8 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-purple-400">Brawl Stars Profile Lookup</h1>
          <p className="text-gray-400">Enter a player tag to view their profile</p>
        </div>

        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="Enter player ID (e.g. #2Y0J2GU9P)"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white"
          />
          <Button onClick={fetchPlayerData} className="bg-purple-600 hover:bg-purple-700" disabled={loading}>
            {loading ? "Loading..." : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mt-8">
          {loading ? (
            <PlayerSkeleton />
          ) : playerData ? (
            <PlayerProfile player={playerData} />
          ) : (
            <div className="text-center p-8 border border-gray-800 rounded-lg bg-gray-900">
              <p>No player data to display. Search for a player to get started.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function PlayerSkeleton() {
  return (
    <div className="border border-gray-800 rounded-lg p-6 bg-gray-900">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <div className="mt-6">
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  )
}

