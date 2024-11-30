import { useEffect, useState } from 'react';

export function ScrollTopBtn(): JSX.Element {
    const [isVisible, setVisibility] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                if (!isVisible) {
                    setVisibility((x) => {
                        return true;
                    });
                }
            } else if (isVisible) {
                setVisibility((x) => {
                    return false;
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    return isVisible ? (
        <div
            className="fixed bottom-12 right-12 z-50 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 opacity-100 shadow outline-none"
            title="Scroll back to top"
            role="button"
            tabIndex={0}
            onClick={handleClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    ) : (
        <></>
    );
}
