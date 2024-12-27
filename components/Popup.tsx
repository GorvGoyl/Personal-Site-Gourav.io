type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function Popup({ isOpen, onClose, children }: PopupProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}>
            <div
                className="mx-4 rounded-lg bg-white p-6"
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                {children}
            </div>
        </div>
    );
}
