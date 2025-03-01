import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import laravelTranslations from "vite-plugin-laravel-translations";
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        laravelTranslations.default({
            includeJson: true,
            namespace: false,
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
        },
    },
});
