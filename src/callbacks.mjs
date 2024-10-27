// @ts-check

import { helper } from './helper.mjs';

export class callbacks {
	/**
	 * @type {callbacks}
	 */
	static __;
	/**
	 * @param {import("./Vorth.mjs").registerOptions["callbacks"]} callbacks_
	 */
	constructor(callbacks_) {
		if (callbacks.__ instanceof callbacks) {
			helper.singletonClass(this);
			return this;
		}
		callbacks.__ = this;
	}
}
