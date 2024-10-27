// @ts-check

import { router } from './router.mjs';
import { helper } from './helper.mjs';
import { callbacks } from './callbacks.mjs';
import { triggers } from './triggers.mjs';
import { send } from './send.mjs';
import { listen } from './listen.mjs';

/**
 * @description
 * - Vorth window object initialization
 * - use this as the type definition
 * ```js
 * /**
 * * @type {register}
 * *[blank]/
 * const vorth = window['vorthJS'];
 * /**
 * * @typedef {Record<string, string>} Data
 * * @typedef {(registerOptions:registerOptions)=>void} register
 * * @typedef {Object} registerOptions
 * * @property {(attributeValue:string)=>string} options.pathRule
 * * @property {()=>Promise<void>} [options.onRouteChange]
 * * - modify fetch end point from `v-path`;
 * * @property {Record<string, ()=>Promise<void>>} [options.triggers]
 * * @property {Record<string, ()=>Promise<{template:string, Data:Data}>>} [options.callbacks]
 * *[blank]/
 * ```
 * - donwload "/build/index.mjs" and load it on your all of your `*.html` files;
 **/
export class Vorth {
	/**
	 * @private
	 */
	static _ = new Vorth();
	/**
	 * @private
	 */
	constructor() {
		window[helper.windowMain] = Vorth.register;
	}
	/**
	 * @private
	 * @type {register}
	 */
	static register = ({ onRouteChange, pathRule, triggers: trg = undefined, callbacks: cb = undefined }) => {
		new router(onRouteChange);
		new callbacks(cb);
		new triggers(trg);
		new send();
		new listen(pathRule);
	};
}
