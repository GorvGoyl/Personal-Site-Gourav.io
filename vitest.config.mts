import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

config({ path: '.env.development.local' });

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        environment: 'jsdom',
    },
});
