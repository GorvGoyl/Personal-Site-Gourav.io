type RoleInfo = {
    emoji: string;
    name: string;
    team: 'village' | 'wolves' | 'special';
    summary: string;
    details: string[];
};

const ROLES: RoleInfo[] = [
    {
        emoji: '🐺',
        name: 'Wolf',
        team: 'wolves',
        summary: 'Each night, wolves wake up together and choose a villager to eliminate.',
        details: [
            "Wolves know each other's identities",
            'During the day, wolves pretend to be villagers',
            'Wolves win when they equal or outnumber non-wolf players',
        ],
    },
    {
        emoji: '👑🐺',
        name: 'Queen Wolf',
        team: 'wolves',
        summary: 'A powerful wolf who is invisible to the Seer.',
        details: [
            'Participates in wolf attacks like a regular wolf',
            'When checked by the Seer, appears as "not a wolf"',
            'If voted out, revealed as a wolf',
        ],
    },
    {
        emoji: '🐺👶',
        name: 'Baby Wolf',
        team: 'special',
        summary: 'Starts as a villager but transforms into a wolf if targeted by the pack.',
        details: [
            'Begins the game on the village team',
            'If wolves choose the Baby Wolf as their target, they survive and transform into a wolf the following night',
            'The Seer sees them as "not a wolf" until after they transform',
            'If voted out before transforming, revealed as "not a wolf"',
            'Courtesan protection blocks the attack — no transformation occurs',
        ],
    },
    {
        emoji: '👁️',
        name: 'Seer',
        team: 'village',
        summary: 'Each night, the Seer checks one player to learn if they are a wolf.',
        details: [
            'Regular wolves are revealed as "wolf"',
            'Queen Wolf appears as "not a wolf"',
            'Baby Wolf appears as "not a wolf" until after transformation',
        ],
    },
    {
        emoji: '🧙',
        name: 'Wizard',
        team: 'village',
        summary: 'Has two single-use potions: one to save a life, one to take a life.',
        details: [
            'Save potion: can rescue someone attacked by wolves that night',
            'Kill potion: can eliminate any player',
            'Each potion can only be used once per game',
            'If killed by wolves, can still use a potion that same night (last breath)',
        ],
    },
    {
        emoji: '🌹',
        name: 'Courtesan',
        team: 'village',
        summary: 'Each night, invites a player to stay over, protecting them from wolf attacks.',
        details: [
            "If wolves target the Courtesan's guest, the guest is protected — no one dies",
            'If the Courtesan visits a wolf, the Courtesan dies',
            'If wolves attack the Courtesan, both the Courtesan and their guest die (unless the guest is a wolf)',
            'Cannot invite the same player two nights in a row',
        ],
    },
    {
        emoji: '😇',
        name: 'Villager',
        team: 'village',
        summary: 'An ordinary villager with no special abilities.',
        details: [
            'Participates in daytime discussion and voting',
            'Must use logic and observation to identify wolves',
            'Villagers win when all wolves are eliminated',
        ],
    },
];

const TEAM_COLORS = {
    village: 'text-[#2ecc71]',
    wolves: 'text-[#e94560]',
    special: 'text-[#f39c12]',
};

const TEAM_LABELS = {
    village: 'Village',
    wolves: 'Wolf Pack',
    special: 'Wildcard',
};

type Props = {
    onClose: () => void;
};

export function RolesGuideScreen({ onClose }: Props) {
    return (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-[#0f0f1a]">
            <div className="mx-auto max-w-md px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="text-xl font-bold">Roles Guide</div>
                        <div className="mt-0.5 text-sm text-gray-400">Learn about each role</div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-400 active:text-white">
                        Close
                    </button>
                </div>

                {/* Win conditions */}
                <div className="mb-5 rounded-lg bg-[#1a1a2e] p-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Win Conditions
                    </div>
                    <div className="space-y-1.5 text-sm">
                        <div className="text-[#2ecc71]">😇 Village wins when all wolves are eliminated</div>
                        <div className="text-[#e94560]">
                            🐺 Wolves win when they equal or outnumber non-wolf players
                        </div>
                    </div>
                </div>

                {/* Roles */}
                <div className="space-y-3">
                    {ROLES.map((role) => (
                        <div
                            key={role.name}
                            className="rounded-lg bg-[#1a1a2e] p-4">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">{role.emoji}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-bold text-white">{role.name}</div>
                                        <div
                                            className={`text-[10px] font-semibold uppercase ${TEAM_COLORS[role.team]}`}>
                                            {TEAM_LABELS[role.team]}
                                        </div>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-300">{role.summary}</div>
                                    <ul className="mt-2 space-y-1">
                                        {role.details.map((detail, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-2 text-xs text-gray-400">
                                                <span className="mt-0.5 text-gray-600">•</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
