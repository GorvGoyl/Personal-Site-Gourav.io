import { useEffect, useState } from 'react';

type ColorFillState = {
    isFullScreen: boolean;
    color: string;
};

const LOCAL_STORAGE_KEY = 'colorFill';

export function ColorFill() {
    const [state, setState] = useState<ColorFillState>({
        isFullScreen: false,
        color: '#FFFFFF',
    });

    useEffect(() => {
        const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedColor) {
            setState((prev) => {
                return {
                    ...prev,
                    color: savedColor,
                };
            });
        }
    }, []);

    function handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newColor = event.target.value;
        setState((prev) => {
            return {
                ...prev,
                color: newColor,
            };
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, newColor);
    }

    function toggleFullScreen() {
        setState((prev) => {
            return {
                ...prev,
                isFullScreen: !prev.isFullScreen,
            };
        });
    }

    if (state.isFullScreen) {
        return (
            <div
                className="fixed inset-0 z-50"
                style={{ backgroundColor: state.color }}>
                <div className="fixed bottom-6 right-6 flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
                    <input
                        type="color"
                        value={state.color}
                        onChange={handleColorChange}
                        className="h-10 w-20"
                    />
                    <button
                        type="button"
                        onClick={toggleFullScreen}
                        className="rounded-md bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700">
                        Exit Fill Screen
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[200px] rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Color Fill</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <input
                        type="color"
                        value={state.color}
                        onChange={handleColorChange}
                        className="h-10 w-20"
                    />
                    <input
                        type="text"
                        value={state.color}
                        onChange={handleColorChange}
                        placeholder="#FFFFFF"
                        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
                    />
                </div>
                <button
                    type="button"
                    onClick={toggleFullScreen}
                    className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700">
                    Fill Screen
                </button>
            </div>
        </div>
    );
}
