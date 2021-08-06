import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

import packageJSON from "./package.json"
import { updateModuleDeclaration } from "typescript";

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJSON.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJSON.module,
                format: "esm",
                sourcemap: true
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ useTsconfigDeclarationDir: true }),
            postcss()
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJSON.browser,
                format: 'umd',
                name: 'lifeline',
                globals: {
                    react: 'React'
                },
                external: ['react'],
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ useTsconfigDeclarationDir: true }),
            postcss()
        ]
    }];