#!/usr/bin/env node
// @ts-check

import { xixth } from 'xixth';
import { __vorthApp } from 'vorth/src/__vorthApp.mjs';

new xixth({
	packageName: 'vorth',
	flagCallbacks: {
		async beforeCopy() {
			const configPath = this.generateProjectAbsolutePath('vorth.config.mjs');
			try {
				const config = (await import(configPath)).default;
				new __vorthApp(config);
			} catch (error) {
				try {
					const config = (await import(`file://${configPath}`)).default;
					new __vorthApp(config);
				} catch (error) {
					console.error(error);
					return;
				}
			}
		},
	},
});
