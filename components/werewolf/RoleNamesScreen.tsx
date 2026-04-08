import { useState } from "react"
import type { GameAction, GameState, Role } from "./types"
import { DEFAULT_ROLE_NAMES, ROLE_EMOJI } from "./types"

const EDITABLE_ROLES: Role[] = [
  "wolf",
  "queen_wolf",
  "baby_wolf",
  "seer",
  "wizard",
  "courtesan",
  "villager",
]

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
  onClose: () => void
}

export function RoleNamesScreen({ state, dispatch, onClose }: Props) {
  const [draft, setDraft] = useState<Partial<Record<Role, string>>>({ ...state.roleNames })

  function handleSave() {
    // Only keep non-empty overrides that differ from defaults
    const cleaned: Partial<Record<Role, string>> = {}
    for (const role of EDITABLE_ROLES) {
      const val = draft[role]?.trim()
      if (val && val !== DEFAULT_ROLE_NAMES[role]) {
        cleaned[role] = val
      }
    }
    dispatch({ type: "SET_ROLE_NAMES", roleNames: cleaned })
    onClose()
  }

  function handleReset() {
    setDraft({})
  }

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-[#0f0f1a]">
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">Role Names</div>
            <div className="mt-0.5 text-sm text-gray-400">Customize names for your cards</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-400 active:text-white"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-2.5">
          {EDITABLE_ROLES.map((role) => (
            <div key={role} className="rounded-lg bg-[#1a1a2e] px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">{ROLE_EMOJI[role]}</span>
                <span className="text-xs text-gray-500">{DEFAULT_ROLE_NAMES[role]}</span>
              </div>
              <input
                type="text"
                value={draft[role] ?? ""}
                placeholder={DEFAULT_ROLE_NAMES[role]}
                onChange={(e) => setDraft((prev) => ({ ...prev, [role]: e.target.value }))}
                className="w-full rounded-md border border-gray-700 bg-[#0f0f1a] px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#7b68ee]"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2 px-1">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-gray-400 active:bg-[#1a1a2e]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-xl bg-[#7b68ee] py-3 text-center text-sm font-bold text-white active:bg-[#6a5acd]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
