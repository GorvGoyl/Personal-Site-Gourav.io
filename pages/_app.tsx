import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '../styles/tailwind.scss';

import { useEffect } from 'react';
import { isProd } from '../lib/envVar';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (isProd) {
            console.log(
                '%cBuilt with Next.js (React), Typescript, Tailwind CSS | Blog content using Notion and Markdown | Deployed on Vercel',
                'color: #6af549; font-size: 14px; background: #282c34;',
            );
            console.log('%cSource-code: https://github.com/GorvGoyl/Personal-Site-Gourav.io', ' font-size: 14px;');
        }
    }, []);
    return (
        <div className={inter.className}>
            <Component {...pageProps} />
        </div>
    );
}

export default App;
