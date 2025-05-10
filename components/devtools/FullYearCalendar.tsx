import { useState } from 'react';
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

function generateYearCalendar(year: number): Month[] {
    const calendar: Month[] = [];
    for (let i = 0; i < 12; i++) {
        calendar.push(generateMonthData(year, i));
    }
    return calendar;
}

export function FullYearCalendar() {
    const [isOpen, setIsOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    const yearCalendar = generateYearCalendar(currentYear);
    const today = new Date();

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
                                    <div className="grid grid-cols-7 text-center text-xs font-semibold">
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
                                                    return (
                                                        <div
                                                            key={dayIndex}
                                                            className={`flex h-7 w-7 items-center justify-center rounded-full p-1 ${day && day.date === today.getDate() && day.month === today.getMonth() && day.year === today.getFullYear() ? 'bg-blue-500 text-white' : isWeekend && day ? 'bg-neutral-200' : ''} ${day === null ? 'text-transparent' : ''} `}>
                                                            {day ? day.date : ''}
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
