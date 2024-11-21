/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REGION: string;
    readonly USER_ID: string;
    readonly CLIENT_ID: string;
    readonly API_GATEWAY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }