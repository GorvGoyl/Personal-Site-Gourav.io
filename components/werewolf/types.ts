export type Role = "courtesan" | "queen_wolf" | "wolf" | "wizard" | "seer" | "villager"

export type Player = {
  id: string
  name: string
  role: Role | null
  isAlive: boolean
}

export type NightEvent = {
  night: number
  courtesanGuest: string | null
  wolfTarget: string | null
  wizardSaved: string | null
  wizardKilled: string | null
  seerChecked: string | null
  seerResult: "wolf" | "not_wolf" | null
  deaths: Array<{ playerId: string; cause: string }>
}

export type DayEvent = {
  day: number
  eliminated: string | null
  revealedRole: Role | null
}

export type GamePhase =
  | { type: "setup" }
  | { type: "night_role_discovery"; step: number }
  | { type: "night_courtesan" }
  | { type: "night_wolves" }
  | { type: "night_wizard" }
  | { type: "night_seer" }
  | { type: "night_results" }
  | { type: "day_vote" }
  | { type: "game_over"; winner: "village" | "wolves" }

export type GameState = {
  players: Player[]
  currentPhase: GamePhase
  currentNight: number
  currentDay: number
  nightEvents: NightEvent[]
  dayEvents: DayEvent[]
  wizardSavePotionUsed: boolean
  wizardKillPotionUsed: boolean
  lastCourtesanGuest: string | null
  currentNightEvent: Partial<NightEvent>
}

export type GameAction =
  | { type: "ADD_PLAYER"; name: string }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START_NIGHT_1" }
  | { type: "ASSIGN_ROLE"; playerId: string; role: Role }
  | { type: "ASSIGN_WOLVES"; playerIds: string[] }
  | { type: "ADVANCE_ROLE_DISCOVERY" }
  | { type: "SET_COURTESAN_GUEST"; playerId: string }
  | { type: "SET_WOLF_TARGET"; playerId: string }
  | { type: "SET_WIZARD_SAVE"; playerId: string | null }
  | { type: "SET_WIZARD_KILL"; playerId: string | null }
  | { type: "SET_SEER_CHECK"; playerId: string }
  | { type: "RESOLVE_NIGHT" }
  | { type: "START_DAY" }
  | { type: "ELIMINATE_PLAYER"; playerId: string }
  | { type: "START_NEXT_NIGHT" }
  | { type: "SKIP_TO_NEXT_PHASE" }
  | { type: "NEW_GAME" }
  | { type: "RESTART_SAME_PLAYERS" }
  | { type: "RESTORE_STATE"; state: GameState }

export const ROLE_DISCOVERY_STEPS = [
  { role: "courtesan" as Role, label: "Courtesan", emoji: "🌹", instruction: '"Courtesan, open your eyes"', multiSelect: false },
  { role: "queen_wolf" as Role, label: "Queen Wolf", emoji: "👑🐺", instruction: '"Queen Wolf, open your eyes"', multiSelect: false },
  { role: "wolf" as Role, label: "Wolves", emoji: "🐺", instruction: '"Wolves, open your eyes"', multiSelect: true },
  { role: "wizard" as Role, label: "Wizard", emoji: "🧙", instruction: '"Wizard, open your eyes"', multiSelect: false },
  { role: "seer" as Role, label: "Seer", emoji: "👁️", instruction: '"Seer, open your eyes"', multiSelect: false },
] as const

export const ROLE_EMOJI: Record<Role, string> = {
  courtesan: "🌹",
  queen_wolf: "👑🐺",
  wolf: "🐺",
  wizard: "🧙",
  seer: "👁️",
  villager: "😇",
}

export function isWolf(role: Role | null): boolean {
  return role === "wolf" || role === "queen_wolf"
}

export function getPlayerName(players: Player[], id: string | null): string {
  if (!id) return ""
  return players.find((p) => p.id === id)?.name ?? ""
}
