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
 * @typedef {{[K in keyof HTMLElementEventMap]? :{listener:(this: HTMLElement, ev: HTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}}} selectArg_On
 */
/**
 * @param {string} attributeName
 * @param {Object} a0
 * @param {selectArg_On} [a0.on]
 * @param {(this: HTMLElement, options:{$:typeof $__, let_:typeof Vorth["let"], derived:typeof Vorth["derived"], onAttributeChanged:import('virst').attributeChangedLifecycle, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>} [a0.lifecycle]
 * @param {()=>Promise<import('../Vorth.mjs').anyButNull>} [a0.domReflect]
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
	{
		isGlobal = false,
		on,
		domReflect = undefined,
		lifecycle = undefined,
		waitForOnViewToRender = true,
	},
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
				/**
				 * @type {Array<$_>}
				 */
				const effects = [];
				/**
				 * @type {Array<import('virst').Let>}
				 */
				const signals = [];
				if (domReflect) {
					Vorth.derived(
						{ attr: attributeName, data: domReflect },
						// @ts-expect-error
						documentScope,
						signals,
						effects
					);
				}
				if (lifecycle) {
					await lifecycle.call(element, {
						/**
						 * @param {(isAtInitialization:boolean)=>Promise<void>} effect
						 */
						$: (effect) => $__(effect, effects),
						/**
						 * @type {typeof Vorth["let"]}
						 */
						// @ts-expect-error
						let_: (obj) => Vorth.let(obj, documentScope, signals, effects),
						/**
						 * @type {typeof Vorth["derived"]}
						 */
						// @ts-expect-error
						derived: (obj) => Vorth.derived(obj, documentScope, signals, effects),
						onAttributeChanged,
						onDisconnected,
					});
				}
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
				for (const key in on) {
					const { listener, options = {} } = on[key];
					const { onAdd = false, onRemove = false } = options;
					element.addEventListener(key, listener, onAdd);
					onDisconnected(async () => {
						element.removeEventListener(key, listener, onRemove);
					});
				}
			};
			if (!waitForOnViewToRender) {
				await lifecycleCallback();
				return;
			}
			onViewPort(async () => {
				await lifecycleCallback();
			});
		},
	});
	return { attr: attributeName };
};
