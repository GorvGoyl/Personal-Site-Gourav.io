import Link from 'next/link';
import { Button } from '../Button';

export function Notepad() {
    return (
        <Link href="/devtools/notepad">
            <Button
                onClick={() => {
                    // Link handles navigation
                }}>
                📝 Notepad
            </Button>
        </Link>
    );
}
