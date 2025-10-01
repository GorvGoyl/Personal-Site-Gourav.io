import { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import { Container, LayoutType } from '../../components/layout';
import { Links, Navbar } from '../../components/navbar';

export default function NotepadPage() {
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [padding, setPadding] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Load saved notes from localStorage
        const savedNotes = localStorage.getItem('notepadText');
        if (savedNotes) {
            setText(savedNotes);
        }
        // Load saved font size from localStorage
        const savedFontSize = localStorage.getItem('notepadFontSize');
        if (savedFontSize) {
            setFontSize(Number.parseInt(savedFontSize, 10));
        }
        // Load saved padding from localStorage
        const savedPadding = localStorage.getItem('notepadPadding');
        if (savedPadding) {
            setPadding(Number.parseInt(savedPadding, 10));
        }
        // Focus the textarea after loading
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        // Save to localStorage
        localStorage.setItem('notepadText', newText);
    };

    const handleClear = () => {
        setText('');
        localStorage.removeItem('notepadText');
    };

    const increaseFontSize = () => {
        const newSize = Math.min(fontSize + 2, 32);
        setFontSize(newSize);
        localStorage.setItem('notepadFontSize', newSize.toString());
    };

    const decreaseFontSize = () => {
        const newSize = Math.max(fontSize - 2, 10);
        setFontSize(newSize);
        localStorage.setItem('notepadFontSize', newSize.toString());
    };

    const increasePadding = () => {
        const newPadding = Math.min(padding + 20, 200);
        setPadding(newPadding);
        localStorage.setItem('notepadPadding', newPadding.toString());
    };

    const decreasePadding = () => {
        const newPadding = Math.max(padding - 20, 0);
        setPadding(newPadding);
        localStorage.setItem('notepadPadding', newPadding.toString());
    };

    const getStats = () => {
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/gu, '').length;
        const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
        const lines = text ? text.split('\n').length : 0;
        return { chars, charsNoSpaces, words, lines };
    };

    const stats = getStats();

    return (
        <>
            <Header
                type="website"
                title="Notepad - Simple notepad with localStorage"
            />

            <Container layout={LayoutType.Blog}>
                <Navbar link={Links.Blog} />
                <main>
                    <h1 className="mb-6 text-2xl font-semibold">Notepad</h1>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 text-xs text-neutral-500">
                                <span>{stats.chars} chars</span>
                                <span>{stats.words} words</span>
                                <span>{stats.lines} lines</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={decreaseFontSize}
                                        className="text-xs text-neutral-500 hover:text-neutral-900"
                                        title="Decrease font size">
                                        A-
                                    </button>
                                    <span className="text-xs text-neutral-400">{fontSize}px</span>
                                    <button
                                        type="button"
                                        onClick={increaseFontSize}
                                        className="text-xs text-neutral-500 hover:text-neutral-900"
                                        title="Increase font size">
                                        A+
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={decreasePadding}
                                        className="text-xs text-neutral-500 hover:text-neutral-900"
                                        title="Decrease padding">
                                        ←
                                    </button>
                                    <span className="text-xs text-neutral-400">{padding}px</span>
                                    <button
                                        type="button"
                                        onClick={increasePadding}
                                        className="text-xs text-neutral-500 hover:text-neutral-900"
                                        title="Increase padding">
                                        →
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="text-xs text-neutral-500 hover:text-red-600">
                                    clear
                                </button>
                            </div>
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Start typing..."
                            spellCheck={false}
                            style={{
                                fontSize: `${fontSize}px`,
                                paddingLeft: `${padding}px`,
                                paddingRight: `${padding}px`,
                            }}
                            className="min-h-[600px] w-full resize-none border-0 py-0 font-mono focus:outline-none focus:ring-0"
                        />
                    </div>
                </main>
            </Container>
        </>
    );
}
