import * as typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';

export default {
	entry: './src/ts/main.ts',
	format: 'iife',
	dest: './dist/js/main.js',
	plugins: [
		typescriptPlugin({
			typescript: typescript
		})
	]
}