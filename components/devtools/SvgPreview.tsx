import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';

const DEFAULT_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 6V18M18 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const STORAGE_KEY = 'saved-svg-code';

export function SvgPreview() {
    const [isOpen, setIsOpen] = useState(false);
    const [svgCode, setSvgCode] = useState(DEFAULT_SVG);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedSvg = localStorage.getItem(STORAGE_KEY);
        if (savedSvg) {
            setSvgCode(savedSvg);
        }
    }, []);

    function sanitizeSvg(input: string) {
        // Remove any script tags and their contents
        return (
            input
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                // Remove onclick and similar event handlers
                .replace(/\son\w+="[^"]*"/g, '')
        );
    }

    function handleSvgInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const input = e.target.value;
        const sanitized = sanitizeSvg(input);
        setSvgCode(sanitized);
        localStorage.setItem(STORAGE_KEY, sanitized);

        // Clear previous error
        setError('');

        // Basic validation for SVG
        if (input && !input.includes('<svg')) {
            setError('Invalid SVG code. Make sure it contains an <svg> tag.');
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                SVG Editor
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="flex w-[500px] flex-col gap-4">
                    <h2 className="text-xl font-semibold">SVG Preview</h2>
                    <textarea
                        className="h-32 w-full rounded border border-neutral-200 p-2 font-mono text-sm"
                        placeholder="Paste your SVG code here..."
                        value={svgCode}
                        onChange={handleSvgInput}
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    {svgCode && !error && (
                        <div className="flex flex-col gap-2">
                            <p className="text-base text-neutral-500">Preview</p>
                            <div
                                className="flex items-center justify-center rounded p-4"
                                dangerouslySetInnerHTML={{ __html: svgCode }}
                            />
                        </div>
                    )}
                </div>
            </Popup>
        </>
    );
}
