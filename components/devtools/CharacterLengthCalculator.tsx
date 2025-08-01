import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';

export function CharacterLengthCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        const savedText = localStorage.getItem('characterCalculatorText');
        if (savedText) {
            setText(savedText);
        }
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        localStorage.setItem('characterCalculatorText', newText);
    };

    const formatSize = (inputText: string) => {
        const sizeInBytes = new Blob([inputText]).size;

        if (sizeInBytes < 1024) {
            return `${sizeInBytes} Byte`;
        }

        const sizeInKB = sizeInBytes / 1024;
        if (sizeInKB < 1024) {
            return `${sizeInKB.toFixed(2)} KB`;
        }

        const sizeInMB = sizeInKB / 1024;
        return `${sizeInMB.toFixed(2)} MB`;
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                🔢 Character Length Calculator
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="w-[500px] space-y-4">
                    <h2 className="text-xl font-semibold">🔢 Character Length Calculator</h2>

                    <div className="space-y-2">
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Paste your text here..."
                            className="h-40 w-full rounded-lg border p-3"
                            autoFocus={true}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col rounded-lg bg-neutral-100 p-3">
                                <span className="text-sm text-neutral-600">Characters (with spaces)</span>
                                <span className="text-2xl font-semibold">{text.length}</span>
                            </div>
                            <div className="flex flex-col rounded-lg bg-neutral-100 p-3">
                                <span className="text-sm text-neutral-600">Characters (without spaces)</span>
                                <span className="text-2xl font-semibold">{text.replace(/\s/g, '').length}</span>
                            </div>
                            <div className="flex flex-col rounded-lg bg-neutral-100 p-3">
                                <span className="text-sm text-neutral-600">Words</span>
                                <span className="text-2xl font-semibold">
                                    {text.trim() ? text.trim().split(/\s+/).length : 0}
                                </span>
                            </div>
                            <div className="flex flex-col rounded-lg bg-neutral-100 p-3">
                                <span className="text-sm text-neutral-600">Size</span>
                                <span className="text-2xl font-semibold">{formatSize(text)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
}
