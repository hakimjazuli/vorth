// @ts-check

import { helper } from './helper.mjs';

export class router {
	/**
	 * @type {router}
	 */
	static __;
	/**
	 * @param {()=>Promise<void>} onChange
	 */
	constructor(onChange) {
		if (router.__ instanceof router) {
			helper.singletonClass(this);
			return this;
		}
		router.__ = this;
	}
}
