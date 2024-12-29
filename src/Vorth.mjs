// @ts-check

import { $, Derived, Let, Lifecycle, Ping } from 'virst';

/**
 * @description
 * how to use:
 * - download the `prebundled.mjs`, and load it on your html:
 * ```html
 * <script type="module" src="/your/vort_root/path/prebundled.mjs"></script>
 * ```
 * - add `vorth` and `your/relative/path/module` as `attribute` on the element:
 * ```html
 * <div vorth="your/relative/path/module"></div>
 * ```
 * - `vorthLifecycle`: paste this type helper on `/your/vort_root/path/lifecycles/your/relative/path/module.mjs`(the `lifecycles/` is fixed path):
 * ```js
 * /**
 * * @typedef {(...args:any)=>Promise<any>} importedLib
 * * @typedef {Record<string, any>|Array|string|number|boolean} returnOfSignal
 * * @typedef {{value:returnOfSignal,call$:()=>void,remove$:(effect:{effect:()=>void})=>void}} signalRef_
 * * @typedef {Object} onViewPortInstance
 * * @property {() => Promise<void>} disconnect
 * * @property {(element: Element | HTMLElement) => onViewPortHandler} handlers
 * * @typedef {Object} onViewPortHandler
 * * @property {()=>void} removeOnExitViewCallback
 * * @property {()=>void} removeOnViewCallback
 * * @property {()=>void} unobserveElement
 * * @typedef {(isAtInitialization:boolean)=>Promise<void>} effectCallback
 * * @typedef {Object} elementsLCCallbacks
 * * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 * * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 * * @property {mrefOptions["onDisconnected"][]} lifecyclesOnDisconnected
 * * @typedef {Object} mrefOptions
 * * @property {HTMLElement} element
 * * @property {boolean} isConnected
 * * @property {(strings:TemplateStringsArray,...values:string[])=>void} html
 * * - control innerHTML using `templateLiteral`;
 * * @property {(arg0:(options:{attributeName:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged
 * * @property {(arg0:()=>Promise<void>)=>void} onDisconnected
 * * @property {(elementsCallbacks:elementsLCCallbacks)=>onViewPortInstance} onViewPort
 * * @property {(effect:effectCallback)=>{effect:effectCallback}} $
 * * - to create `effect` on data changes;
 * * @property {(relativePath:string)=>Promise<signalRef_|false>} importData
 * * @property {(relativePath:string)=>Promise<importedLib|false>} importLib
 * * @property {(options:{dataOnly:returnOfSignal}|{attributeName:string, data:returnOfSignal})=>signalRef_|false} let_
 * * @property {(options:{dataOnly:()=>Promise<returnOfSignal>}|{attributeName:string, data:()=>Promise<returnOfSignal>})=>signalRef_|false} derived
 * * @property {string} loopedAttrName
 * * @property {()=>{[key:string]:string}} parsedLoopedAttr
 * * @property {(options:{signal:signalRef_, childLifescyclePath:string, afterLoopCallback?:()=>Promise<void>,element?:HTMLElement})=>void} for_
 * * @typedef {(mrefOptions:mrefOptions)=>Promise<void>} vorthLifecycle
 * *[blank]/
 * /** [blank]@type {vorthLifecycle} *[blank]/
 *	export default async ( { ...options /** replace ...option with properties that you need;  *[blank]/ } )=>{
 *		// your js code;
 *	}
 * ```
 * > - for `onDisconnected` `event`, there's no need for manual clean-up on `let_` and `derived`, as both are automatically `unRefed`, when this `event` is triggered;
 * > - `for_`:
 * > > - `element` if not filled will refer to current `lifecycle` `element`;
 * > > - `signal` `value` `type` should be `{[key:string]:string}[]`;
 * > - `html` method can be called using html\`yourHMTLLiteral\`;
 * > - recommended to install `lit-plugin` in vs-code for syntax highlighting;
 * > - in real `runtime` the path will be something like:
 * > > - `/assets/js/modules/lifecycles/my_module.mjs`;
 * > > - `/assets/js/modules/data/my_data.mjs`;
 * - `vorthData`: for data layer, on the `/your/vort_root/path/data/your/relative/path/signal.mjs`(the `data/` is fixed path):
 * ```js
 * /**
 * * @typedef {{value:any,call$:()=>void,remove$:(effect:{effect:()=>void})=>void}} signalRef__
 * * @typedef {{data:{let:Record<string, any>|Array|string|number|boolean},storeMode:false|'localStorage'|'sessionStorage'}|{data:{derived:((a0:{importData:(relativePath:string)=>Promise<signalRef__|false>,importLib:(relativePath:string)=>Promise<((...args:any)=>Promise<any>)|false>})=>Promise<Record<string, any>|Array|string|number|boolean>)}}} vorthData
 * *[blank]/
 * /** [blank]@type {vorthData} *[blank]/
 * export default { storeMode: false, data: {...option} }
 * ```
 * > - which you can reference with `mrefOptions.signalRef` on the relative path it's pointing to;
 * > - the destructured { value } returned from `mrefOptions.signalRef`, can be reassigned to trigger `changes`, except the endpoint that are `derived`;
 * > - in the `mrefOptions.$`, you can reference return value of `mrefOptions.signalRef`, to create `effects`, which is a `callback` that will be called everytime there's `changes` on the value of that `reference` called in the `$` `callback` parameter, unless it's nested value like array(using array modification method) or object, in wich you need to fire `call$` in the element lifecyle, unless you want to use reassignment syntax using spreading operator;
 * ```js
 * // in vorthLifecycle scope
 * const signal = let_([1,2,3]); // or from signalRef;
 * signal.value.push(4);
 * signal.call$();
 * // will have the same effect of
 * signal.value = [ ...signal.value, 1 ];
 * // the spreading operator also works on object type
 * // const signal = let_({ data1:'1', data2:'2' }); // or from signalRef;
 * // signal.value = { ...signal.value, newKey:'value' };
 * $(async (isAtInitialization) => {
 *		const value = signal.value;
 *		// if (isAtInitialization) {
 *		//	return;
 *		// } // uncomment this to stop any further signal autosubscribing bellow this point
 *		console.console.log(value);
 * });
 * ```
 * - `vorthLib`: for data layer, on the `/your/vort_root/path/libs/your/relative/path/lib.mjs`(the `libs/` is fixed path):
 * ```js
 * /**
 * * @typedef {(...args:any)=>Promise<any>} vorthLib
 * *[blank]/
 * /** @type {vorthLib} *[blank]/
 * export default async () => {
 * 	// js code
 * }
 * ```
 * > - which you can use by using `importLib` on multiple `lifecycle` or `derived` `data`;
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
		this.setDate();
		this.setBase();
		this.vorthLifecycle();
	}
	/**
	 * @private
	 * @returns {void}
	 */
	setDate = () => {
		const key = 'vorth-now';
		let now = sessionStorage.getItem(key);
		if (now) {
			this.cacheDate = now;
			return;
		}
		now = `?t=${Date.now()}`;
		sessionStorage.setItem(key, now);
		this.cacheDate = now;
		return;
	};
	/**
	 * @type {string}
	 */
	cacheDate;
	/**
	 * @private
	 * @type {Map<string, vorthLifecycle>}
	 */
	chacedRef = new Map();
	/**
	 * @private
	 * @type {Map<string, vorthData & {signal:Derived|Let}>}
	 */
	cachedLet = new Map();
	/**
	 * @private
	 * @type {Map<string, importedLib>}
	 */
	cachedLib = new Map();
	/**
	 * @private
	 * @returns {void}
	 */
	setBase = () => {
		this.base = new URL('./', import.meta.url).href;
	};
	/**
	 * @private
	 * @param {string} importPath
	 * @returns {Promise<vorthLifecycle|false>}
	 */
	importVorth = async (importPath) => {
		const ref = this.chacedRef.get(importPath);
		if (ref) {
			return ref;
		}
		const endpoint = `${this.base}lifecycles/${importPath}.mjs`;
		try {
			const newRef = (await import(`${endpoint}${this.cacheDate}`)).default;
			this.chacedRef.set(importPath, newRef);
			return newRef;
		} catch (error) {
			console.error({
				endpoint,
				code: 404,
				error: 'not found',
				message: 'vorth="module-path" pointing to invalid endpoint',
			});
			return false;
		}
	};
	/**
	 * @private
	 * @type {string}
	 */
	base = '/';
	/**
	 * @private
	 * @param {string} relativePath
	 * @returns {string}
	 */
	storageKey = (relativePath) => `vorth-s-${relativePath}`;
	/**
	 * @private
	 * @param {string} relativePath
	 */
	importLib = async (relativePath) => {
		const lib = this.cachedLib.get(relativePath);
		if (lib) {
			return lib;
		}
		const endpoint = `${this.base}libs/${relativePath}.mjs`;
		try {
			const fn = (await import(`${endpoint}${this.cacheDate}`)).default;
			this.cachedLib.set(relativePath, fn);
			return fn;
		} catch (error) {
			console.error({
				endpoint,
				code: 404,
				error: 'not found',
				message: 'importLib pointing to invalid endpoint',
			});
			return false;
		}
	};
	/**
	 * @private
	 * @param {string} relativePath
	 * @returns {Promise<signalRef_|false>}
	 */
	importData = async (relativePath) => {
		const signal_ = this.cachedLet.get(relativePath);
		if (signal_) {
			// @ts-ignore
			return signal_.signal;
		}
		const endpoint = `${this.base}data/${relativePath}.mjs`;
		try {
			/**
			 * @type {vorthData}
			 */
			const newRef = (await import(`${endpoint}${this.cacheDate}`)).default;
			if (!('data' in newRef)) {
				throw Error('no_data');
			}
			if ('storeMode' in newRef) {
				const storageKey = this.storageKey(relativePath);
				const { data, storeMode } = newRef;
				let checkValue = data.let;
				if (storeMode === 'localStorage') {
					const realValue = localStorage.getItem(storageKey);
					if (realValue) {
						checkValue = JSON.parse(realValue);
					}
				} else if (storeMode === 'sessionStorage') {
					const realValue = sessionStorage.getItem(storageKey);
					if (realValue) {
						checkValue = JSON.parse(realValue);
					}
				}
				const signal = new Let(checkValue);
				this.cachedLet.set(relativePath, { data, storeMode, signal });
				if (storeMode === 'localStorage') {
					new $(async () => {
						localStorage.setItem(storageKey, JSON.stringify(signal.value));
					});
				} else if (storeMode === 'sessionStorage') {
					new $(async () => {
						sessionStorage.setItem(storageKey, JSON.stringify(signal.value));
					});
				}
				// @ts-ignore
				return signal;
			} else {
				const { data } = newRef;
				const signal = new Derived(async () => {
					return await data.derived({
						importData: this.importData,
						importLib: this.importLib,
					});
				});
				this.cachedLet.set(relativePath, { data, signal });
				// @ts-ignore
				return signal;
			}
		} catch (error) {
			if (error === 'no_data') {
				console.error({
					endpoint,
					error: 'no data',
					message:
						'signalRef point to a valid endpoint, but badly formed, default export must have `data` property',
				});
			} else {
				console.error({
					endpoint,
					code: 404,
					error: 'not found',
					message: 'signalRef pointing to invalid endpoint',
				});
			}
			return false;
		}
	};
	/**
	 * @private
	 */
	loopedAttr = 'vorth-loop';
	/**
	 * @private
	 * @param {Object} a0
	 * @param {HTMLElement} a0.element
	 * @param {signalRef_} a0.signal
	 * @param {string} a0.childLifescyclePath
	 * @param {()=>Promise<void>} [a0.afterLoopCallback]
	 * @returns {void}
	 */
	for = ({ element, signal, childLifescyclePath, afterLoopCallback }) => {
		const child = element.firstElementChild.cloneNode(true);
		if (!(child instanceof HTMLElement)) {
			return;
		}
		element.innerHTML = '';
		const loopedAttr = this.loopedAttr;
		child.setAttribute(loopedAttr, '{}');
		child.setAttribute('vorth', childLifescyclePath);
		new $(async () => {
			const data_s = signal.value;
			const children = element.childNodes;
			let i = 0;
			// @ts-ignore
			for (let j = 0; j < data_s.length; j++) {
				i++;
				const data_ = data_s[j];
				const childElement = children[j];
				if (childElement && childElement instanceof HTMLElement) {
					childElement.setAttribute(loopedAttr, JSON.stringify(data_));
					continue;
				}
				const templateElement = child.cloneNode(true);
				if (!(templateElement instanceof HTMLElement)) {
					break;
				}
				templateElement.setAttribute(loopedAttr, JSON.stringify(data_));
				element.append(templateElement);
			}
			for (let j = i; j < children.length; j++) {
				children[j].remove();
			}
			if (!afterLoopCallback) {
				return;
			}
			new Ping(true, afterLoopCallback);
		});
	};
	/**
	 * @private
	 * @return {void}
	 */
	vorthLifecycle = () => {
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
				onViewPort({
					lifecyclesOnDisconnected: [onDisconnected],
					onExitViewCallback: async () => {},
					onViewCallback: async ({
						unobserveElement,
						removeOnExitViewCallback,
						removeOnViewCallback,
					}) => {
						/**
						 * disable default of onViewCallback
						 */
						removeOnViewCallback();
						removeOnExitViewCallback();
						unobserveElement();
						/**
						 * disable default of onViewCallback
						 */
						const vorth = await this.importVorth(path_);
						if (!vorth) {
							return;
						}
						/**
						 * @type {(Let<any>|false)[]}
						 */
						const signals = [];
						await vorth({
							element,
							html,
							isConnected,
							onAttributeChanged,
							onDisconnected,
							onViewPort,
							importLib: this.importLib,
							$: (effect) => new $(effect),
							loopedAttrName: this.loopedAttr,
							parsedLoopedAttr: () => {
								try {
									const objString = element.getAttribute(this.loopedAttr);
									return JSON.parse(objString);
								} catch (error) {
									return error;
								}
							},
							for_: (options) => this.for({ element, ...options }),
							importData: this.importData,
							// @ts-ignore
							let_: (obj) => {
								/**
								 * @type {Let|false}
								 */
								let signal = false;
								if ('dataOnly' in obj) {
									signal = new Let(obj.dataOnly);
								} else {
									const { attributeName, data } = obj;
									signal = new Let(data, attributeName, {
										bypassNested: false,
										documentScope: element,
									});
									new $(async () => {
										try {
											// @ts-ignore
											Let.domReflector(
												// @ts-ignore
												signal.value,
												attributeName,
												element,
												signal
											);
										} catch (error) {
											console.log(error);
										}
									});
								}
								signals.push(signal);
								return signal;
							},
							// @ts-ignore
							derived: (obj) => {
								/**
								 * @type {Derived|false}
								 */
								let signal = false;
								if ('dataOnly' in obj) {
									signal = new Derived(obj.dataOnly);
								} else {
									const { attributeName, data } = obj;
									signal = new Derived(data, attributeName, {
										bypassNested: false,
										documentScope: element,
									});
									new $(async () => {
										try {
											// @ts-ignore
											Let.domReflector(
												// @ts-ignore
												signal.value,
												attributeName,
												element,
												signal
											);
										} catch (error) {
											console.log(error);
										}
									});
								}
								signals.push(signal);
								return signal;
							},
						});
						onDisconnected(async () => {
							/**
							 * allredy automatic feed trough `lifecyclesOnDisconnected`;
							// removeOnViewCallback();
							// removeOnExitViewCallback();
							// unobserveElement();
							*/
							for (let i = 0; i < signals.length; i++) {
								const signal = signals[i];
								if (signal) {
									signal.unRef();
								}
							}
						});
					},
				});
			},
		});
	};
}
