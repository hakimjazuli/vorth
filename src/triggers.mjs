// @ts-check

import { helper } from './helper.mjs';

export class triggers {
	/**
	 * @type {Record<string, (element:HTMLElement)=>Promise<void>>}
	 */
	static default = {
		load: async (element) => {},
		click: async (element) => {},
		hover: async (element) => {},
		shortCut: async (element) => {},
	};
	/**
	 * @type {triggers}
	 */
	static __;
	/**
	 * @param {import("./Vorth.mjs").registerOptions["triggers"]} triggers_
	 */
	constructor(triggers_) {
		if (triggers.__ instanceof triggers) {
			helper.singletonClass(this);
			return this;
		}
		triggers.__ = this;
	}
}
