import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';

type Day = {
    date: number;
    month: number;
    year: number;
};

type Month = {
    name: string;
    days: (Day | null)[][];
};

type Notes = {
    [date: string]: string;
};

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const DAYS_IN_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    return (new Date(year, month, 1).getDay() + 6) % 7;
}

function generateMonthData(year: number, monthIndex: number): Month {
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);
    const monthData: (Day | null)[][] = [];
    let currentDay = 1;
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === monthIndex;
    const currentDate = today.getDate();

    for (let i = 0; i < 6; i++) {
        // Max 6 weeks to display a month
        const week: (Day | null)[] = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                week.push(null);
            } else if (currentDay <= daysInMonth) {
                week.push({ date: currentDay, month: monthIndex, year });
                currentDay++;
            } else {
                week.push(null);
            }
        }
        monthData.push(week);
        if (
            currentDay > daysInMonth &&
            monthData[monthData.length - 1].every((day) => {
                return day === null;
            })
        ) {
            // if current day already exceeds days in month and the last week is all nulls, break.
            break;
        }
        if (
            currentDay > daysInMonth &&
            i === 4 &&
            monthData[monthData.length - 1].filter((day) => {
                return day !== null;
            }).length === 0
        ) {
            // if current day already exceeds days in month and the 5th week is all nulls, break.
            monthData.pop();
            break;
        }
    }
    return { name: MONTH_NAMES[monthIndex], days: monthData };
}

function getDayClasses(day: Day | null, today: Date, isWeekend: boolean, hasNote: boolean): string {
    const classes = ['flex', 'h-7', 'w-7', 'items-center', 'justify-center', 'rounded-full', 'p-1'];
    if (day === null) {
        classes.push('text-transparent');
        return classes.join(' ');
    }

    const isToday = day.date === today.getDate() && day.month === today.getMonth() && day.year === today.getFullYear();
    if (isToday) {
        classes.push('bg-blue-500', 'text-white');
    } else if (hasNote) {
        classes.push('bg-amber-200');
    } else if (isWeekend) {
        classes.push('bg-neutral-200');
    }

    return classes.join(' ');
}

function generateYearCalendar(year: number): Month[] {
    const calendar: Month[] = [];
    for (let i = 0; i < 12; i++) {
        calendar.push(generateMonthData(year, i));
    }
    return calendar;
}

export function FullYearCalendar() {
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState<Notes>({});
    const [isNotesLoaded, setIsNotesLoaded] = useState(false);
    const currentYear = new Date().getFullYear();
    const yearCalendar = generateYearCalendar(currentYear);
    const today = new Date();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedNotes = localStorage.getItem('full-year-calendar-notes');
                if (savedNotes) {
                    setNotes(JSON.parse(savedNotes));
                }
            } catch (error) {
                console.error('Failed to parse notes from localStorage', error);
            } finally {
                setIsNotesLoaded(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isNotesLoaded && typeof window !== 'undefined') {
            localStorage.setItem('full-year-calendar-notes', JSON.stringify(notes));
        }
    }, [notes, isNotesLoaded]);

    const formatDateKey = (day: Day): string => {
        return `${day.year}-${day.month + 1}-${day.date}`;
    };

    const handleAddOrEditNote = (day: Day) => {
        const dateKey = formatDateKey(day);
        const noteText = prompt('Enter your note:', notes[dateKey] || '');
        if (noteText !== null) {
            setNotes((prev) => {
                return { ...prev, [dateKey]: noteText };
            });
        }
    };

    const handleDeleteNote = (day: Day) => {
        const dateKey = formatDateKey(day);
        setNotes((prev) => {
            const { [dateKey]: _, ...newNotes } = prev;
            return newNotes;
        });
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                🗓️ Full Year Calendar
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="w-[90vw] max-w-md p-2 sm:p-4">
                    <h2 className="mb-4 text-center text-2xl font-semibold">{currentYear}</h2>
                    <div className="max-h-[70vh] space-y-4 overflow-y-auto">
                        {yearCalendar.map((month) => {
                            return (
                                <div
                                    key={month.name}
                                    className="rounded-lg border p-3 shadow-sm">
                                    <h3 className="mb-2 text-center text-lg font-medium">{month.name}</h3>
                                    <div className="grid grid-cols-7 text-xs font-semibold">
                                        {DAYS_IN_WEEK.map((day) => {
                                            return <div key={day}>{day}</div>;
                                        })}
                                    </div>
                                    {month.days.map((week, weekIndex) => {
                                        return (
                                            <div
                                                key={weekIndex}
                                                className="mt-1 grid grid-cols-7 text-center text-sm">
                                                {week.map((day, dayIndex) => {
                                                    const isWeekend = dayIndex === 5 || dayIndex === 6;
                                                    const hasNote = day ? !!notes[formatDateKey(day)] : false;
                                                    return (
                                                        <div
                                                            key={dayIndex}
                                                            className={`relative ${day ? 'cursor-pointer' : ''}`}
                                                            onClick={() => {
                                                                if (day) {
                                                                    handleAddOrEditNote(day);
                                                                }
                                                            }}>
                                                            <div
                                                                className={getDayClasses(
                                                                    day,
                                                                    today,
                                                                    isWeekend,
                                                                    hasNote,
                                                                )}>
                                                                {day ? day.date : ''}
                                                            </div>
                                                            {day && notes[formatDateKey(day)] && (
                                                                <div className="absolute bottom-full left-1/2 z-10 mb-1 w-max -translate-x-1/2 transform rounded bg-amber-100 p-1 text-left text-[10px] opacity-95 shadow-lg">
                                                                    <span>{notes[formatDateKey(day)]}</span>
                                                                    <button
                                                                        type="button"
                                                                        className="ml-1 text-[10px] font-bold text-red-500"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteNote(day);
                                                                        }}>
                                                                        🗑️
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Popup>
        </>
    );
}
