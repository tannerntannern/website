import * as typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
	input: './src/ts/main.ts',
	output: {
		format: 'iife',
		file: './dist/js/main.js'
	},
	plugins: [
		typescriptPlugin({ typescript: typescript }),
		resolve(),
		commonjs(),
		uglify()
	]
}