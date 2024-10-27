// @ts-check

import { helper } from './helper.mjs';

export class listen {
	/**
	 * @type {listen}
	 */
	static __;
	/**
	 * @param {import('./Vorth.mjs').registerOptions["pathRule"]} pathRule
	 */
	constructor(pathRule) {
		if (listen.__ instanceof listen) {
			helper.singletonClass(this);
			return this;
		}
		listen.__ = this;
	}
}
