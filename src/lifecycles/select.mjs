// @ts-check
import { $ as $_, Lifecycle } from 'virst';
import { Vorth } from '../Vorth.mjs';

/**
 * @param {(isAtInitialization:boolean)=>Promise<void>} effect
 * @param {Array<$_>} [effects]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {$_}
 */
export const $__ = (effect, effects = []) => {
	const effect_ = new $_(effect);
	effects.push(effect_);
	return effect_;
};
/**
 * @typedef {HTMLElementEventMap & {
 *   vorth: CustomEvent;
 * }} ExtendedHTMLElementEventMap
 * @typedef {{[K in keyof ExtendedHTMLElementEventMap]? : (K extends import('../Vorth.mjs').VorthNamespace ?
 * {listener:  (this: HTMLElement, options:{$:typeof $__, let_:typeof Vorth["let"], derived:typeof Vorth["derived"], onAttributeChanged:import('virst').attributeChangedLifecycle, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>}:
 * {listener:(this: HTMLElement, ev: ExtendedHTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}})
 *  }} selectArg_On
 */
/**
 * @param {string} attributeName
 * @param {Object} a0
 * @param {selectArg_On} a0.on
 * @param {boolean} [a0.waitForOnViewToRender]
 * @param {boolean} [a0.isGlobal]
 * @param {import('virst').documentScope} [documentScope]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @param {boolean} [singleUse]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {{attr:string}}
 */
export const select = (
	attributeName,
	{ isGlobal = false, on, waitForOnViewToRender = true },
	documentScope,
	singleUse = false
) => {
	new Lifecycle({
		attr: attributeName,
		documentScope: isGlobal ? document : documentScope,
		onConnected: async ({
			element,
			onDisconnected,
			onViewPort,
			onAttributeChanged,
			lifecycleObserver,
		}) => {
			const lifecycleCallback = async () => {
				for (const key in on) {
					const { listener, options = {} } = on[key];
					const { onAdd = false } = options;
					if (key !== Vorth.namespace) {
						element.addEventListener(key, listener, onAdd);
						continue;
					}
					/**
					 * @type {Array<$_>}
					 */
					const effects = [];
					/**
					 * @type {Array<import('virst').Let>}
					 */
					const signals = [];
					await listener.call(element, {
						/**
						 * @param {(isAtInitialization:boolean)=>Promise<void>} effect
						 */
						$: (effect) => $__(effect, effects),
						/**
						 * @type {typeof Vorth["let"]}
						 */
						let_: (obj) => Vorth.let(obj, element, signals),
						/**
						 * @type {typeof Vorth["derived"]}
						 */
						derived: (obj) => Vorth.derived(obj, element, signals),
						onAttributeChanged,
						onDisconnected,
					});
					onDisconnected(async () => {
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
						if (singleUse) {
							lifecycleObserver.disconnect();
						}
					});
				}
				onDisconnected(async () => {
					for (const key in on) {
						if (key === Vorth.namespace) {
							continue;
						}
						try {
							const { listener, options = {} } = on[key];
							const { onRemove = false } = options;
							element.removeEventListener(key, listener, onRemove);
						} catch (error) {}
					}
				});
			};
			if (!waitForOnViewToRender) {
				lifecycleCallback();
				return;
			}
			onViewPort({
				lifecyclesOnDisconnected: [onDisconnected],
				onExitViewCallback: async () => {},
				onViewCallback: lifecycleCallback,
			});
		},
	});
	return { attr: attributeName };
};
