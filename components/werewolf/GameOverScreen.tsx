import type { GameState, GameAction } from "./types"
import { getPlayerName, ROLE_EMOJI, isWolf } from "./types"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
  winner: "village" | "wolves"
}

export function GameOverScreen({ state, dispatch, winner }: Props) {
  function handleNewGame() {
    dispatch({ type: "NEW_GAME" })
  }

  const totalRounds = state.nightEvents.length

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      {/* Winner banner */}
      <div
        className={`mb-6 rounded-xl p-6 text-center ${
          winner === "village"
            ? "bg-gradient-to-b from-[#2ecc71]/20 to-transparent"
            : "bg-gradient-to-b from-[#e94560]/20 to-transparent"
        }`}
      >
        <div className="text-3xl">{winner === "village" ? "🎉" : "🐺"}</div>
        <div
          className={`mt-1 text-2xl font-extrabold ${
            winner === "village" ? "text-[#2ecc71]" : "text-[#e94560]"
          }`}
        >
          {winner === "village" ? "Village Wins!" : "Wolves Win!"}
        </div>
        <div className="mt-1 text-sm text-gray-400">
          {winner === "village"
            ? "All wolves have been eliminated"
            : "Wolves have overtaken the village"}
          {" "}in {totalRounds} round{totalRounds !== 1 && "s"}
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-3 mb-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Timeline
        </div>

        {state.nightEvents.map((night) => {
          const dayEvents = state.dayEvents.filter((d) => d.day === night.night)
          return (
            <div key={night.night}>
              {/* Night entry */}
              <div className="flex gap-3 border-b border-[#1a1a2e] py-3">
                <div className="w-11 flex-shrink-0 text-center">
                  <div className="rounded-md bg-[#1a1a2e] px-2 py-1">
                    <div className="text-[10px] font-semibold text-[#7b68ee]">N{night.night}</div>
                    <div className="text-[9px] text-gray-400">🌙</div>
                  </div>
                </div>
                <div className="flex-1 text-xs leading-relaxed">
                  {night.night === 1 ? (
                    <>
                      <div className="text-gray-400">Roles discovered. No attacks.</div>
                      {night.seerChecked && (
                        <div className="text-[#7b68ee]">
                          👁️ Seer checked {getPlayerName(state.players, night.seerChecked)} →{" "}
                          {night.seerResult === "wolf" ? (
                            <span className="text-[#e94560]">Wolf!</span>
                          ) : (
                            "Not a wolf"
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {night.courtesanGuest && (
                        <div className="text-gray-400">
                          🌹 Courtesan invited {getPlayerName(state.players, night.courtesanGuest)}
                        </div>
                      )}
                      {night.wolfTarget && (
                        <div className="text-[#e94560]">
                          🐺 Wolves attacked {getPlayerName(state.players, night.wolfTarget)}
                          {night.deaths.some((d) => d.playerId === night.wolfTarget) ? (
                            " → 💀 Died"
                          ) : (
                            <span className="text-[#2ecc71]"> → Saved</span>
                          )}
                        </div>
                      )}
                      {night.wizardSaved && (
                        <div className="text-[#2ecc71]">
                          🧙 Wizard saved {getPlayerName(state.players, night.wizardSaved)}
                        </div>
                      )}
                      {night.wizardKilled && (
                        <div className="text-[#e94560]">
                          🧙 Wizard killed {getPlayerName(state.players, night.wizardKilled)}
                        </div>
                      )}
                      {night.seerChecked && (
                        <div className="text-[#7b68ee]">
                          👁️ Seer checked {getPlayerName(state.players, night.seerChecked)} →{" "}
                          {night.seerResult === "wolf" ? (
                            <span className="text-[#e94560]">Wolf!</span>
                          ) : (
                            "Not a wolf"
                          )}
                        </div>
                      )}
                      {night.deaths.length === 0 && (
                        <div className="text-[#2ecc71]">No deaths this night</div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Day entries */}
              {dayEvents.length > 0 && (
                <div className="flex gap-3 border-b border-[#1a1a2e] py-3">
                  <div className="w-11 flex-shrink-0 text-center">
                    <div className="rounded-md bg-[#1a1a2e] px-2 py-1">
                      <div className="text-[10px] font-semibold text-[#f39c12]">D{night.night}</div>
                      <div className="text-[9px] text-gray-400">☀️</div>
                    </div>
                  </div>
                  <div className="flex-1 text-xs leading-relaxed">
                    {dayEvents.map((dayEvent) => (
                      <div key={dayEvent.eliminated} className="text-[#e94560]">
                        🗳️ {getPlayerName(state.players, dayEvent.eliminated)} eliminated —{" "}
                        {dayEvent.revealedRole && isWolf(dayEvent.revealedRole) ? (
                          <span className="text-[#e94560]">
                            {dayEvent.revealedRole === "queen_wolf" ? "Queen Wolf 👑🐺" : "Wolf 🐺"}
                          </span>
                        ) : (
                          <span className="text-[#2ecc71]">
                            {dayEvent.revealedRole ? ROLE_EMOJI[dayEvent.revealedRole] : ""}{" "}
                            {dayEvent.revealedRole === "villager"
                              ? "Villager"
                              : dayEvent.revealedRole
                                ? dayEvent.revealedRole.charAt(0).toUpperCase() + dayEvent.revealedRole.slice(1)
                                : ""}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Role reveal */}
      <div className="mx-3 mb-4 rounded-lg bg-[#1a1a2e] p-3">
        <div className="mb-2 text-[11px] uppercase tracking-widest text-gray-400">
          Role Reveal
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {state.players.map((p) => (
            <div key={p.id} className="py-1 text-gray-300">
              {p.role ? ROLE_EMOJI[p.role] : ""} {p.name}
              <span className="text-gray-500">
                {" "}
                ({p.role === "queen_wolf"
                  ? "Queen Wolf"
                  : p.role
                    ? p.role.charAt(0).toUpperCase() + p.role.slice(1)
                    : "?"})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={handleNewGame}
          className="w-full rounded-xl bg-[#7b68ee] py-3.5 text-center text-sm font-bold text-white active:bg-[#6a5acd]"
        >
          New Game
        </button>
      </div>
    </div>
  )
}
