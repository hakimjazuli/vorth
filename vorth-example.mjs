#!/usr/bin/env node
// @ts-check

import { xixth } from 'xixth';
import { writeFileSync, readFileSync } from 'fs';
import { vorthStarterShared } from './vorthStarterShared.mjs';

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
		'vorth-public': {
			src: 'public',
			dest: 'public',
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
	flagCallbacks: {
		async afterCopy() {
			const filePath = this.generateProjectAbsolutePath('jsconfig.json');
			try {
				const newConfig = vorthStarterShared.generateNewJSConfig(
					readFileSync(filePath, {
						encoding: 'utf-8',
					}).toString()
				);
				writeFileSync(filePath, newConfig, { encoding: 'utf-8' });
			} catch (error) {
				const newConfig = vorthStarterShared.generateNewJSConfig('{}');
				writeFileSync(filePath, newConfig, { encoding: 'utf-8' });
			}
		},
	},
});
