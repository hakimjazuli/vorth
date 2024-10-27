// @ts-check

import { helper } from './helper.mjs';

export class send {
	/**
	 * @type {send}
	 */
	static __;
	constructor() {
		if (send.__ instanceof send) {
			helper.singletonClass(this);
			return this;
		}
		send.__ = this;
	}
}
