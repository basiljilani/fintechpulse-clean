/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly Region: string
    readonly User-ID: string
    readonly Client-ID: string
    readonly API-Gateway: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }