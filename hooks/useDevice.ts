import { useEffect, useState } from 'react';

export function useDevice(): 'mobile' | 'desktop' {
    const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop');

    useEffect(() => {
        if (isMobile()) {
            setDevice('mobile');
        } else {
            setDevice('desktop');
        }
    }, []);

    return device;
}
export function isMobile() {
    if (typeof window === 'undefined') {
        return false;
    }
    const details = navigator.userAgent;

    // Creating a regular expression containing some mobile devices keywords to search it in details string
    const regexp = /android|iphone|kindle|ipad/iu;

    return regexp.test(details);
}
