#!/usr/bin/env node
// @ts-check

import { xixth } from 'xixth';
import { shared } from 'vorth/src/shared.export.mjs';

let starterSucced = true;
const paths = shared.paths;

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
			src: 'vorth-src',
			dest: 'vorth-src',
			on: {
				async failed({ src, dest }) {
					console.error({ error: `failed to copy "${src}" to "${dest}"` });
					starterSucced = false;
				},
			},
		},
	},
	flagCallbacks: {
		async afterCopy() {
			if (!starterSucced) {
				return;
			}
			for (const path_ in paths) {
				const dir = this.generateProjectAbsolutePath(`vorth-src/${paths[path_]}`);
				try {
					await this.makeDir(dir);
				} catch (error) {
					console.log({ error, message: `unable to create "${dir}"` });
				}
			}
		},
	},
});
