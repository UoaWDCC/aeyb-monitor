/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | number | undefined>> {
    readonly VITE_APP_TITLE: string;
    readonly BASE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
