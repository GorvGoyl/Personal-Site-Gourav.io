import { useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';

type CounterType = 'characters' | 'words' | 'tokens';

export function LLMTokenCounter() {
    const [isOpen, setIsOpen] = useState(false);
    const [characters, setCharacters] = useState<string>('');
    const [words, setWords] = useState<string>('');
    const [tokens, setTokens] = useState<string>('');
    const [pricePerMillion, setPricePerMillion] = useState<string>('');

    const resetValues = () => {
        setCharacters('');
        setWords('');
        setTokens('');
        setPricePerMillion('');
    };

    const calculateValues = (value: string, type: CounterType) => {
        // Prevent negative numbers
        const sanitizedValue = value.startsWith('-') ? '' : value;
        const numValue = parseInt(sanitizedValue) || 0;

        switch (type) {
            case 'characters': {
                // characters → tokens → words
                const tokensFromChars = Math.round(numValue / 5);
                const wordsFromTokens = Math.round(tokensFromChars * 0.75);
                setTokens(tokensFromChars.toString());
                setWords(wordsFromTokens.toString());
                setCharacters(value);
                break;
            }

            case 'words': {
                // words → tokens → characters
                const tokensFromWords = Math.round(numValue / 0.75);
                const charsFromTokens = tokensFromWords * 5;
                setTokens(tokensFromWords.toString());
                setCharacters(charsFromTokens.toString());
                setWords(value);
                break;
            }

            case 'tokens': {
                // tokens → words & characters
                const wordsFromTokens2 = Math.round(numValue * 0.75);
                const charsFromTokens2 = numValue * 5;
                setWords(wordsFromTokens2.toString());
                setCharacters(charsFromTokens2.toString());
                setTokens(value);
                break;
            }
        }
    };

    const calculateCost = () => {
        if (!tokens || !pricePerMillion) {
            return null;
        }
        const tokenCount = parseInt(tokens);
        const price = parseFloat(pricePerMillion);
        if (isNaN(tokenCount) || isNaN(price)) {
            return null;
        }
        return ((tokenCount * price) / 1_000_000).toFixed(4);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                🪙 LLM Token Counter
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    resetValues();
                }}>
                <div className="w-[400px] space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">🪙 LLM Token Counter</h2>
                        <button
                            type="button"
                            onClick={resetValues}
                            className="text-sm text-neutral-500 hover:text-neutral-700">
                            Reset
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="characters"
                                className="block text-sm">
                                Characters <span className="text-neutral-500">(≈ tokens × 5)</span>
                            </label>
                            <input
                                type="number"
                                id="characters"
                                value={characters}
                                onChange={(e) => {
                                    calculateValues(e.target.value, 'characters');
                                }}
                                className="w-full rounded-lg border p-3 dark:border-neutral-600 dark:bg-neutral-700"
                                placeholder="Enter number of characters"
                                min="0"
                                autoFocus={true}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="words"
                                className="block text-sm">
                                Words <span className="text-neutral-500">(≈ tokens × 0.75)</span>
                            </label>
                            <input
                                type="number"
                                id="words"
                                value={words}
                                onChange={(e) => {
                                    calculateValues(e.target.value, 'words');
                                }}
                                className="w-full rounded-lg border p-3 dark:border-neutral-600 dark:bg-neutral-700"
                                placeholder="Enter number of words"
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="tokens"
                                className="block text-sm">
                                Tokens <span className="text-neutral-500">(≈ characters ÷ 5)</span>
                            </label>
                            <input
                                type="number"
                                id="tokens"
                                value={tokens}
                                onChange={(e) => {
                                    calculateValues(e.target.value, 'tokens');
                                }}
                                className="w-full rounded-lg border p-3 dark:border-neutral-600 dark:bg-neutral-700"
                                placeholder="Enter number of tokens"
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="price"
                                className="block text-sm">
                                Price / 1M tokens
                                {calculateCost() && (
                                    <span className="ml-2 text-neutral-500">(Estimated cost: ${calculateCost()})</span>
                                )}
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <input
                                    type="number"
                                    id="price"
                                    value={pricePerMillion}
                                    onChange={(e) => {
                                        setPricePerMillion(e.target.value);
                                    }}
                                    className="w-full rounded-lg border p-3 pl-6 dark:border-neutral-600 dark:bg-neutral-700"
                                    placeholder="Enter price per million tokens"
                                    min="0"
                                    step="1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
}
