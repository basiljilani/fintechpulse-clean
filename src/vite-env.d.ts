// src/vite-env.d.ts should include API endpoint
interface ImportMetaEnv {
  readonly VITE_AWS_REGION: string
  readonly VITE_AWS_USER_POOL_ID: string
  readonly VITE_AWS_USER_POOL_CLIENT_ID: string
  readonly VITE_API_ENDPOINT: string  // Add this for API Gateway
}
