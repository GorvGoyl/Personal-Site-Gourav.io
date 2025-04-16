import { useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';

export function AspectRatioCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [dimensions, setDimensions] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<string | null>(null);

    const calculateAspectRatio = (input: string) => {
        const [first, second] = input.split(/x|X/).map(Number);
        if (!isNaN(first) && !isNaN(second) && first > 0 && second > 0) {
            const gcd = (a: number, b: number): number => {
                return b === 0 ? a : gcd(b, a % b);
            };
            const divisor = gcd(first, second);
            setAspectRatio(`${first / divisor}:${second / divisor}`);
        } else {
            setAspectRatio(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setDimensions(input);
        calculateAspectRatio(input);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                📏 Aspect Ratio Calculator
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="w-[300px] space-y-4">
                    <h2 className="text-xl font-semibold">📏 Aspect Ratio Calculator</h2>

                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Enter dimensions like 1920x1080"
                            value={dimensions}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border p-3 dark:border-neutral-600 dark:bg-neutral-700"
                            autoFocus={true}
                        />

                        {aspectRatio && (
                            <div className="mt-2">
                                <strong>Aspect Ratio:</strong> {aspectRatio}
                            </div>
                        )}
                    </div>
                </div>
            </Popup>
        </>
    );
}
