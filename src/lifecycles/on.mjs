// @ts-check

import { $, Ping } from 'virst';

export class on {
	/**
	 * @param {HTMLElement} element
	 * @param {import('./vorthLifecycle.mjs').vorthLifecycleOptions["onDisconnected"]} onDisconnected
	 */
	constructor(element, onDisconnected) {
		this.element = element;
		new Ping(true, async () => {
			onDisconnected(async () => {
				this.eventRemover.forEach((remover) => {
					remover();
					this.eventRemover.delete(remover);
				});
				const effects = this.effects;
				for (let i = 0; i < effects.length; i++) {
					const effect = effects[i];
					effect.remove$();
				}
			});
		});
	}
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	element;
	/**
	 * @private
	 * @type {$[]}
	 */
	effects = [];
	/**
	 * @private
	 * @type {Set<()=>void>}
	 */
	eventRemover = new Set();
	/**
	 * @param {{[K in keyof HTMLElementEventMap]?: {listener:((this: HTMLElement, ev: HTMLElementEventMap[K])=> void), options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}}} on
	 * @returns {void}
	 */
	on = (on) => {
		new Ping(true, async () => {
			const element = this.element;
			for (const type in on) {
				const { listener, options = {} } = on[type];
				const { onAdd = false, onRemove = false } = options;
				element.addEventListener(type, listener, onAdd);
				this.eventRemover.add(() => {
					element.removeEventListener(type, listener, onRemove);
				});
			}
		});
	};
}
