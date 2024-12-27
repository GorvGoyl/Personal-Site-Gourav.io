import { useState } from 'react';
import { uuidv4, uuidv7 } from 'uuidv7';
import { Button } from '../Button';
import { Popup } from '../Popup';

export function UuidGenerator() {
    const [isOpen, setIsOpen] = useState(false);
    const [uuids, setUuids] = useState({ v4: uuidv4(), v7: uuidv7() });

    const generateNewUuids = () => {
        setUuids({
            v4: uuidv4(),
            v7: uuidv7(),
        });
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                UUID Generator
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="w-[400px] space-y-4">
                    <h2 className="text-xl font-semibold">UUID Generator</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-medium">UUID v4 (Random)</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 select-all rounded-md bg-neutral-100 p-2">{uuids.v4}</code>
                                <Button
                                    onClick={() => {
                                        copyToClipboard(uuids.v4).catch(() => {
                                            console.error('Failed to copy to clipboard');
                                        });
                                    }}>
                                    Copy
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="font-medium">UUID v7 (Time-based)</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 select-all rounded-md bg-neutral-100 p-2">{uuids.v7}</code>
                                <Button
                                    onClick={() => {
                                        copyToClipboard(uuids.v7).catch(() => {
                                            console.error('Failed to copy to clipboard');
                                        });
                                    }}>
                                    Copy
                                </Button>
                            </div>
                        </div>

                        <Button onClick={generateNewUuids}>Generate New UUIDs</Button>
                    </div>
                </div>
            </Popup>
        </>
    );
}
