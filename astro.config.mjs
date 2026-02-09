import { defineConfig } from 'astro/config';
import icon from 'astro-icon'; // 1. Import the integration

export default defineConfig({
  // 2. Add it to the array
  integrations: [
    icon(),
  ],
});