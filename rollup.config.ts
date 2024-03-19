import { defineConfig } from 'rollup';
import typescript2 from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  {
    input: ['src/index.ts'],
    external: ['unplugin-vue-components'],

    output: [
      {
        format: 'esm',
        dir: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      {
        format: 'cjs',
        dir: 'lib',
        preserveModules: true,
        preserveModulesRoot: 'src',
        interop: 'compat'
      }
    ],
    plugins: [dts()]
  },
  {
    input: ['src/index.ts'],
    external: ['unplugin-vue-components'],
    output: [
      {
        format: 'esm',
        dir: 'es',
        entryFileNames: '[name].mjs',
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      {
        format: 'cjs',
        dir: 'lib',
        entryFileNames: '[name].cjs',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],
    plugins: [
      typescript2({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      })
    ]
  }
]);
