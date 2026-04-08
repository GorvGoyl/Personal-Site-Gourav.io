import type { Player } from "./types"

type Props = {
  players: Player[]
  selectedIds: string[]
  onSelect: (id: string) => void
  multiSelect?: boolean
  disabledIds?: string[]
  showDead?: boolean
}

export function PlayerGrid({
  players,
  selectedIds,
  onSelect,
  multiSelect = false,
  disabledIds = [],
  showDead = true,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 px-3">
      {players.map((player) => {
        const isSelected = selectedIds.includes(player.id)
        const isDisabled = disabledIds.includes(player.id)
        const isDead = !player.isAlive

        if (isDead && !showDead) return null

        return (
          <button
            key={player.id}
            type="button"
            disabled={isDisabled || isDead}
            onClick={() => {
              if (isDead || isDisabled) return
              onSelect(player.id)
            }}
            className={`rounded-lg p-3 text-center text-sm font-medium transition-all ${
              isDead
                ? "border-2 border-transparent bg-[#1a1a2e] text-gray-600 line-through opacity-40"
                : isSelected
                  ? "border-2 border-[#7b68ee] bg-[#1a1a2e] text-white shadow-[0_0_10px_rgba(123,104,238,0.3)]"
                  : isDisabled
                    ? "border-2 border-transparent bg-[#1a1a2e] text-gray-600 opacity-50"
                    : "border-2 border-transparent bg-[#1a1a2e] text-white active:border-[#7b68ee]"
            }`}
          >
            {player.name}
            {isDead && " 💀"}
            {isSelected && " ✓"}
          </button>
        )
      })}
    </div>
  )
}
