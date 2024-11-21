/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly USER_ID: string;
  readonly CLIENT_ID: string;
  readonly REGION: string;
  readonly API_GATEWAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
