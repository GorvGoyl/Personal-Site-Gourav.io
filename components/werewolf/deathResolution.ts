import type { Player, NightEvent } from "./types"
import { isWolf } from "./types"

type DeathResult = { playerId: string; cause: string }

export function resolveDeaths(
  players: Player[],
  nightEvent: Partial<NightEvent>,
  wizardSavedId: string | null,
): DeathResult[] {
  const deaths: DeathResult[] = []
  const { courtesanGuest, wolfTarget } = nightEvent

  const courtesan = players.find((p) => p.role === "courtesan" && p.isAlive)
  const courtesanId = courtesan?.id ?? null

  // Track who the wizard saves — we'll filter at the end
  const savedId = wizardSavedId

  // --- Courtesan visiting a wolf ---
  if (courtesanGuest && courtesanId) {
    const guest = players.find((p) => p.id === courtesanGuest)
    if (guest && isWolf(guest.role)) {
      deaths.push({ playerId: courtesanId, cause: "Invited a wolf" })
    }
  }

  // --- Wolf attack scenarios (mutually exclusive) ---
  if (wolfTarget) {
    if (wolfTarget === courtesanGuest && courtesanId) {
      // Scenario A: Wolves attacked the Courtesan's guest → no one dies from wolf attack
      // (guest is protected at Courtesan's house)
    } else if (wolfTarget === courtesanId && courtesanId) {
      // Scenario B: Wolves attacked the Courtesan → both Courtesan and guest die
      // (but guest only dies if they're not a wolf — wolves don't kill their own)
      if (!deaths.some((d) => d.playerId === courtesanId)) {
        deaths.push({ playerId: courtesanId, cause: "Attacked by wolves" })
      }
      if (courtesanGuest) {
        const guest = players.find((p) => p.id === courtesanGuest)
        if (guest && !isWolf(guest.role)) {
          deaths.push({ playerId: courtesanGuest, cause: "Was at the Courtesan's when she was attacked" })
        }
      }
    } else {
      // Scenario C: Normal attack
      deaths.push({ playerId: wolfTarget, cause: "Attacked by wolves" })
    }
  }

  // --- Wizard kill potion ---
  if (nightEvent.wizardKilled) {
    deaths.push({ playerId: nightEvent.wizardKilled, cause: "Killed by the Wizard" })
  }

  // --- Apply wizard save (remove saved player from deaths) ---
  if (savedId) {
    const idx = deaths.findIndex((d) => d.playerId === savedId)
    if (idx !== -1) {
      deaths.splice(idx, 1)
    }
  }

  // Deduplicate (a player can only die once)
  const seen = new Set<string>()
  return deaths.filter((d) => {
    if (seen.has(d.playerId)) return false
    seen.add(d.playerId)
    return true
  })
}
