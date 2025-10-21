import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type TodoItem = {
    id: string;
    text: string;
    completed: boolean;
};

type Section = {
    id: string;
    name: string;
    todos: TodoItem[];
};

export default function TodoApp() {
    const [sections, setSections] = useState<Section[]>([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [newTodoText, setNewTodoText] = useState<{ [sectionId: string]: string }>({});
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [editingSectionName, setEditingSectionName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('todoAppData');
        if (stored) {
            try {
                const data = JSON.parse(stored) as Section[];
                setSections(data);
            } catch (error) {
                console.error('Failed to parse stored data:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save data to localStorage whenever sections change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('todoAppData', JSON.stringify(sections));
        }
    }, [sections, isLoaded]);

    function addSection() {
        if (!newSectionName.trim()) {
            return;
        }

        const newSection: Section = {
            id: Date.now().toString(),
            name: newSectionName.trim(),
            todos: [],
        };

        setSections([...sections, newSection]);
        setNewSectionName('');
    }

    function deleteSection(sectionId: string) {
        setSections(
            sections.filter((section) => {
                return section.id !== sectionId;
            }),
        );
    }

    function startEditingSection(sectionId: string, currentName: string) {
        setEditingSectionId(sectionId);
        setEditingSectionName(currentName);
    }

    function saveEditingSection() {
        if (!editingSectionName.trim() || !editingSectionId) {
            return;
        }

        setSections(
            sections.map((section) => {
                if (section.id === editingSectionId) {
                    return { ...section, name: editingSectionName.trim() };
                }
                return section;
            }),
        );

        setEditingSectionId(null);
        setEditingSectionName('');
    }

    function cancelEditingSection() {
        setEditingSectionId(null);
        setEditingSectionName('');
    }

    function addTodo(sectionId: string) {
        const todoText = newTodoText[sectionId];

        if (!todoText || !todoText.trim()) {
            return;
        }

        const newTodo: TodoItem = {
            id: Date.now().toString(),
            text: todoText.trim(),
            completed: false,
        };

        setSections(
            sections.map((section) => {
                if (section.id === sectionId) {
                    return { ...section, todos: [...section.todos, newTodo] };
                }
                return section;
            }),
        );

        setNewTodoText({ ...newTodoText, [sectionId]: '' });
    }

    function toggleTodo(sectionId: string, todoId: string) {
        setSections(
            sections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        todos: section.todos.map((todo) => {
                            if (todo.id === todoId) {
                                return { ...todo, completed: !todo.completed };
                            }
                            return todo;
                        }),
                    };
                }
                return section;
            }),
        );
    }

    function deleteTodo(sectionId: string, todoId: string) {
        setSections(
            sections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        todos: section.todos.filter((todo) => {
                            return todo.id !== todoId;
                        }),
                    };
                }
                return section;
            }),
        );
    }

    function clearCompletedTodos(sectionId: string) {
        setSections(
            sections.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        todos: section.todos.filter((todo) => {
                            return !todo.completed;
                        }),
                    };
                }
                return section;
            }),
        );
    }

    function moveSectionUp(sectionId: string) {
        const index = sections.findIndex((section) => {
            return section.id === sectionId;
        });
        if (index <= 0) {
            return;
        }

        const newSections = [...sections];
        const temp = newSections[index];
        newSections[index] = newSections[index - 1];
        newSections[index - 1] = temp;
        setSections(newSections);
    }

    function moveSectionDown(sectionId: string) {
        const index = sections.findIndex((section) => {
            return section.id === sectionId;
        });
        if (index === -1 || index >= sections.length - 1) {
            return;
        }

        const newSections = [...sections];
        const temp = newSections[index];
        newSections[index] = newSections[index + 1];
        newSections[index + 1] = temp;
        setSections(newSections);
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Head>
                <title>Todo App - Gourav Goyal</title>
                <meta
                    name="description"
                    content="A simple and elegant todo app with sections"
                />
                <style>{`
                    footer {
                        display: none !important;
                    }
                `}</style>
            </Head>

            <div className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-screen-md px-5">
                    <div className="flex items-center justify-between py-3">
                        <div className="text-lg font-bold text-slate-900">Todo App</div>
                        <Link
                            href="/"
                            className="text-sm text-slate-600 hover:text-orange-500">
                            ← Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-screen-md px-5">
                <div className="py-6">
                    <div className="mx-auto max-w-3xl">
                        {/* Add Section Form */}
                        <div className="mb-6 rounded-lg bg-white p-3 shadow-sm md:p-4">
                            <h2 className="mb-2 text-sm font-semibold text-slate-900">Add New Section</h2>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <input
                                    type="text"
                                    value={newSectionName}
                                    onChange={(e) => {
                                        setNewSectionName(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addSection();
                                        }
                                    }}
                                    placeholder="e.g., Shopping, Work Tasks, Personal"
                                    className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-200"
                                />
                                <button
                                    type="button"
                                    onClick={addSection}
                                    className="rounded bg-orange-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-300">
                                    Add Section
                                </button>
                            </div>
                        </div>

                        {/* Sections List */}
                        <div className="space-y-4">
                            {sections.length === 0 && (
                                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                                    <p className="text-sm text-slate-500">
                                        No sections yet. Create your first section to get started!
                                    </p>
                                </div>
                            )}

                            {sections.map((section, index) => {
                                const completedCount = section.todos.filter((todo) => {
                                    return todo.completed;
                                }).length;
                                const totalCount = section.todos.length;

                                return (
                                    <div
                                        key={section.id}
                                        className="rounded-lg bg-white p-3 shadow-sm md:p-4">
                                        {/* Section Header */}
                                        <div className="mb-3 flex items-start justify-between gap-2">
                                            {editingSectionId === section.id ? (
                                                <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                                                    <input
                                                        type="text"
                                                        value={editingSectionName}
                                                        onChange={(e) => {
                                                            setEditingSectionName(e.target.value);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                saveEditingSection();
                                                            }
                                                            if (e.key === 'Escape') {
                                                                cancelEditingSection();
                                                            }
                                                        }}
                                                        className="flex-1 rounded border border-slate-300 px-2 py-1 text-base font-semibold text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-200"
                                                        autoFocus={true}
                                                    />
                                                    <div className="flex gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={saveEditingSection}
                                                            className="rounded bg-green-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-600">
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={cancelEditingSection}
                                                            className="rounded bg-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-400">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex-1">
                                                        <h3 className="text-base font-semibold text-slate-900">
                                                            {section.name}
                                                        </h3>
                                                        {totalCount > 0 && (
                                                            <p className="text-xs text-slate-500">
                                                                {completedCount} of {totalCount} completed
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex shrink-0 gap-1">
                                                        <div className="flex flex-col gap-0.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    moveSectionUp(section.id);
                                                                }}
                                                                disabled={index === 0}
                                                                className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
                                                                title="Move up">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3.5 w-3.5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    moveSectionDown(section.id);
                                                                }}
                                                                disabled={index === sections.length - 1}
                                                                className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
                                                                title="Move down">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3.5 w-3.5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                startEditingSection(section.id, section.name);
                                                            }}
                                                            className="rounded bg-slate-200 p-1.5 text-slate-700 hover:bg-slate-300"
                                                            title="Edit section">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-3.5 w-3.5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor">
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </button>
                                                        {section.todos.some((todo) => {
                                                            return todo.completed;
                                                        }) && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    clearCompletedTodos(section.id);
                                                                }}
                                                                className="rounded bg-slate-200 p-1.5 text-slate-700 hover:bg-slate-300"
                                                                title="Clear completed">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3.5 w-3.5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                deleteSection(section.id);
                                                            }}
                                                            className="rounded bg-red-100 p-1.5 text-red-700 hover:bg-red-200"
                                                            title="Delete section">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-3.5 w-3.5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Add Todo Form */}
                                        <div className="mb-3 flex flex-col gap-2 sm:flex-row">
                                            <input
                                                type="text"
                                                value={newTodoText[section.id] || ''}
                                                onChange={(e) => {
                                                    setNewTodoText({
                                                        ...newTodoText,
                                                        [section.id]: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addTodo(section.id);
                                                    }
                                                }}
                                                placeholder="Add item..."
                                                className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addTodo(section.id);
                                                }}
                                                className="rounded bg-orange-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-300">
                                                Add Item
                                            </button>
                                        </div>

                                        {/* Todos List */}
                                        <div className="space-y-1.5">
                                            {section.todos.length === 0 && (
                                                <p className="py-3 text-center text-xs text-slate-400">
                                                    No items yet. Add your first item above!
                                                </p>
                                            )}

                                            {section.todos.map((todo) => {
                                                return (
                                                    <div
                                                        key={todo.id}
                                                        className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 p-2 transition-colors hover:border-slate-300">
                                                        <label className="flex flex-1 cursor-pointer items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={todo.completed}
                                                                onChange={() => {
                                                                    toggleTodo(section.id, todo.id);
                                                                }}
                                                                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-orange-500 focus:ring-1 focus:ring-orange-200"
                                                            />
                                                            <span
                                                                className={`flex-1 text-sm ${
                                                                    todo.completed
                                                                        ? 'text-slate-400 line-through'
                                                                        : 'text-slate-900'
                                                                }`}>
                                                                {todo.text}
                                                            </span>
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                deleteTodo(section.id, todo.id);
                                                            }}
                                                            className="text-slate-400 hover:text-red-600"
                                                            title="Delete item">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
