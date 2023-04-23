/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | number | undefined>> {
    readonly VITE_BASE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
