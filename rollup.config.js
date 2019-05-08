import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.jsx',
	output: {
		// sourcemap: true,
		format: 'iife',
		file: 'dist/main.js',
	},
	plugins: [
		babel({
      exclude: 'node_modules/**',
      plugins: [["jsx-dom-expressions", {moduleName: 'solid-js/dom'}]]
    }),
    resolve({ extensions: ['.js', '.jsx'] }),
		production && terser()
  ]
};