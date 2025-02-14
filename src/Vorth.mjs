// @ts-check

import { $, Derived, Let, Lifecycle, Ping, Q, WorkerMainThread, helper, onViewPort } from 'virst';
import { lifecycleAttr } from 'vorth/src/lifecycles/lifecyclesList.mjs';
import { importLib } from './libs/importLib.mjs';
import { importData } from './data/importData.mjs';
import { importWorker } from './workers/importWorker.mjs';
import { select } from './lifecycles/select.mjs';
import { on } from './lifecycles/on.mjs';

/**
 * @typedef {(onViewCallback: import('virst').onViewPortHandler['onViewPort']) => import('virst').onViewPort} onViewPortCallback
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
 * @typedef {'vorth'} VorthNamespace
 * @typedef {'domReflect'} VorthDomReflect
 */
/**
 * @description
 * if you want to develop it directly in the static endpoint;
 * - download `./initiator.mjs` and `.vscode` from this `git repo` or `npm code`;
 * - load `targetPath/initiator.mjs` to your `html`;
 * ```html
 * <script type="module" src="targetPath/initiator.mjs"></script>
 * ```
 * - add neccessary attribute to `vorthInitiator.mjs` like `defer`(if you put it in the head tag);
 * - structure your folder:
 * >- targetPath
 * >>- `data`
 * >>- `libs`
 * >>- `lifecycles`
 * >>- `workers`
 * - use snippet prefixed by <b>`>>static`</b> for quick typehinting and <b>`>>workerThread`</b> are shared snippet;
 * - add `property control` for vorth in the head tag if neccessary;
 * ```html
 * <meta property="vorth-batch" content="10" />
 * ```
 * >- [`property="vorth-batch"`]: `content` used to tell <b>`vorth`</b> maximum element to be loaded at batch when crossing the `viewPort`;
 * >- you can add `;pre` like this [`vorth="lifecycle/name;pre"`] to bypass this limit;
 * >- `"lifecycle/name"` means you are pointing to `"targetPath/lifecycles/lifecycle/name.mjs"`, this patterns also applied to `importData`, `lifecycleAttr`, `importWorker`, `importLib`, to their respective folder;
 * ```html
 * <meta property="vorth-versionMin" content="1738851920151" />
 * ```
 * >- [`property="vorth-versionMin"`]: `content` used to tell <b>`vorth`</b> minimum `cachedDate` in `unix date ms` is allowed;
 * >- you can dynamically provide this tag from the server, and that will refresh the `cachedDate` of <b>`vorth`</b> code (`managed internally`), while keeping client's session and local storage;
 * - both `property control` are monitored, so when it's changed dynamically in the runtime, <b>`vorth`</b> will reactively apply the new value to it's logic;
 */
