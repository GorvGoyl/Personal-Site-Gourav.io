import { useState } from 'react';

type TimerDisplayProps = {
    remainingSeconds: number;
    totalSeconds: number;
    isRunning: boolean;
    isEditing: boolean;
    reminderOffsetSeconds: number | null;
    onStartEditing: () => void;
    onSaveEdit: (minutes: number, seconds: number) => void;
    onCancelEdit: () => void;
};

export function TimerDisplay(props: TimerDisplayProps) {
    const minutes = Math.floor(props.remainingSeconds / 60);
    const seconds = props.remainingSeconds % 60;

    if (props.isEditing) {
        return (
            <EditMode
                minutes={minutes}
                seconds={seconds}
                onSave={props.onSaveEdit}
                onCancel={props.onCancelEdit}
            />
        );
    }

    const isFinished = props.remainingSeconds === 0 && props.totalSeconds > 0;
    const isInReminderZone =
        props.reminderOffsetSeconds !== null &&
        props.remainingSeconds > 0 &&
        props.remainingSeconds <= props.reminderOffsetSeconds;

    let colorClass = 'text-slate-800';
    if (isFinished) {
        colorClass = 'text-red-600';
    } else if (isInReminderZone) {
        colorClass = 'text-amber-600';
    }

    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    const canEdit = !props.isRunning;
    const partClass = `transition-colors duration-300 ${canEdit ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`;

    return (
        <div className="flex flex-col items-center select-none">
            <div className={`font-mono font-bold leading-none tracking-tight ${colorClass} text-[28vw] sm:text-[12rem]`}>
                <button
                    type="button"
                    disabled={!canEdit}
                    onClick={props.onStartEditing}
                    className={partClass}
                >
                    {displayMinutes}
                </button>
                <span>:</span>
                <button
                    type="button"
                    disabled={!canEdit}
                    onClick={props.onStartEditing}
                    className={partClass}
                >
                    {displaySeconds}
                </button>
            </div>
            {canEdit && !isFinished && (
                <p className="text-slate-400 text-sm mt-1">tap to edit</p>
            )}
        </div>
    );
}

type EditModeProps = {
    minutes: number;
    seconds: number;
    onSave: (minutes: number, seconds: number) => void;
    onCancel: () => void;
};

function EditMode(props: EditModeProps) {
    const [editMin, setEditMin] = useState(props.minutes);
    const [editSec, setEditSec] = useState(props.seconds);

    function save() {
        const m = Math.max(0, Math.min(99, editMin));
        const s = Math.max(0, Math.min(59, editSec));
        if (m === 0 && s === 0) {
            props.onCancel();
            return;
        }
        props.onSave(m, s);
    }

    const stepBtnClass =
        'text-[8vw] sm:text-5xl text-slate-400 hover:text-slate-700 active:scale-90 transition-colors px-4 py-1 select-none';

    return (
        <>
            {/* Backdrop: clicking outside the edit area saves and closes */}
            <div className="fixed inset-0 z-10" onClick={save} />
            <div className="relative z-20 flex items-center gap-4 font-mono font-bold text-[28vw] sm:text-[12rem] leading-none text-slate-800">
                <div className="flex flex-col items-center">
                    <button type="button" onClick={() => setEditMin((v) => Math.min(99, v + 1))} className={stepBtnClass} aria-label="Increase minutes">
                        +
                    </button>
                    <span className="w-[30vw] sm:w-[10rem] text-center">{String(editMin).padStart(2, '0')}</span>
                    <button type="button" onClick={() => setEditMin((v) => Math.max(0, v - 1))} className={stepBtnClass} aria-label="Decrease minutes">
                        -
                    </button>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                    <button type="button" onClick={() => setEditSec((v) => Math.min(59, v + 1))} className={stepBtnClass} aria-label="Increase seconds">
                        +
                    </button>
                    <span className="w-[30vw] sm:w-[10rem] text-center">{String(editSec).padStart(2, '0')}</span>
                    <button type="button" onClick={() => setEditSec((v) => Math.max(0, v - 1))} className={stepBtnClass} aria-label="Decrease seconds">
                        -
                    </button>
                </div>
            </div>
        </>
    );
}
