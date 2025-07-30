import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Footer } from '../components/footer';
import { isProd } from '../lib/envVar';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <Footer />
                    <NextScript />
                    {/* Cloudflare Web Analytics */}
                    {isProd && (
                        <script
                            defer={true}
                            src="https://static.cloudflareinsights.com/beacon.min.js"
                            data-cf-beacon='{"token": "702a5606e5314d639a0f2dd9dece9422", "spa": true}'
                        />
                    )}
                </body>
            </Html>
        );
    }
}
