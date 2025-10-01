import { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import { Container, LayoutType } from '../../components/layout';
import { Links, Navbar } from '../../components/navbar';

export default function NotepadPage() {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Load saved notes from localStorage
        const savedNotes = localStorage.getItem('notepadText');
        if (savedNotes) {
            setText(savedNotes);
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
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-xs text-neutral-500 hover:text-red-600">
                                clear
                            </button>
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Start typing..."
                            spellCheck={false}
                            className="min-h-[600px] w-full resize-none border-0 p-0 font-mono text-base focus:outline-none focus:ring-0"
                        />
                    </div>
                </main>
            </Container>
        </>
    );
}
