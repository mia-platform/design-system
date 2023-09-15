// vite.config.ts
import autoprefixer from "file:///home/giovanni/design-system/node_modules/autoprefixer/lib/autoprefixer.js";
import { defineConfig } from "file:///home/giovanni/design-system/node_modules/vite/dist/node/index.js";
import dts from "file:///home/giovanni/design-system/node_modules/vite-plugin-dts/dist/index.mjs";
import react from "file:///home/giovanni/design-system/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import tsConfigPaths from "file:///home/giovanni/design-system/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { visualizer } from "file:///home/giovanni/design-system/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// package.json
var package_default = {
  name: "@mia-platform-internal/console-design-system-react",
  packageManager: "yarn@3.6.1",
  version: "0.0.8",
  type: "module",
  main: "dist/cjs/console-design-system-react.cjs",
  module: "dist/es/console-design-system-react.js",
  types: "dist/index.d.ts",
  description: "Mia Platform Design System",
  author: "Mia Platform Core Team <core@mia-platform.eu>",
  license: "Apache-2.0",
  contributors: [
    "Daniele Cin\xE0 <daniele.cina@mia-platform.eu>",
    "Davide Bianchi <davide.bianchi@mia-platform.eu>",
    "Giovanni Tommasi <giovanni.tommasi@mia-platform.eu>"
  ],
  repository: {
    type: "git",
    url: "https://github.com/mia-platform/design-system.git"
  },
  scripts: {
    dev: "vite",
    preview: "vite preview",
    build: "rm -rf ./dist -rf && tsc && vite build",
    lint: "eslint . --ext ts,tsx --report-unused-disable-directives --fix",
    checkonly: "find ./src -name '*.test.tsx' | xargs grep '\\.only'; test $? -eq 123",
    unit: "jest --watchAll",
    coverage: "yarn unit --coverage --watchAll=false --reporters=default",
    test: "yarn lint && yarn checkonly && yarn coverage",
    storybook: "storybook dev -p 6006",
    "build-storybook": "storybook build",
    addlicense: "addlicense -c 'Mia srl' -s -ignore src/**/*.ts",
    "check-license": "addlicense -c 'Mia srl' -check -s -ignore src/**/*.ts"
  },
  dependencies: {
    antd: "^5.8.2",
    "lodash.get": "^4.4.2",
    "lodash.isobject": "^3.0.2"
  },
  peerDependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0"
  },
  devDependencies: {
    "@mia-platform/eslint-config-mia": "^3.0.0",
    "@storybook/addon-a11y": "^7.4.0",
    "@storybook/addon-designs": "^7.0.5",
    "@storybook/addon-essentials": "^7.4.0",
    "@storybook/addon-interactions": "^7.4.0",
    "@storybook/addon-links": "^7.4.0",
    "@storybook/addon-onboarding": "^1.0.8",
    "@storybook/blocks": "^7.4.0",
    "@storybook/manager-api": "^7.4.0",
    "@storybook/react": "^7.4.0",
    "@storybook/react-vite": "^7.4.0",
    "@storybook/testing-library": "^0.2.0",
    "@storybook/theming": "^7.4.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^14.0.0",
    "@types/jest": "^29.5.3",
    "@types/lodash": "^4.14.196",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "@types/traverse": "^0.6.32",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react-swc": "^3.3.2",
    autoprefixer: "^10.4.15",
    classnames: "^2.3.2",
    eslint: "^8.45.0",
    "eslint-plugin-import": "^2.28.0",
    "eslint-plugin-react": "^7.33.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "eslint-plugin-storybook": "^0.6.13",
    jest: "^29.6.2",
    "jest-environment-jsdom": "^29.6.2",
    "jest-watch-typeahead": "^2.2.2",
    postcss: "^8.4.29",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "rollup-plugin-visualizer": "^5.9.2",
    storybook: "^7.4.0",
    traverse: "^0.6.7",
    "ts-jest": "^29.1.1",
    typescript: "^5.0.2",
    vite: "^4.4.5",
    "vite-plugin-dts": "^3.5.1",
    "vite-tsconfig-paths": "^4.2.0"
  },
  engines: {
    node: ">=18"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts(),
    tsConfigPaths(),
    visualizer()
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: package_default.name
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom"
      ],
      output: [
        {
          dir: "dist/cjs",
          format: "cjs",
          sourcemap: false
        },
        {
          dir: "dist/es",
          format: "es",
          sourcemap: false
        }
      ]
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvZ2lvdmFubmkvZGVzaWduLXN5c3RlbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZ2lvdmFubmkvZGVzaWduLXN5c3RlbS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9naW92YW5uaS9kZXNpZ24tc3lzdGVtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgdHNDb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcblxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGR0cygpLFxuICAgIHRzQ29uZmlnUGF0aHMoKSxcbiAgICB2aXN1YWxpemVyKCksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZSgnc3JjJywgJ2luZGV4LnRzJyksXG4gICAgICBuYW1lOiBwa2cubmFtZSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICdyZWFjdCcsXG4gICAgICAgICdyZWFjdC1kb20nLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDogW1xuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnZGlzdC9janMnLFxuICAgICAgICAgIGZvcm1hdDogJ2NqcycsXG4gICAgICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpcjogJ2Rpc3QvZXMnLFxuICAgICAgICAgIGZvcm1hdDogJ2VzJyxcbiAgICAgICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyXSxcbiAgICB9LFxuICB9LFxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcIkBtaWEtcGxhdGZvcm0taW50ZXJuYWwvY29uc29sZS1kZXNpZ24tc3lzdGVtLXJlYWN0XCIsXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJ5YXJuQDMuNi4xXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC44XCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcIm1haW5cIjogXCJkaXN0L2Nqcy9jb25zb2xlLWRlc2lnbi1zeXN0ZW0tcmVhY3QuY2pzXCIsXG4gIFwibW9kdWxlXCI6IFwiZGlzdC9lcy9jb25zb2xlLWRlc2lnbi1zeXN0ZW0tcmVhY3QuanNcIixcbiAgXCJ0eXBlc1wiOiBcImRpc3QvaW5kZXguZC50c1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiTWlhIFBsYXRmb3JtIERlc2lnbiBTeXN0ZW1cIixcbiAgXCJhdXRob3JcIjogXCJNaWEgUGxhdGZvcm0gQ29yZSBUZWFtIDxjb3JlQG1pYS1wbGF0Zm9ybS5ldT5cIixcbiAgXCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuICBcImNvbnRyaWJ1dG9yc1wiOiBbXG4gICAgXCJEYW5pZWxlIENpblx1MDBFMCA8ZGFuaWVsZS5jaW5hQG1pYS1wbGF0Zm9ybS5ldT5cIixcbiAgICBcIkRhdmlkZSBCaWFuY2hpIDxkYXZpZGUuYmlhbmNoaUBtaWEtcGxhdGZvcm0uZXU+XCIsXG4gICAgXCJHaW92YW5uaSBUb21tYXNpIDxnaW92YW5uaS50b21tYXNpQG1pYS1wbGF0Zm9ybS5ldT5cIlxuICBdLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL21pYS1wbGF0Zm9ybS9kZXNpZ24tc3lzdGVtLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJidWlsZFwiOiBcInJtIC1yZiAuL2Rpc3QgLXJmICYmIHRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1maXhcIixcbiAgICBcImNoZWNrb25seVwiOiBcImZpbmQgLi9zcmMgLW5hbWUgJyoudGVzdC50c3gnIHwgeGFyZ3MgZ3JlcCAnXFxcXC5vbmx5JzsgdGVzdCAkPyAtZXEgMTIzXCIsXG4gICAgXCJ1bml0XCI6IFwiamVzdCAtLXdhdGNoQWxsXCIsXG4gICAgXCJjb3ZlcmFnZVwiOiBcInlhcm4gdW5pdCAtLWNvdmVyYWdlIC0td2F0Y2hBbGw9ZmFsc2UgLS1yZXBvcnRlcnM9ZGVmYXVsdFwiLFxuICAgIFwidGVzdFwiOiBcInlhcm4gbGludCAmJiB5YXJuIGNoZWNrb25seSAmJiB5YXJuIGNvdmVyYWdlXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgZGV2IC1wIDYwMDZcIixcbiAgICBcImJ1aWxkLXN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBidWlsZFwiLFxuICAgIFwiYWRkbGljZW5zZVwiOiBcImFkZGxpY2Vuc2UgLWMgJ01pYSBzcmwnIC1zIC1pZ25vcmUgc3JjLyoqLyoudHNcIixcbiAgICBcImNoZWNrLWxpY2Vuc2VcIjogXCJhZGRsaWNlbnNlIC1jICdNaWEgc3JsJyAtY2hlY2sgLXMgLWlnbm9yZSBzcmMvKiovKi50c1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImFudGRcIjogXCJeNS44LjJcIixcbiAgICBcImxvZGFzaC5nZXRcIjogXCJeNC40LjJcIixcbiAgICBcImxvZGFzaC5pc29iamVjdFwiOiBcIl4zLjAuMlwiXG4gIH0sXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAbWlhLXBsYXRmb3JtL2VzbGludC1jb25maWctbWlhXCI6IFwiXjMuMC4wXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWExMXlcIjogXCJeNy40LjBcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tZGVzaWduc1wiOiBcIl43LjAuNVwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1lc3NlbnRpYWxzXCI6IFwiXjcuNC4wXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWludGVyYWN0aW9uc1wiOiBcIl43LjQuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1saW5rc1wiOiBcIl43LjQuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1vbmJvYXJkaW5nXCI6IFwiXjEuMC44XCIsXG4gICAgXCJAc3Rvcnlib29rL2Jsb2Nrc1wiOiBcIl43LjQuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9tYW5hZ2VyLWFwaVwiOiBcIl43LjQuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdFwiOiBcIl43LjQuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdC12aXRlXCI6IFwiXjcuNC4wXCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RpbmctbGlicmFyeVwiOiBcIl4wLjIuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay90aGVtaW5nXCI6IFwiXjcuNC4wXCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L2plc3QtZG9tXCI6IFwiXjUuMTcuMFwiLFxuICAgIFwiQHRlc3RpbmctbGlicmFyeS9yZWFjdFwiOiBcIl4xNC4wLjBcIixcbiAgICBcIkB0eXBlcy9qZXN0XCI6IFwiXjI5LjUuM1wiLFxuICAgIFwiQHR5cGVzL2xvZGFzaFwiOiBcIl40LjE0LjE5NlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMjFcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi43XCIsXG4gICAgXCJAdHlwZXMvdHJhdmVyc2VcIjogXCJeMC42LjMyXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl42LjAuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl42LjAuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMy4yXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNVwiLFxuICAgIFwiY2xhc3NuYW1lc1wiOiBcIl4yLjMuMlwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNDUuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yOC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzMuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC4zXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXN0b3J5Ym9va1wiOiBcIl4wLjYuMTNcIixcbiAgICBcImplc3RcIjogXCJeMjkuNi4yXCIsXG4gICAgXCJqZXN0LWVudmlyb25tZW50LWpzZG9tXCI6IFwiXjI5LjYuMlwiLFxuICAgIFwiamVzdC13YXRjaC10eXBlYWhlYWRcIjogXCJeMi4yLjJcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjI5XCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjkuMlwiLFxuICAgIFwic3Rvcnlib29rXCI6IFwiXjcuNC4wXCIsXG4gICAgXCJ0cmF2ZXJzZVwiOiBcIl4wLjYuN1wiLFxuICAgIFwidHMtamVzdFwiOiBcIl4yOS4xLjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4wLjJcIixcbiAgICBcInZpdGVcIjogXCJeNC40LjVcIixcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIl4zLjUuMVwiLFxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMFwiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xOFwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsT0FBTyxrQkFBa0I7QUFDL1IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxrQkFBa0I7OztBQ04zQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsZ0JBQWtCO0FBQUEsRUFDbEIsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsTUFBUTtBQUFBLEVBQ1IsUUFBVTtBQUFBLEVBQ1YsT0FBUztBQUFBLEVBQ1QsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLEVBQ1YsU0FBVztBQUFBLEVBQ1gsY0FBZ0I7QUFBQSxJQUNkO0FBQUEsSUFD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
