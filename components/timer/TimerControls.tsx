type TimerControlsProps = {
    isRunning: boolean;
    isFinished: boolean;
    isIdle: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
};

const btnBase =
    'px-8 py-3 rounded-xl text-lg font-semibold transition-colors duration-200 active:scale-95';

export function TimerControls(props: TimerControlsProps) {
    return (
        <div className="flex gap-4 justify-center">
            <StartPauseButton
                isRunning={props.isRunning}
                isFinished={props.isFinished}
                onStart={props.onStart}
                onPause={props.onPause}
            />
            {!props.isIdle && (
                <button
                    type="button"
                    onClick={props.onReset}
                    className={`${btnBase} bg-slate-200 text-slate-700 hover:bg-slate-300`}
                >
                    Reset
                </button>
            )}
        </div>
    );
}

function StartPauseButton(props: {
    isRunning: boolean;
    isFinished: boolean;
    onStart: () => void;
    onPause: () => void;
}) {
    if (props.isRunning) {
        return (
            <button
                type="button"
                onClick={props.onPause}
                className={`${btnBase} bg-amber-500 text-white hover:bg-amber-600`}
            >
                Pause
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={props.onStart}
            className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700`}
        >
            {props.isFinished ? 'Restart' : 'Start'}
        </button>
    );
}
