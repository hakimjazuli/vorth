// @ts-check

import { $, Derived, Let, Lifecycle } from 'virst';

/**
 * @description
 * how to use:
 * - download the `prebundled.mjs`, and load it on your html:
 * ```html
 * <script type="module" src="/path/to/the/prebundled.mjs"></script>
 * ```
 * - add this `meta tag` on your `html` `head`:
 * ```html
 * <meta property="vorth" content="/your/prefix/path/" />
 * ```
 * > - `/your/prefix/path/` as in prefix for path of `vorth` function located;
 * - add `vorth` and `your/relative/path/function` as attribute on the element:
 * ```html
 * <div vorth="your/relative/path/function"></div>
 * ```
 * > - meaning it will target `/your/prefix/path/your/relative/path/function.mjs`;
 * > - as some `build` might bundle or rename `.js` in its production buld, we only support `.mjs` file;
 * - element lifecycle paste this type helper on `/your/prefix/path/your/relative/path/function.mjs`:
 * ```js
 * /**
 *  * @typedef {{value:any,call$:()=>void,remove$:(effect:{effect:()=>void})=>void}} signalRef_
 *  * @typedef {Object} onViewPortInstance
 *  * @property {() => Promise<void>} disconnect
 *  * @property {(element: Element | HTMLElement) => onViewPortHandler} handlers
 *  * @typedef {Object} onViewPortHandler
 *  * @property {()=>void} removeOnExitViewCallback
 *  * @property {()=>void} removeOnViewCallback
 *  * @property {()=>void} unobserveElement
 *  * @typedef {elementsLCCallbacks & { element: HTMLElement }} elementsCallbacks
 *  * @typedef {(isAtInitialization:boolean)=>Promise<void>} effectCallback
 *  * @typedef {Object} elementsLCCallbacks
 *  * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 *  * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 *  * @property {mrefOptions["onDisconnected"][]} lifecyclesOnDisconnected
 *  * @typedef {(options:{attributeName:string, newValue:string})=>Promise<void>} attributeChangedLifecycle
 *  * @typedef {Object} mrefOptions
 *  * @property {HTMLElement} element
 *  * @property {boolean} isConnected
 *  * @property {(strings:TemplateStringsArray,...values:string[])=>void} html
 *  * - control innerHTML using `templateLiteral`
 *  * @property {(arg0:attributeChangedLifecycle)=>void} onAttributeChanged
 *  * @property {(arg0:()=>Promise<void>)=>void} onDisconnected
 *  * @property {(elementsCallbacks:elementsLCCallbacks)=>onViewPortInstance} onViewPort
 *  * @property {(effect:effectCallback)=>{effect:effectCallback}} $
 *  * - effect to monitor data changes;
 *  * @property {(relativePath:string)=>Promise<signalRef_|false>} signalRef
 *  * @typedef {(mrefOptions:mrefOptions)=>Promise<void>} vorth
 *  * @type {vorth}
 *  *[blank]/
 *	export default async ( { ...options } )=>{
 *		// replace ...option with properties that you need;
 *		// your js code;
 *	}
 * ```
 * > - `html` method can be called using html\`yourHMTLLiteral\`;
 * > - recommended to install `lit-plugin` in vs-code for syntax highlighting;
 * - for data layer, on the `/your/prefix/path/your/relative/path/signal.mjs`, export default of `any` type:
 * ```js
 * export default '';
 * // or
 * export default 1;
 * // or
 * export default [];
 * // or
 * export default { data: 'anything' };
 * // or
 * /**
 *  * @param {Promise<{value:any,call$:()=>void, remove$:()=>void}|false>} importData
 *  *[blank]/
 * export default async (importData) => {
 *  // must return with `any` type;
 * };
 * ```
 * > - which you can reference with `mrefOptions.signalRef` on the relative path it's pointing to;
 * > - in the `mrefOptions.$`, you can reference return value of `mrefOptions.signalRef`, to create `effects`, which is a `callback` that will be called everytime there's changes on the value of that `reference` called in the `$` `callback` parameter, unless it's nested value like array(using array modification method) or object, in wich you need to fire `call$` in the element lifecyle, unless you want to use reassignment syntax using spreading operator;
 * > - the destructured { value } returned `mrefOptions.signalRef`, can be reassigned to trigger changes, except the endpoint that are exporting function type;
 * > > - the function type is to tell `Vorth` that this is a `derived` `signal`, that are dependent on other `signal`;
 * ## documentation for signal
 * refer to [virst](https://www.npmjs.com/package/virst):
 * - [Let](https://www.npmjs.com/package/virst#let) for exported data;
 * - [Derived](https://www.npmjs.com/package/virst#derived) for derived function data;
 * - [$](https://www.npmjs.com/package/virst#$) for effect `$`;
 */
