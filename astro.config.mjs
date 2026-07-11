// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://launionsrl.com.ar',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],
  env: {
    schema: {
      SCHEDULES: envField.string({ context: "server", access: "public", optional: true }),
      PHONE: envField.string({ context: "server", access: "public", optional: true }),
      PHONE_FORMAT: envField.string({ context: "server", access: "public", optional: true }),
      ADDRESS: envField.string({ context: "server", access: "public", optional: true }),
      MAP_IFRAME: envField.string({ context: "server", access: "public", optional: true }),
      MAP_URL: envField.string({ context: "server", access: "public", optional: true }),
      WHATSAPP_PHONE: envField.string({ context: "client", access: "public", optional: true }),
      EMAIL: envField.string({ context: "client", access: "public", optional: true }),
      SECRET_KEY: envField.string({ context: "client", access: "public", optional: true }),
      SITE_KEY: envField.string({ context: "client", access: "public", optional: true }),
      ENDPOINT: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});