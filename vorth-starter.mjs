#!/usr/bin/env node
// @ts-check

import { xixth } from 'xixth';

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
				},
			},
		},
	},
});
