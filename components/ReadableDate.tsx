import { useMemo, useSyncExternalStore } from 'react';

type ReadableDateProps = {
    date: string;
    monthFormat?: 'long' | 'short' | 'numeric';
};

export function ReadableDate({ date, monthFormat = 'short' }: ReadableDateProps) {
    // Get the user's locale (en-US while rendering on the server and hydrating, so the HTML matches)
    const userLocale = useSyncExternalStore(subscribeToLanguageChange, getBrowserLanguage, getServerLanguage);

    const formattedDate = useMemo(() => {
        // Parse the input date string
        const [year, month, day] = date.split('-').map(Number);

        // Create a Date object
        const dateObject = new Date(year, month - 1, day);

        // Define formatting options based on the requested format
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: monthFormat,
            day: 'numeric',
        };

        // Format the date according to the user's locale and specified format
        return dateObject.toLocaleDateString(userLocale, options);
    }, [date, monthFormat, userLocale]);

    return <span>{formattedDate}</span>;
}

function subscribeToLanguageChange(onChange: () => void) {
    window.addEventListener('languagechange', onChange);
    return () => {
        window.removeEventListener('languagechange', onChange);
    };
}

function getBrowserLanguage() {
    return navigator.language;
}

function getServerLanguage() {
    return 'en-US';
}
