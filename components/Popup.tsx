/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function Popup({ isOpen, onClose, children }: PopupProps) {
    useEffect(() => {
        function handleEscKeyPress(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleEscKeyPress);
        }

        return () => {
            window.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}>
            <div
                className="mx-4 max-w-[90vw] rounded-lg bg-white p-6"
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                {children}
            </div>
        </div>
    );
}
