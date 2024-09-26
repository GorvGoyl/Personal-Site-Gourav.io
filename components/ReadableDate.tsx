import { useMemo } from 'react';

type ReadableDateProps = {
    date: string;
    monthFormat?: 'long' | 'short' | 'numeric';
};

export function ReadableDate({ date, monthFormat = 'short' }: ReadableDateProps) {
    const formattedDate = useMemo(() => {
        // Parse the input date string
        const [year, month, day] = date.split('-').map(Number);

        // Create a Date object
        const dateObject = new Date(year, month - 1, day);

        // Get the user's locale
        const userLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

        // Define formatting options based on the requested format
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: monthFormat,
            day: 'numeric',
        };

        // Format the date according to the user's locale and specified format
        return dateObject.toLocaleDateString(userLocale, options);
    }, [date, monthFormat]);

    return <span>{formattedDate}</span>;
}