export class Vorth {
	/**
	 * @type {Vorth}
	 */
	static __;
	constructor() {
		if (Vorth.__ instanceof Vorth) {
			return;
		}
		Vorth.__ = this;
		this.setBase();
		this.mRefLifecycle();
	}
	/**
	 * @private
	 * @type {string}
	 */
	cacheDate = `?t=${Date.now()}`;
	/**
	 * @private
	 * @type {Map<string, vorth>}
	 */
	chacedRef = new Map();
	/**
	 * @private
	 * @type {Map<string, Let<any>>}
	 */
	cachedLet = new Map();
	/**
	 * @private
	 * @returns {void}
	 */
	setBase = () => {
		const attributeName = 'property';
		new Lifecycle({
			attributeName,
			documentScope: document,
			onConnected: async ({ element, onAttributeChanged }) => {
				const handler = async () => {
					const checkProperty = element.getAttribute(attributeName);
					if (!(element instanceof HTMLMetaElement)) {
						return;
					}
					if (checkProperty !== 'vorth') {
						return;
					}
					const checkContent = element.getAttribute('content');
					if (!checkContent) {
						return;
					}
					this.base = checkContent;
				};
				onAttributeChanged(async ({ attributeName }) => {
					if (attributeName !== 'content') {
						return;
					}
					await handler();
				});
				await handler();
			},
		});
	};
	/**
	 * @private
	 * @param {string} importPath
	 * @returns {Promise<vorth|false>}
	 */
	importVorth = async (importPath) => {
		const ref = this.chacedRef.get(importPath);
		if (ref) {
			return ref;
		}
		const path_ = `${this.base}${importPath}.mjs`;
		try {
			const newRef = (await import(`${path_}${this.cacheDate}`)).default;
			this.chacedRef.set(importPath, newRef);
			return newRef;
		} catch (error) {
			console.error({
				path: path_,
				code: 404,
				error: 'not found',
				message: 'importVorth pointing to invalid endpoint',
			});
			return false;
		}
	};
	/**
	 * @private
	 * @type {string}
	 */
	base = '';
	/**
	 * @private
	 * @param {string} relativePath
	 * @returns {Promise<signalRef_|false>}
	 */
	signalRef = async (relativePath) => {
		const signal = this.cachedLet.get(relativePath);
		if (signal) {
			// @ts-ignore
			return signal;
		}
		const path_ = `${this.base}${relativePath}.mjs`;
		try {
			const newRef = (await import(`${path_}${this.cacheDate}`)).default;
			if (typeof newRef === 'function') {
				this.cachedLet.set(relativePath, new Derived(newRef));
			}
			this.cachedLet.set(relativePath, new Let(newRef));
			return newRef;
		} catch (error) {
			console.error({
				path: path_,
				code: 404,
				error: 'not found',
				message: 'signalRef pointing to invalid endpoint',
			});
			return false;
		}
	};
	/**
	 * @private
	 * @return {void}
	 */
	mRefLifecycle = () => {
		const attributeName = 'vorth';
		new Lifecycle({
			attributeName,
			bypassNested: true,
			documentScope: document,
			onConnected: async ({
				element,
				html,
				isConnected,
				onAttributeChanged,
				onDisconnected,
				onViewPort,
			}) => {
				const path_ = element.getAttribute(attributeName);
				if (!path_) {
					return;
				}
				const vorth = await this.importVorth(path_);
				if (!vorth) {
					return;
				}
				await vorth({
					element,
					html,
					isConnected,
					onAttributeChanged,
					onDisconnected,
					onViewPort,
					$: (effect) => new $(effect),
					signalRef: this.signalRef,
				});
			},
		});
	};
}
