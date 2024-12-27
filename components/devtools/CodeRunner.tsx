import { CodeiumEditor } from '@codeium/react-code-editor/dist/esm';
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { highlight } from 'sugar-high';
import { convertTypeScriptToJavaScript } from './utils/typescriptToJavascriptConverter';

export function CodeRunner() {
    const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'typescript'>('javascript');
    const [editorValue, setEditorValue] = useState<string>("console.log('Hello, world!');");
    const [output, setOutput] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem('selectedLanguage') as 'javascript' | 'typescript';
            if (storedLanguage) {
                setSelectedLanguage(storedLanguage);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedLanguage', selectedLanguage);
            const storedValue = localStorage.getItem(`editorValue-${selectedLanguage}`);
            setEditorValue(storedValue || "console.log('Hello, world!');");
        }
    }, [selectedLanguage]);

    const handleTabClick = (language: 'javascript' | 'typescript') => {
        setSelectedLanguage(language);
    };

    const handleEditorChange = (value: string | undefined) => {
        if (typeof window !== 'undefined' && value !== undefined) {
            localStorage.setItem(`editorValue-${selectedLanguage}`, value);
            setEditorValue(value);
        }
    };

    return (
        <div className="mt-10">
            <div className="flex flex-col items-baseline justify-start gap-2 md:flex-row">
                <div>
                    <a
                        className="no-underline hover:no-underline"
                        href="#code-runner">
                        <h2 className="text-lg font-bold">Code Runner</h2>
                    </a>
                </div>
                <div>
                    <p className="text-xs text-neutral-500">(Supports AI autocomplete, linting, and more)</p>
                </div>
            </div>

            <div className="mt-5 gap-5 md:flex md:flex-row">
                <div>
                    <div className="mb-4 flex justify-between text-sm">
                        <button
                            type="button"
                            className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                            onClick={() => {
                                runCode(validationErrors, editorValue, selectedLanguage, setOutput);
                            }}>
                            Run
                        </button>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className={`px-2 py-1 ${selectedLanguage === 'javascript' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => {
                                    handleTabClick('javascript');
                                }}>
                                JavaScript
                            </button>
                            <button
                                type="button"
                                className={`px-2 py-1 ${selectedLanguage === 'typescript' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => {
                                    handleTabClick('typescript');
                                }}>
                                TypeScript
                            </button>
                        </div>
                    </div>
                    <div className={`h-[${height}] w-full md:w-[700px] [&>div>a]:hidden`}>
                        <CodeiumEditor
                            // defaultLanguage="javascript"
                            value={editorValue}
                            language={selectedLanguage}
                            theme="vs-dark"
                            // keepCurrentModel={true}
                            className="CodeiumEditor"
                            width="100%"
                            height="100%"
                            onChange={handleEditorChange}
                            onValidate={(value: any[]) => {
                                setValidationErrors(value);
                            }}
                        />
                    </div>
                </div>

                <div className="mt-[51px] h-[300px] w-full md:w-[500px]">
                    <CodeOutput code={output} />
                </div>
            </div>
        </div>
    );
}

const height = '300px';
function CodeOutput({ code }: { code: string }) {
    const codeHTML = useMemo(() => {
        return highlight(code);
    }, [code]);

    if (codeHTML === '') {
        return null;
    }
    return (
        <pre className="p-0">
            <div className="w-full overflow-hidden">
                <div className={`custom_scrollbar w-full overflow-auto rounded bg-slate-800 p-2 h-[${height}]`}>
                    <code
                        className="codeblocks text-sm"
                        dangerouslySetInnerHTML={{ __html: codeHTML }}
                    />
                </div>
            </div>
        </pre>
    );
}
const runCode = (
    validationErrors: any[],
    editorValue: string,
    selectedLanguage: 'javascript' | 'typescript',
    setOutput: Dispatch<SetStateAction<string>>,
) => {
    if (validationErrors.length > 0) {
        const formattedErrors = validationErrors
            .map((error) => {
                return `Line ${error.startLineNumber}, Column ${error.startColumn}: ${error.message}`;
            })
            .join('\n');
        setOutput(formattedErrors);
    } else {
        let codeToRun = editorValue;
        if (selectedLanguage === 'typescript') {
            codeToRun = convertTypeScriptToJavaScript(editorValue);
        }
        try {
            let outputContent = '';
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                outputContent += args.join(' ') + '\n';
                originalConsoleLog(...args);
            };
            const result = eval(codeToRun);
            console.log = originalConsoleLog;
            setOutput(outputContent + (result !== undefined ? `${result}` : ''));
        } catch (error: any) {
            setOutput(error.message);
        }
    }
};
