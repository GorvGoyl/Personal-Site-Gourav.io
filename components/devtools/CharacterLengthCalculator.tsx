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

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                Character Length Calculator
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Character Length Calculator</h2>

                    <div className="space-y-2">
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Paste your text here..."
                            className="h-40 w-full rounded-lg border p-3 dark:border-neutral-600 dark:bg-neutral-700"
                            autoFocus={true}
                        />

                        <div className="space-y-1">
                            <p>
                                <span>Characters (with spaces): {text.length}</span>
                            </p>
                            <p>
                                <span>Characters (without spaces): {text.replace(/\s/g, '').length}</span>
                            </p>
                            <p>
                                <span>
                                    Words:{' '}
                                    {text.trim() ? <span>{text.trim().split(/\s+/).length}</span> : <span>0</span>}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
}
