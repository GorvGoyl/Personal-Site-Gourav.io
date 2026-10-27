import { useSyncExternalStore } from 'react';

/** Today's date, e.g. "October 27, 2026". Filled in by the browser: the static HTML was built on another day. */
export function Today() {
    const today = useSyncExternalStore(subscribeToNothing, getToday, getNoDate);

    return <span>{today}</span>;
}

function subscribeToNothing() {
    return () => {};
}

function getToday() {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getNoDate() {
    return '';
}
