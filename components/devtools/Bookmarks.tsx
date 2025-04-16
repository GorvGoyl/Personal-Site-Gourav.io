import { useState } from 'react';
import { Button } from '../Button';
import { Popup } from '../Popup';
import { ArrowNorthEastIcon } from '../icons/ArrowNorthEastIcon';

export function Bookmarks() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpen(true);
                }}>
                🔖 Bookmarks
            </Button>

            <Popup
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}>
                <div className="w-[400px] space-y-4">
                    <h2 className="text-xl font-semibold">🔖 Bookmarks</h2>

                    <section>
                        <h3 className="mb-2 text-lg font-medium">LLM Leaderboards</h3>
                        <ul className="list-inside list-disc space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://lmarena.ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800">
                                    LMSys Leaderboard <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://web.lmarena.ai/leaderboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800">
                                    LMSys Dev Leaderboard <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://aider.chat/docs/leaderboards/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800">
                                    Aider Dev Leaderboard <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://artificialanalysis.ai/leaderboards/models"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800">
                                    ArtificialAnalysis Leaderboard{' '}
                                    <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-2 text-lg font-medium">LLM Provider Links</h3>
                        <div className="flex flex-row justify-between gap-2 pt-2 text-sm">
                            <div className="flex flex-col space-y-1">
                                <h4 className="font-semibold text-neutral-700">OpenAI</h4>
                                <a
                                    href="https://platform.openai.com/docs/pricing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline hover:text-blue-800">
                                    Pricing <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                                <a
                                    href="https://platform.openai.com/docs/models"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline hover:text-blue-800">
                                    Models <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <h4 className="font-semibold text-neutral-700">Claude</h4>
                                <a
                                    href="https://www.anthropic.com/pricing#anthropic-api"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline hover:text-blue-800">
                                    Pricing <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                                <a
                                    href="https://docs.anthropic.com/en/docs/about-claude/models/all-models#model-comparison-table"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline hover:text-blue-800">
                                    Models <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <h4 className="font-semibold text-neutral-700">Gemini</h4>
                                <a
                                    href="https://ai.google.dev/pricing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline hover:text-blue-800">
                                    Pricing <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                                <a
                                    href="https://ai.google.dev/gemini-api/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 underline hover:text-blue-800">
                                    Models <ArrowNorthEastIcon className="inline-block h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </Popup>
        </>
    );
}
