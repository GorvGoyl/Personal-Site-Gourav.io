import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { TimerControls } from '../components/timer/TimerControls';
import { TimerDisplay } from '../components/timer/TimerDisplay';
import { getOrCreateAudioContext, playEndTone, playReminderTone } from '../lib/timerSound';

const DEFAULT_TOTAL = 120;
const DEFAULT_REMINDER_OFFSET = 30;

export default function TimerPage() {
    const [totalSeconds, setTotalSeconds] = useState(DEFAULT_TOTAL);
    const [reminderOffsetSeconds, setReminderOffsetSeconds] = useState<number | null>(DEFAULT_REMINDER_OFFSET);
    const [reminderInput, setReminderInput] = useState(String(DEFAULT_REMINDER_OFFSET));
    const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_TOTAL);
    const [isRunning, setIsRunning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const reminderFiredRef = useRef(false);
    const endFiredRef = useRef(false);
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);
    // Ref to avoid stale closure in setInterval
    const reminderOffsetRef = useRef(reminderOffsetSeconds);
    reminderOffsetRef.current = reminderOffsetSeconds;

    const isFinished = remainingSeconds === 0 && totalSeconds > 0;
    const isIdle = !isRunning && remainingSeconds === totalSeconds;

    // Load from localStorage
    useEffect(() => {
        const savedTotal = localStorage.getItem('timerTotalSeconds');
        if (savedTotal) {
            const parsed = Number.parseInt(savedTotal, 10);
            if (parsed > 0) {
                setTotalSeconds(parsed);
                setRemainingSeconds(parsed);
            }
        }
        const savedReminder = localStorage.getItem('timerReminderOffset');
        if (savedReminder === 'off') {
            setReminderOffsetSeconds(null);
        } else if (savedReminder) {
            const parsed = Number.parseInt(savedReminder, 10);
            if (parsed >= 0) {
                setReminderOffsetSeconds(parsed);
                setReminderInput(String(parsed));
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('timerTotalSeconds', totalSeconds.toString());
            if (reminderOffsetSeconds === null) {
                localStorage.setItem('timerReminderOffset', 'off');
            } else {
                localStorage.setItem('timerReminderOffset', reminderOffsetSeconds.toString());
            }
        }
    }, [totalSeconds, reminderOffsetSeconds, isLoaded]);

    // Keep screen on while the page is open
    useEffect(() => {
        requestWakeLock();

        function handleVisibilityChange() {
            if (document.visibilityState === 'visible') {
                requestWakeLock();
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            releaseWakeLock();
        };
    }, []);

    async function requestWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
            }
        } catch {
            // Wake Lock not supported or failed
        }
    }

    function releaseWakeLock() {
        if (wakeLockRef.current) {
            wakeLockRef.current.release();
            wakeLockRef.current = null;
        }
    }

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    function startTimer() {
        // Clear any existing interval to prevent duplicates
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        let startFrom = remainingSeconds;

        // If finished, reset to total
        if (startFrom <= 0) {
            startFrom = totalSeconds;
            setRemainingSeconds(totalSeconds);
        }

        if (startFrom <= 0) return;

        getOrCreateAudioContext(audioContextRef);
        setIsRunning(true);
        setIsEditing(false);
        reminderFiredRef.current = false;
        endFiredRef.current = false;

        intervalRef.current = setInterval(() => {
            setRemainingSeconds((prev) => {
                const next = prev - 1;
                const offset = reminderOffsetRef.current;

                if (offset !== null && next === offset && next > 0 && !reminderFiredRef.current) {
                    reminderFiredRef.current = true;
                    if (audioContextRef.current) {
                        playReminderTone(audioContextRef.current);
                    }
                }

                if (next <= 0) {
                    if (!endFiredRef.current) {
                        endFiredRef.current = true;
                        if (audioContextRef.current) {
                            playEndTone(audioContextRef.current);
                        }
                    }
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setIsRunning(false);
                    return 0;
                }

                return next;
            });
        }, 1000);
    }

    function pauseTimer() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }

    function resetTimer() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
        setRemainingSeconds(totalSeconds);
        reminderFiredRef.current = false;
        endFiredRef.current = false;
    }

    function handleSaveEdit(minutes: number, seconds: number) {
        const newTotal = minutes * 60 + seconds;
        setTotalSeconds(newTotal);
        setRemainingSeconds(newTotal);
        setIsEditing(false);
    }

    function handleReminderToggle(enabled: boolean) {
        if (enabled) {
            setReminderOffsetSeconds(DEFAULT_REMINDER_OFFSET);
            setReminderInput(String(DEFAULT_REMINDER_OFFSET));
        } else {
            setReminderOffsetSeconds(null);
        }
    }

    function handleReminderBlur() {
        const parsed = Number.parseInt(reminderInput, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
            setReminderOffsetSeconds(parsed);
            setReminderInput(String(parsed));
        } else {
            setReminderInput(String(reminderOffsetSeconds ?? DEFAULT_REMINDER_OFFSET));
        }
    }

    return (
        <>
            <Head>
                <title>Timer</title>
                <meta
                    name="description"
                    content="Meetup intro round timer"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <style>{`footer { display: none !important; }`}</style>

            <div className="flex min-h-screen flex-col bg-white">
                {/* Header bar */}
                <nav className="flex items-center justify-between px-4 py-3 text-sm text-slate-500">
                    <span className="text-base font-semibold text-slate-700">Meetup Timer</span>
                    <Link
                        href="/"
                        className="hover:text-slate-800">
                        Home
                    </Link>
                </nav>

                {/* Timer centered */}
                <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-8">
                    <TimerDisplay
                        remainingSeconds={remainingSeconds}
                        totalSeconds={totalSeconds}
                        isRunning={isRunning}
                        isEditing={isEditing}
                        reminderOffsetSeconds={reminderOffsetSeconds}
                        onStartEditing={() => setIsEditing(true)}
                        onSaveEdit={handleSaveEdit}
                        onCancelEdit={() => setIsEditing(false)}
                    />

                    <TimerControls
                        isRunning={isRunning}
                        isFinished={isFinished}
                        isIdle={isIdle}
                        onStart={startTimer}
                        onPause={pauseTimer}
                        onReset={resetTimer}
                    />

                    {/* Reminder setting */}
                    {!isRunning && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    title="Enable reminder"
                                    checked={reminderOffsetSeconds !== null}
                                    onChange={(e) => handleReminderToggle(e.target.checked)}
                                    className="h-4 w-4 accent-blue-600"
                                />
                                Remind
                            </label>
                            {reminderOffsetSeconds !== null && (
                                <>
                                    <input
                                        id="reminder-offset"
                                        title="Reminder offset in seconds"
                                        type="number"
                                        inputMode="numeric"
                                        min={0}
                                        max={totalSeconds}
                                        value={reminderInput}
                                        onChange={(e) => setReminderInput(e.target.value)}
                                        onBlur={handleReminderBlur}
                                        className="w-16 rounded-md border border-slate-300 px-2 py-1 text-center focus:border-blue-500 focus:outline-none"
                                    />
                                    <span>sec before end</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
