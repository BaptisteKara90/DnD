
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.{graphql,ts,tsx}",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
