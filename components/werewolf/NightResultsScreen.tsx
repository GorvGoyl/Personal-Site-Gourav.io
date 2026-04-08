import type { GameState, GameAction } from "./types"
import { isWolf, getPlayerName } from "./types"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function NightResultsScreen({ state, dispatch }: Props) {
  const lastNight = state.nightEvents[state.nightEvents.length - 1]
  const deaths = lastNight?.deaths ?? []

  const alivePlayers = state.players.filter((p) => p.isAlive)
  const aliveWolves = alivePlayers.filter((p) => isWolf(p.role))
  const deadPlayers = state.players.filter((p) => !p.isAlive)

  function handleContinue() {
    dispatch({ type: "START_DAY" })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#f39c12]">
          Dawn
        </div>
        <div className="mt-1 text-xl font-bold">☀️ Night Results</div>
      </div>

      <div className="mx-3 mb-4 rounded-xl bg-[#e94560]/15 p-4 text-center">
        <div className="text-4xl font-extrabold text-[#e94560]">
          {deaths.length}
        </div>
        <div className="text-sm font-semibold text-[#e94560]">
          {deaths.length === 0
            ? "No one died tonight"
            : deaths.length === 1
              ? "person died tonight"
              : "people died tonight"}
        </div>
      </div>

      {deaths.length > 0 && (
        <div className="mx-3 mb-4 space-y-2">
          {deaths.map((death) => (
            <div
              key={death.playerId}
              className="flex items-center gap-3 rounded-lg bg-[#1a1a2e] p-3.5"
            >
              <div className="text-2xl">💀</div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {getPlayerName(state.players, death.playerId)}
                </div>
                <div className="text-xs text-gray-400">{death.cause}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mx-3 mb-4 rounded-lg bg-[#1a1a2e] p-3">
        <div className="mb-2 text-center text-[10px] uppercase tracking-widest text-gray-500">Game totals</div>
        <div className="flex justify-around text-center">
          <div>
            <div className="text-xl font-bold text-[#2ecc71]">{alivePlayers.length}</div>
            <div className="text-[11px] text-gray-400">Alive</div>
          </div>
          <div className="w-px bg-gray-700" />
          <div>
            <div className="text-xl font-bold text-[#e94560]">{deadPlayers.length}</div>
            <div className="text-[11px] text-gray-400">Dead</div>
          </div>
          <div className="w-px bg-gray-700" />
          <div>
            <div className="text-xl font-bold text-[#f39c12]">{aliveWolves.length}</div>
            <div className="text-[11px] text-gray-400">Wolves left</div>
          </div>
        </div>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-xl bg-[#f39c12] py-3.5 text-center text-sm font-bold text-black active:bg-[#e08e0b]"
        >
          Continue to Day Vote →
        </button>
      </div>
    </div>
  )
}
