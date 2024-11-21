/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_GATEWAY: string;
  readonly CLIENT_ID: string;
  readonly REGION: string;
  readonly USER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}