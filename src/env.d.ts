/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// モジュール型定義
declare module "vue3-mq";

interface ImportMetaEnv {
  readonly VITE_DB_API_KEY: string
  readonly VITE_DB_AUTH_DOMAIN: string
  readonly VITE_DB_PROJECT_ID: string
  readonly VITE_DB_STORAGE_BUCKET: string
  readonly VITE_DB_MESSAGING_SENDER_ID: string
  readonly VITE_DB_APP_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}