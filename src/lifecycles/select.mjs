// @ts-check
import { $ as $_, Lifecycle } from 'virst';
import { Vorth } from '../Vorth.mjs';
import { Q } from 'virst';

/**
 * @param {(isAtInitialization:boolean)=>Promise<void>} effect
 * @param {Array<$_>} [_]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {$_}
 */
export const $__ = (effect, _ = []) => {
	const effect_ = new $_(effect);
	_.push(effect_);
	return effect_;
};
/**
 * @param {string} attributeName
 * @param {Object} a0
 * @param {import('vorth').selectArg_On} [a0.on]
 * @param {(this: HTMLElement, options:{$:typeof $__, let_:typeof Vorth["let"], derived:typeof Vorth["derived"], onAttributeChanged:(arg0:import('virst').attributeChangedLifecycle)=>void, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>} [a0.lifecycle]
 * @param {()=>Promise<import('vorth').anyButUndefined>} [a0.domReflect]
 * @param {boolean} [a0.waitForOnViewToRender]
 * @param {boolean} [a0.isGlobal]
 * @param {import('virst').documentScope} [_] documentScope
 * - auto filled by Vorth, keep it unfilled!!!;
 * @param {boolean} [__] singleUse
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
	_,
	__ = false
) => {
	new Lifecycle({
		attr: attributeName,
		documentScope: isGlobal ? document : _,
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
						_,
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
						let_: (obj) => Vorth.let(obj, _, signals, effects),
						/**
						 * @type {typeof Vorth["derived"]}
						 */
						// @ts-expect-error
						derived: (obj) => Vorth.derived(obj, _, signals, effects),
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
					if (__) {
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
			const { resume } = await Q.unique(`select:${attributeName}`);
			if (!waitForOnViewToRender) {
				await lifecycleCallback();
				resume();
				return;
			}
			onViewPort(async () => {
				await lifecycleCallback();
				resume();
			});
		},
	});
	return { attr: attributeName };
};
