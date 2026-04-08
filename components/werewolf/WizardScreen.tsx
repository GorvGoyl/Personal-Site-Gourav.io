import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { isWolf, getPlayerName, getRoleDisplayName } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function WizardScreen({ state, dispatch }: Props) {
  const [saveChoice, setSaveChoice] = useState<string | null | "none">(null)
  const [killTarget, setKillTarget] = useState<string | null>(null)
  const [wantsToKill, setWantsToKill] = useState(false)

  const wizard = state.players.find((p) => p.role === "wizard")
  const wizardIsAlive = wizard?.isAlive ?? false
  const wizardWasJustKilled =
    wizard && state.currentNightEvent.wolfTarget === wizard.id

  const wolfTarget = state.currentNightEvent.wolfTarget
  const courtesanGuest = state.currentNightEvent.courtesanGuest
  const courtesan = state.players.find((p) => p.role === "courtesan" && p.isAlive)

  // Determine who is in danger
  const inDanger: Array<{ id: string; name: string; reason: string }> = []

  if (wolfTarget) {
    const target = state.players.find((p) => p.id === wolfTarget)
    // Baby wolf doesn't die from wolf attack (they transform), so not in danger
    if (target && target.role !== "baby_wolf") {
      inDanger.push({ id: target.id, name: target.name, reason: "Attacked by wolves" })
    }
  }

  // Courtesan in danger if she visited a wolf
  if (courtesan && courtesanGuest) {
    const guest = state.players.find((p) => p.id === courtesanGuest)
    if (guest && isWolf(guest.role)) {
      inDanger.push({ id: courtesan.id, name: courtesan.name, reason: "Invited a wolf" })
    }
  }

  // Guest in danger if wolves attacked the Courtesan (only if guest is not a wolf)
  if (courtesan && wolfTarget === courtesan.id && courtesanGuest) {
    const guest = state.players.find((p) => p.id === courtesanGuest)
    if (guest && !isWolf(guest.role)) {
      inDanger.push({ id: guest.id, name: guest.name, reason: "Was at the Courtesan's when she was attacked" })
    }
  }

  const wizardCanAct = wizardIsAlive || wizardWasJustKilled
  const canSave = !state.wizardSavePotionUsed && wizardCanAct
  const canKill = !state.wizardKillPotionUsed && wizardCanAct

  const alivePlayers = state.players.filter(
    (p) => p.isAlive && p.id !== wizard?.id,
  )

  function handleConfirm() {
    const saveId = saveChoice === "none" ? null : saveChoice
    dispatch({ type: "SET_WIZARD_SAVE", playerId: saveId })
    dispatch({ type: "SET_WIZARD_KILL", playerId: wantsToKill ? killTarget : null })
    dispatch({ type: "SKIP_TO_NEXT_PHASE" })
  }

  function handleSkip() {
    dispatch({ type: "SKIP_TO_NEXT_PHASE" })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Night {state.currentNight}
        </div>
        <div className="mt-1 text-xl font-bold">🧙 {getRoleDisplayName("wizard", state.roleNames)}</div>
        <div className="mt-1 text-sm text-gray-400">
          &quot;{getRoleDisplayName("wizard", state.roleNames)}, open your eyes&quot;
        </div>
        {!wizardCanAct && (
          <div className="mt-2 text-sm text-gray-500">{getRoleDisplayName("wizard", state.roleNames)} is dead — pretend to wait, then continue</div>
        )}
        {wizardCanAct && (
          <>
            <div className="mt-1 text-sm text-gray-400">
              &quot;This person died tonight. Do you want to save them?&quot;
            </div>
            <div className="mt-1 text-sm text-gray-400">
              &quot;Do you want to kill anyone?&quot;
            </div>
          </>
        )}
      </div>

      {wizardCanAct && (
        <>
          {/* Who is in danger */}
          {inDanger.length > 0 && (
            <div className="mx-3 mb-4 space-y-2">
              {inDanger.map((d, i) => (
                <div
                  key={`${d.id}-${i}`}
                  className="rounded-lg bg-[#e94560]/15 px-3.5 py-3 text-center"
                >
                  <div className="text-sm font-semibold text-[#e94560]">
                    {d.name} — {d.reason}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save potion */}
          <div className="mx-3 mb-3 rounded-lg bg-[#1a1a2e] p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[#2ecc71]">💚 Save Potion</div>
                {canSave ? (
                  <div className="mt-0.5 text-[11px] text-[#2ecc71]">✓ Available</div>
                ) : (
                  <div className="mt-0.5 text-[11px] text-gray-500">✗ Already used</div>
                )}
              </div>
            </div>
            {canSave && inDanger.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {inDanger.map((d, i) => (
                  <button
                    key={`${d.id}-${i}`}
                    type="button"
                    onClick={() => setSaveChoice(saveChoice === d.id ? "none" : d.id)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                      saveChoice === d.id
                        ? "border border-[#2ecc71] bg-[#1e3a2f] text-[#2ecc71]"
                        : "border border-gray-700 bg-[#2a2a3e] text-gray-300"
                    }`}
                  >
                    Save {d.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSaveChoice("none")}
                  className={`rounded-lg px-3 py-2 text-xs ${
                    saveChoice === "none"
                      ? "border border-gray-500 bg-[#2a2a3e] text-white"
                      : "border border-gray-700 bg-[#2a2a3e] text-gray-500"
                  }`}
                >
                  Don&apos;t save
                </button>
              </div>
            )}
            {canSave && inDanger.length === 0 && (
              <div className="mt-2 text-xs text-gray-500">No one to save tonight</div>
            )}
          </div>

          {/* Kill potion */}
          <div className="mx-3 mb-4 rounded-lg bg-[#1a1a2e] p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[#e94560]">💀 Kill Potion</div>
                {canKill ? (
                  <div className="mt-0.5 text-[11px] text-[#e94560]">✓ Available</div>
                ) : (
                  <div className="mt-0.5 text-[11px] text-gray-500">✗ Already used</div>
                )}
              </div>
              {canKill && (
                <button
                  type="button"
                  onClick={() => {
                    setWantsToKill(!wantsToKill)
                    if (wantsToKill) setKillTarget(null)
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    wantsToKill
                      ? "border border-[#e94560] bg-[#3a1a1f] text-[#e94560]"
                      : "border border-gray-700 bg-[#2a2a3e] text-gray-400"
                  }`}
                >
                  {wantsToKill ? "Cancel kill" : "Use kill"}
                </button>
              )}
            </div>
            {canKill && wantsToKill && (
              <div className="mt-3">
                <div className="mb-2 text-xs text-gray-400">Who to kill?</div>
                <PlayerGrid
                  players={alivePlayers}
                  selectedIds={killTarget ? [killTarget] : []}
                  onSelect={(id) => setKillTarget(id)}
                  showDead={false}
                />
              </div>
            )}
          </div>
        </>
      )}

      <div className="px-3">
        {wizardCanAct ? (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-xl bg-[#7b68ee] py-3.5 text-center text-sm font-bold text-white active:bg-[#6a5acd]"
          >
            Confirm
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSkip}
            className="w-full rounded-xl bg-gray-700 py-3.5 text-center text-sm font-bold text-gray-300 active:bg-gray-600"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
