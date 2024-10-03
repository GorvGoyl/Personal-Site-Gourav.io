import Link from 'next/link';
import { TerminalIcon } from './icons/TerminalIcon';

export function Hiring() {
    return (
        <div className="my-5 flex gap-2 rounded-sm bg-black px-3 py-2 font-mono text-sm text-green-500 underline-offset-4">
            <div>
                <TerminalIcon className="mt-0.5 h-4 w-4" />
            </div>{' '}
            <div>
                Hiring React Devs (in IST timezone) for my{' '}
                <Link
                    className="font-semibold text-green-500 underline"
                    target="_blank"
                    href={'https://chatgptwriter.ai'}>
                    AI Startup
                </Link>
                .{' '}
                <div>
                    Send resume:{' '}
                    <a
                        className="font-semibold text-green-500 underline"
                        href="mailto:gourav@chatgptwriter.ai">
                        gourav@chatgptwriter.ai
                    </a>{' '}
                </div>
            </div>
        </div>
    );
}
