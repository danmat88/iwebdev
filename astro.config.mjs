import { defineConfig } from 'astro/config';
import icon from 'astro-icon'; // 1. Import the integration

export default defineConfig({
  integrations: [
    icon(),
  ],
});