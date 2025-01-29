/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
        },
    },
    test: {
        globals: true,
        environment: 'node',
        include: ['test/**/*.e2e-spec.ts'],
        setupFiles: ['test/setup.ts'],
    },
});
