import { config } from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

config({ path: '.env.development.local' });

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: 'happy-dom',
    },
});