export class Vorth {
	/**
	 * @type {VorthNamespace}
	 */
	static namespace = 'vorth';
	/**
	 * @type {VorthDomReflect}
	 */
	static domReflect = 'domReflect';
	/**
	 * @private
	 * custom `HTMLelement` attribute imediately run lifecycle as soon as connected to the dom,
	 * without this, `vorth` will wait until crossing viewPort to run it;
	 */
	static pre = 'pre';
	/**
	 * @type {number}
	 */
	static versionMin = 0;
	/**
	 * @private
	 * @type {Record<string, {value:any, onCompare?:(newValue:any)=>void}>}
	 */
	static properties_ = {
		batch: { value: onViewPort.loadCount },
		versionMin: {
			value: Vorth.versionMin,
			onCompare: (minValue) => {
				if (minValue < JSON.parse(Vorth.cacheDate)) {
					return;
				}
				setTimeout(() => {
					Vorth.cacheDate = JSON.stringify(Date.now());
					location.reload();
				}, 10_000);
			},
		},
	};
	/**
	 * @private
	 * @type {()=>void}
	 */
	static assignProperties = () => {
		const namespace = Vorth.namespace;
		new Lifecycle({
			attr: 'property',
			documentScope: window.document,
			onConnected: async ({ element, onAttributeChanged }) => {
				const handler = async () => {
					const thisProperties_ = Vorth.properties_;
					for (const property in thisProperties_) {
						const propertyName = `${namespace}-${property}`;
						if (
							!(element instanceof HTMLMetaElement) ||
							!element.hasAttribute('property') ||
							!element.hasAttribute('content') ||
							element.getAttribute('property') !== propertyName
						) {
							continue;
						}
						const value = element.getAttribute('content') ?? '';
						if (!value) {
							continue;
						}
						try {
							const data = thisProperties_[property];
							data.value = JSON.parse(value);
							if (data.onCompare) {
								data.onCompare(value);
							}
						} catch (error) {
							console.error({
								error,
								value,
								propertyName,
								message: 'somethings wrong while parsing and assigning vorth argument;',
								elementString: element.outerHTML,
							});
						}
					}
				};
				onAttributeChanged(handler);
				handler();
			},
		});
	};
	static cacheDateName = `${Vorth.namespace}_now`;
	/**
	 * @private
	 * @type {string}
	 */
	static cacheDate_;
	/**
	 * @private
	 * @param {string} newValue
	 */
	static set cacheDate(newValue) {
		Vorth.cacheDate_ = newValue;
		const key = Vorth.cacheDateName;
		sessionStorage.setItem(key, newValue);
	}
	/**
	 * @type {string}
	 */
	static get cacheDate() {
		if (Vorth.cacheDate_) {
			return Vorth.cacheDate_;
		}
		const key = Vorth.cacheDateName;
		let now = sessionStorage.getItem(key);
		if (now) {
			/**
			 * to not trigger `sessionStorage.setItem` call;
			 */
			Vorth.cacheDate_ = now;
			return now;
		}
		now = JSON.stringify(Date.now());
		Vorth.cacheDate = now;
		return now;
	}
	/**
	 * @type {Map<string, {resultSignal:Let<MessageEvent>, postMessage:WorkerMainThread["postMessage"]}>}
	 */
	static cachedWorker = new Map();
	/**
	 * @type {Map<string, Derived|Let>}
	 */
	static cachedLet = new Map();
	/**
	 * @param {string} importPath
	 * @returns {Promise<import('./lifecycles/vorthLifecycle.mjs').vorthLifecycle|false>}
	 */
	static importLifecycle = async (importPath) => {
		const endpoint = `${Vorth.pathLifecycles}${importPath}.mjs`;
		try {
			const importedLifecycle = await import(
				`${endpoint}?${Vorth.cacheDateName}=${Vorth.cacheDate}`
			);
			if (!('lifecycle' in importedLifecycle)) {
				throw Error('no_lifecycle');
			}
			return importedLifecycle.lifecycle;
		} catch (error) {
			if (error.message === 'no_lifecycle') {
				console.error({
					endpoint,
					message:
						'vorth="endpoint" point to a valid `endpoint`, but the `endpoint` have no named export as `lifecycle`',
					error,
				});
			} else {
				console.error({
					endpoint,
					404: 'not found',
					message: 'vorth="module-path" pointing to invalid endpoint',
					error,
				});
			}
			return false;
		}
	};
	/**
	 * @type {string}
	 */
	static base = '/';
	/**
	 * @param {string} relativePath
	 * @returns {string}
	 */
	static storageKey = (relativePath) => `vorth-data-${relativePath}`;
	/**
	 * @param {import('vorth/src/data/dataList.mjs').dataList} relativePath
	 * @param {vorthLifecycleOptions} [vorthLifecycleOptions]
	 * - auto filled by Vorth, keep it unfilled!!!;
	 * @returns {Promise<Let|false>}
	 */
	static importData = async (relativePath, vorthLifecycleOptions) =>
		await importData(relativePath, vorthLifecycleOptions);
	/**
	 * @param {Object} a0
	 * @param {import('vorth/src/data/dataList.mjs').dataList} a0.dataName
	 * - Let<Array<{[key:string]:string}>>;
	 * @param {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecyclesList} a0.childLifescycle
	 * - lifecycle for the `for_.as`;
	 * @param {HTMLElement} [a0.element]
	 * - if `undefined`, it will use this current lifecycle element;
	 * @param {boolean} [a0.waitForOnViewToRender]
	 * - default true: normal behaviour, children will wait the `OnViewPort` to render it;
	 * - false: children will be rendered all at once;
	 * @param {()=>Promise<void>} [a0.afterLoopCallback]
	 * - callback to be run when all children receives values from the signal, even if there are any children yet to be rendered;
	 * - if `undefined`, it will use this current lifecycle element;
	 * @param {vorthLifecycleOptions} [a0.vorth]
	 * - auto filled by Vorth, keep it unfilled!!!;
	 * @returns {Promise<void>}
	 */
	static for = async ({
		dataName,
		childLifescycle,
		element,
		waitForOnViewToRender = true,
		afterLoopCallback = undefined,
		vorth = undefined,
	}) => {
		const child = element.firstElementChild;

		child.cloneNode(true);
		if (!(child instanceof HTMLElement)) {
			return;
		}
		element.innerHTML = '';
		child.setAttribute(
			Vorth.namespace,
			waitForOnViewToRender ? `${childLifescycle};${Vorth.pre}` : childLifescycle
		);
		const signal = await importData(dataName, vorth);
		new $(async () => {
			const data_s = signal.value;
			const children = element.children;
			const maxCount = Math.max(children.length, data_s.length);
			for (let i = 0; i < maxCount; i++) {
				const data_ = data_s[i];
				const children_ = children[i];
				if (data_) {
					if (children_ instanceof HTMLElement && Vorth.looped.has(children_)) {
						Vorth.looped.get(children_).signal.value = data_;
						continue;
					}
					const templateElement = child.cloneNode(true);
					if (!(templateElement instanceof HTMLElement)) {
						continue;
					}
					Vorth.looped.set(templateElement, {
						name: dataName,
						index: i,
						signal: new Let(data_),
					});
					element.append(templateElement);
				} else if (children_) {
					children_.remove();
				}
			}
			if (!afterLoopCallback) {
				return;
			}
			new Ping(true, afterLoopCallback);
		});
	};
	/**
	 * @private
	 * @type {Map<HTMLElement, {name:import('vorth/src/data/dataList.mjs').dataList, index: number,signal:Let<Record<string, string>>}>}
	 */
	static looped = new Map();
	/**
	 * to handle looped data from `for_`
	 * @template {import('vorth/src/data/dataList.mjs').dataList} dataList
	 * @param {dataList} [dataName]
	 * - this pramater is purely for IDE typechecking, and won't affect the script in any ways;
	 * @param {HTMLElement} [element]
	 * - auto filled by Vorth, keep it unfilled!!!;
	 * @param {Array<Let|false>} [signals]
	 * - auto filled by Vorth, keep it unfilled!!!;
	 * @returns {{index:number, value:Awaited<ReturnType<import('vorth/src/data/dataList.mjs').importData<dataList>>>["value"][0]}|false}
	 */
	static of = (dataName, element, signals) => {
		const data_ = Vorth.looped.get(element);
		signals.push(data_.signal);
		return {
			get value() {
				return data_.signal.value;
			},
			set value(newValue) {
				data_.signal.value = newValue;
				data_.signal.call$();
			},
			get index() {
				return data_.index;
			},
		};
	};
	/**
	 * @param {(isAtInitialization:boolean)=>Promise<void>} effect
	 * @param {Array<$>} effects
	 * @returns {$}
	 */
	static $ = (effect, effects) => {
		const effect_ = new $(effect);
		effects.push(effect_);
		return effect_;
	};
	/**
	 * @template {anyButUndefined} V
	 * @param {{dataOnly:()=>Promise<V>}|{attr:string, data:()=>Promise<V>}} obj
	 * @param {HTMLElement} [element]
	 * @param {Array<Derived<V>|false>} [signals]
	 * @param {Array<$>} [effects]
	 * @returns {Omit<Derived<V>, 'subscriptions'>}
	 */
	static derived = (obj, element, signals, effects) => {
		/**
		 * @type {Derived}
		 */
		let signal;
		if ('dataOnly' in obj) {
			signal = new Derived(obj.dataOnly);
		} else {
			const { attr, data } = obj;
			signal = new Derived(data, attr, {
				documentScope: element,
			});
			Vorth.$(async () => {
				Let.domReflector(signal.value, attr, element, signal);
			}, effects);
		}
		signals.push(signal);
		return signal;
	};
	/**
	 * @template {anyButUndefined} V
	 * @param {{dataOnly:V}|{attr:string, data:V}} obj
	 * @param {HTMLElement} [element]
	 * @param {Array<Let<V>|false>} [signals]
	 * @param {Array<$>} [effects]
	 * @returns {Let<V>}
	 */
	static let = (obj, element, signals, effects) => {
		/**
		 * @type {Let}
		 */
		let signal;
		if ('dataOnly' in obj) {
			signal = new Let(obj.dataOnly);
		} else {
			const { attr, data } = obj;
			signal = new Let(data, attr, {
				documentScope: element,
			});
			Vorth.$(async () => {
				Let.domReflector(signal.value, attr, element, signal);
			}, effects);
		}
		signals.push(signal);
		return signal;
	};
	/**
	 * @private
	 * @param {string} path_
	 * @param {HTMLElement} element
	 * @param {vorthLifecycleOptions["html"]} html
	 * @param {vorthLifecycleOptions["onAttributeChanged"]} onAttributeChanged
	 * @param {vorthLifecycleOptions["onDisconnected"]} onDisconnected
	 * @param {onViewPortCallback} onViewPort
	 */
	static lsCaller = async (
		path_,
		element,
		html,
		onAttributeChanged,
		onDisconnected,
		onViewPort
	) => {
		/**
		 * @type {(Let<any>|false)[]}
		 */
		const signals = [];
		/**
		 * @type {($)[]}
		 */
		const effects = [];
		await Vorth.vorthLifecycle(
			path_,
			element,
			html,
			onAttributeChanged,
			onDisconnected,
			onViewPort,
			effects,
			signals
		);
		onDisconnected(async () => {
			/**
			 * allredy automatic feed trough `lifecyclesOnDisconnected`;
			// removeOnViewCallback();
			// removeOnExitViewCallback();
			// unobserveElement();
			*/
			const maxLength = Math.max(effects.length, signals.length);
			for (let i = 0; i < maxLength; i++) {
				const signal = signals[i];
				if (signal) {
					signal.unRef();
				}
				const effect = effects[i];
				if (effect) {
					effect.remove$();
				}
			}
			if (Vorth.looped.has(element)) {
				Vorth.looped.delete(element);
			}
		});
	};
	/**
	 * @private
	 * @return {void}
	 */
	static assignLifecycle = () => {
		const attributeName = Vorth.namespace;
		new Lifecycle({
			attr: attributeName,
			documentScope: window.document,
			onConnected: async ({ element, html, onAttributeChanged, onDisconnected, onViewPort }) => {
				const [path, directive = ''] = (element.getAttribute(attributeName) ?? '')
					.replace(/\s/g, '')
					.split(';');
				if (!path) {
					return;
				}
				const callLifecycle = async () => {
					await Vorth.lsCaller(path, element, html, onAttributeChanged, onDisconnected, onViewPort);
				};
				if (directive === Vorth.pre) {
					await callLifecycle();
					return;
				}
				onViewPort(async ({ removeOnExitCallback, removeOnViewCallback, unobserveElement }) => {
					removeOnViewCallback();
					removeOnExitCallback();
					unobserveElement();
					await callLifecycle();
				});
			},
		});
	};
	/**
	 * @param {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecyclesList} lifecycleName
	 * @param {HTMLElement} element
	 * @param {boolean} [waitForOnViewToRender]
	 * @returns {void}
	 */
	static triggerLifecycle = (lifecycleName, element, waitForOnViewToRender = true) => {
		const copy = element.cloneNode();
		if (!(copy instanceof HTMLElement)) {
			return;
		}
		copy.setAttribute(
			Vorth.namespace,
			waitForOnViewToRender ? lifecycleName : `${lifecycleName};${Vorth.pre}`
		);
		element.outerHTML = copy.outerHTML;
	};
	/**
	 * @typedef {import('./lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} vorthLifecycleOptions
	 * @typedef {import('./lifecycles/vorthLifecycle.mjs').onViewCallbackOptions} onViewCallbackOptions
	 * @typedef {import('./lifecycles/vorthLifecycle.mjs').onViewPortInstance} onViewPortInstance
	 * @private
	 * @param {string} path_
	 * @param {HTMLElement} element
	 * @param {vorthLifecycleOptions["html"]} html
	 * @param {vorthLifecycleOptions["onAttributeChanged"]} onAttributeChanged
	 * @param {vorthLifecycleOptions["onDisconnected"]} onDisconnected
	 * @param {onViewPortCallback} onViewPort
	 * @param {Array<$>} effects
	 * @param {Array<Let|false>} signals
	 */
	static vorthLifecycle = async (
		path_,
		element,
		html,
		onAttributeChanged,
		onDisconnected,
		onViewPort,
		effects,
		signals
	) => {
		const importedLifecycle = await Vorth.importLifecycle(path_);
		if (!importedLifecycle) {
			return;
		}
		/**
		 * @type {vorthLifecycleOptions}
		 */
		const vorth = {
			element,
			html,
			onAttributeChanged,
			onDisconnected,
			triggerLifecycle: Vorth.triggerLifecycle,
			qFIFO: Q.fifo,
			qUnique: Q.unique,
			lifecycleAttr,
			importWorker,
			on: new on(element, onDisconnected).on,
			// @ts-ignore
			importData: async (relativePath) => await Vorth.importData(relativePath, vorth),
			select: (attributeName, options) => select(attributeName, options, element, false),
			attr: ({ on, domReflect, lifecycle, waitForOnViewToRender = true }) =>
				select(
					helper.attributeIndexGenerator(true),
					{ on, domReflect, lifecycle, isGlobal: false, waitForOnViewToRender },
					element,
					true
				).attr,
			// @ts-ignore
			importLib: async (relativePath) => {
				const lib = await importLib(relativePath);
				// @ts-ignore
				return async (...params) => await lib(vorth, ...params);
			},
			$: (effect) => Vorth.$(effect, effects),
			for_: {
				data: async (options) => await Vorth.for({ element, ...options, vorth }),
				of: (_ = undefined) => {
					return Vorth.of(_, element, signals);
				},
			},
			// @ts-ignore
			let_: (obj) => Vorth.let(obj, element, signals, effects),
			// @ts-ignore
			derived: (obj) => Vorth.derived(obj, element, signals, effects),
			onViewPort,
		};
		await importedLifecycle(vorth);
	};
	/**
	 * @type {string}
	 */
	static pathData = '';
	/**
	 * @type {string}
	 */
	static pathLibs = '';
	/**
	 * @type {string}
	 */
	static pathLifecycles = '';
	/**
	 * @type {string}
	 */
	static pathWorkers = '';
	/**
	 * @type {Vorth}
	 */
	static _;
	constructor() {
		if (Vorth._ instanceof Vorth) {
			helper.warningSingleton(Vorth);
			return;
		}
		Vorth._ = this;
		Vorth.base = new URL('./', import.meta.url).href;
		Vorth.pathData = `${Vorth.base}data/`;
		Vorth.pathLibs = `${Vorth.base}libs/`;
		Vorth.pathLifecycles = `${Vorth.base}lifecycles/`;
		Vorth.pathWorkers = `${Vorth.base}workers/`;
		Vorth.assignProperties();
		/**
		 * @private
		 * @param {string} relativePath
		 * @returns {Promise<import('./vorthLib.type.mjs/index.js').vorthLib<any, any>>}
		 */
		Vorth.assignLifecycle();
	}
}
