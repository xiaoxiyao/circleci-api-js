import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      sourcemap: true,
      file: 'dist/bundle.cjs.js',
    },
    {
      format: 'es',
      sourcemap: true,
      file: 'dist/bundle.esm.js',
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      rootDir: 'src',
      declarationDir: 'dist/types',
    }),
  ],
} satisfies RollupOptions
