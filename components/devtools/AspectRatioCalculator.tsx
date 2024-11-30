import { useState } from 'react';

export function AspectRatioCalculator() {
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
        <div className="mt-10 w-[450px] rounded-md">
            <a
                className="no-underline hover:no-underline"
                href="#aspect-ratio-calculator">
                <h2 className="mb-2 text-lg font-bold">Aspect Ratio Calculator</h2>
            </a>
            <div className="flex flex-row gap-2">
                <input
                    type="text"
                    placeholder="Enter dimensions like 1920x1080"
                    value={dimensions}
                    onChange={handleInputChange}
                    className="w-[280px] rounded border border-neutral-300 bg-neutral-100 p-2"
                />
                {aspectRatio && (
                    <div className="mt-2">
                        <strong>Aspect Ratio:</strong> {aspectRatio}
                    </div>
                )}
            </div>
        </div>
    );
}
