#!/usr/bin/env node
// @ts-check

import { join } from 'path';
import { xixth } from 'xixth';
import { shared } from './src/shared.export.mjs';

new xixth({
	packageName: 'vorth',
	pathCopyHandlers: {
		'vorth-snippet': {
			src: '.vscode',
			dest: '.vscode',
			on: {
				async failed({ src, dest }) {
					console.error({ error: `failed to copy "${src}" to "${dest}"` });
				},
			},
		},
		'vorth-config': {
			src: 'vorth.config.mjs',
			dest: 'vorth.config.mjs',
			on: {
				async failed({ src, dest }) {
					console.error({ error: `failed to copy "${src}" to "${dest}"` });
				},
			},
		},
		'starter-project': {
			src: 'vorth-src/vorthInitiator.mjs',
			dest: 'vorth-src/vorthInitiator.mjs',
			on: {
				async failed({ src, dest }) {
					console.error({ error: `failed to copy "${src}" to "${dest}"` });
				},
			},
		},
	},
	flagCallbacks: {
		async afterCopy() {
			const paths = shared.paths;
			for (const path_ in paths) {
				this.makeDir(this.generateProjectAbsolutePath(join('vorth-src', paths[path_])));
			}
		},
	},
});
