import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';

type Timezone = {
    id: string;
    name: string;
};

const initialUserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function TimezoneConverter() {
    const [isOpen, setIsOpen] = useState(false);
    const [timezones, setTimezones] = useState<Timezone[]>([{ id: initialUserTimezone, name: initialUserTimezone }]);
    const [liveTime, setLiveTime] = useState(new Date());
    const [timeOffsetInHours, setTimeOffsetInHours] = useState(0);
    const [selectedTimezone, setSelectedTimezone] = useState('');

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const timerId = setInterval(() => {
            setLiveTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [isOpen]);

    const handleAddTimezone = () => {
        if (
            selectedTimezone &&
            !timezones.find((tz) => {
                return tz.id === selectedTimezone;
            })
        ) {
            setTimezones([...timezones, { id: selectedTimezone, name: selectedTimezone }]);
            setSelectedTimezone('');
        }
    };

    const handleRemoveTimezone = (timezoneId: string) => {
        setTimezones(
            timezones.filter((tz) => {
                return tz.id !== timezoneId;
            }),
        );
    };

    const availableTimezones = [
        'UTC',
        'GMT',
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Dubai',
        'Asia/Kolkata',
        'Asia/Bangkok',
        'Australia/Sydney',
    ].filter((tz) => {
        return (
            tz !== initialUserTimezone &&
            !timezones.find((t) => {
                return t.id === tz;
            })
        );
    });

    const displayTime = new Date(liveTime.getTime() + timeOffsetInHours * 60 * 60 * 1000);

    const formatTime = (date: Date, timeZone: string) => {
        return date.toLocaleTimeString('en-US', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date, timeZone: string) => {
        return date.toLocaleDateString('en-US', {
            timeZone,
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                    // Reset offset when opening popup if desired, or maintain state
                    // setTimeOffsetInHours(0);
                }}>
                🕰️ Timezone Converter
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="w-[450px] rounded-lg border border-neutral-200 p-5">
                    <h2 className="mb-4 text-xl font-semibold">Timezone Converter</h2>

                    <div className="mb-4">
                        <label
                            htmlFor="timeOffsetSlider"
                            className="mb-1 block text-sm font-medium text-neutral-700">
                            Adjust Time{' '}
                            <span>
                                {timeOffsetInHours >= 0 ? <span>+</span> : <span />}
                                {timeOffsetInHours} <span>hours</span>
                            </span>
                        </label>
                        <input
                            type="range"
                            id="timeOffsetSlider"
                            min="-12"
                            max="12"
                            step="1"
                            value={timeOffsetInHours}
                            onChange={(e) => {
                                setTimeOffsetInHours(parseInt(e.target.value, 10));
                            }}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200"
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            value={selectedTimezone}
                            onChange={(e) => {
                                setSelectedTimezone(e.target.value);
                            }}
                            className="mr-2 rounded border border-neutral-300 p-2">
                            <option value="">Select a timezone to add</option>
                            {availableTimezones.map((tz) => {
                                return (
                                    <option
                                        key={tz}
                                        value={tz}>
                                        {tz}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            type="button"
                            onClick={handleAddTimezone}
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            Add Timezone
                        </button>
                    </div>
                    <div className="space-y-3">
                        {timezones.map((tz) => {
                            return (
                                <div
                                    key={tz.id}
                                    className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-3">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="font-medium">{tz.name}</div>
                                        <div className="text-sm text-neutral-600">
                                            {formatTime(displayTime, tz.id)}{' '}
                                            <span className="ml-3 text-xs text-neutral-500">
                                                {formatDate(displayTime, tz.id)}
                                            </span>
                                        </div>
                                    </div>
                                    {tz.id !== initialUserTimezone && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleRemoveTimezone(tz.id);
                                            }}
                                            className="text-xs text-red-500 hover:text-red-700">
                                            Remove
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Popup>
        </>
    );
}
