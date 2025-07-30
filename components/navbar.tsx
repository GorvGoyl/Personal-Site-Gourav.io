import Link from 'next/link';
import { usePath } from '../hooks/customHooks';

export enum Links {
    Blog,
}
function NavItem(props: { href: string; title: string; text: string; className?: string }) {
    return (
        <Link
            href={props.href}
            className={`inline-block px-2 py-4 ${props.className}`}
            title={props.title}>
            {props.text === 'Gourav Goyal' ? (
                <div
                    className={`bg-clip-text font-semibold tracking-wide text-transparent`}
                    style={{
                        backgroundImage: 'linear-gradient(90deg,#ff4d4d,#f9cb28)',
                    }}>
                    {props.text}
                </div>
            ) : (
                <div>{props.text}</div>
            )}
        </Link>
    );
}
export function Navbar(Props: { link?: Links }) {
    const page = usePath();
    // page !== "/blog"
    return (
        <nav className="mb-12 flex justify-end border-b-2 text-xl">
            <div className="mr-auto">
                <NavItem
                    href="/"
                    title="Home"
                    className="no-underline hover:no-underline"
                    text="Gourav Goyal"
                />
            </div>
            {Props.link === Links.Blog && (
                <div>
                    <NavItem
                        href="/blog"
                        title="Blog"
                        text="Blog"
                    />
                </div>
            )}
        </nav>
    );
}
