/// <reference types="vite/client" /> interface ImportMeta { readonly env: ImportMetaEnv }
interface Env {
  /**
   * API URL
   */
  readonly VITE_API_URL: string;
}

/**
 * Project configuration
 */
export const ENV: Env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};
