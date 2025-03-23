// @ts-check

/**
 * @typedef {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecyclesList} lifecyclesList
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workersList
 * @typedef {import('vorth/src/data/dataList.mjs').dataList} dataList
 * @typedef {import('vorth/src/libs/libsList.mjs').libsList} libsList
 * @typedef {(isAtInitialization:boolean)=>Promise<void>} effectCallback
 * @typedef {typeof import('../Vorth.mjs').Vorth} Vorth
 * @typedef {typeof import('./select.mjs').$__} $__
 */
/**
 * @typedef {Object} vorthLifecycleOptions
 * @property {(effect:effectCallback)=>$Instance} $
 * - to create `effect` on data changes;
 * @property {(options:{domReflect?:()=>Promise<import('vorth').anyButUndefined>, lifecycle?:(this: HTMLElement, options:{$:$__, let_:Vorth["let"], derived:Vorth["derived"], onAttributeChanged:(arg0:import('virst').attributeChangedLifecycle)=>void, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>, on?:import('vorth').selectArg_On, waitForOnViewToRender?:boolean})=>string} attr
 * - best practice to add events and effects element for vorth;
 * @property {Vorth["derived"]} derived
 * - dataOnly?: reactive signal withou `DOM`;
 * - data?: use ase state without `domReflector`;
 * - attr?: to reflect the value to the DOM;
 * - returns `Dervied<returnOfSignal>`;
 * @property {HTMLElement} element
 * - current element reference of the current element lifecycle;
 * @property {{data:(a0:Omit<Parameters<Vorth["for"]>[0],'vorth'>)=>void, of:Vorth["of"]}} for_
 * - `data` loop function to loop through the signal using first child of the `element`:
 * - `as` used for data passed by `for_.data`;
 * > - value: `signal` value getter and setter, can be used in tandem with `$`;
 * > - index: index of the current data;
 * @property {(strings:TemplateStringsArray,...values:string[])=>{inner:()=>void, string:string}} html
 * - string: rendered string;
 * - inner: call this method to modify the innerHTML of current `element` `lifecycle` `innerHTML` with the rendered string;
 * @property {import('../data/importData.mjs').importData} importData
 * - typesafe import for data;
 * @property {import('../libs/importLib.mjs').importLib} importLib
 * - typesafe import for libs;
 * @property {(a0:Parameters<import('vorth/src/workers/importWorker.mjs').importWorker>[0])=>Promise<{resultSignal:{value:MessageEvent}, postMessage:(message: any, options?: StructuredSerializeOptions)=>void}>} importWorker
 * - typesafe import for data;
 * @property {Vorth["let"]} let_
 * - dataOnly?: reactive signla withou `DOM`;
 * - data?: use ase state without `domReflector`;
 * - attr?: to reflect the value to the DOM;
 * - returns `Let<returnOfSignal>`;
 * @property {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecycleAttr} lifecycleAttr
 * @property {import('./on.mjs').on['on']} on
 * - best practice to add events on the curent element lifecycle;
 * @property {(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged
 * - `handler`: will be called when element's attribute value changes;
 * @property {(handler:()=>Promise<void>)=>void} onDisconnected
 * - `handler`: will be called when element is disconnected from the `DOM`;
 * @property {typeof import('virst').Q["fifo"]} qFIFO
 * - queue helper for opperation that might cause race condition;
 * @property {typeof import('virst').Q["unique"]} qUnique
 * - queue helper for opperation that might cause race condition, parallel with unique id;
 * @property {import('./select.mjs').select} select
 * - best practice to select multiple elements to attach events and lifecycle to them;
 * @property {Vorth["triggerLifecycle"]} triggerLifecycle
 * - manually trigger lifecycle on an element;
 * @property {import('vorth').onViewPortCallback} onViewPort
 * - onViewPort helper for current element lifecycle;
 */
/**
 * @typedef {(vorthLifecycleOptions:vorthLifecycleOptions)=>Promise<void>} vorthLifecycle
 */
/**
 * @typedef {import('virst').onViewCallbackOptions} onViewCallbackOptions
 * @typedef {import('virst').onViewPort} onViewPortInstance
 * @typedef {import('virst').$} $Instance
 * @typedef {import('virst').Let} LetInstance
 * @typedef {import('virst').Derived} DerivedInstance
 */

/**
 * @description
 * typecheck
 * @type {vorthLifecycle}
 */
export const lifecycle = async (vorth) => {
	const {
		$,
		attr,
		derived,
		element,
		for_,
		html,
		importData,
		importLib,
		importWorker,
		let_,
		lifecycleAttr,
		on,
		onAttributeChanged,
		onDisconnected,
		onViewPort,
		qFIFO,
		qUnique,
		select,
		triggerLifecycle,
	} = vorth;
	$(async () => {});
	attr({
		async domReflect() {
			return '';
		},
		async lifecycle({ $, derived, let_, onAttributeChanged, onDisconnected }) {
			$(async () => {});
			derived({
				attr: '',
				async data() {
					return '';
				},
			});
			derived({
				async dataOnly() {
					return '';
				},
			});
			let_({
				attr: '',
				data: '',
			});
			let_({
				dataOnly: '',
			});
			onAttributeChanged(async () => {});
			onDisconnected(async () => {});
		},
		on: {
			click: {
				listener() {},
				options: { onAdd: {}, onRemove: {} },
			},
		},
	});
	{
		let { attr, call$, remove$, removeAll$, unRef, value } = derived({
			attr: '',
			async data() {
				return '';
			},
		});
		value = '';
	}
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = derived({
			async dataOnly() {
				return '';
			},
		});
	}
	for_.data({
		dataName: 'count_',
		childLifescycle: 'app',
		element: element,
		waitForOnViewToRender: true,
		async afterLoopCallback() {},
	});
	{
		const { inner, string } = html`<div>hehe</div>`;
	}
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = await importData('count');
	}
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = await importData('derived');
	}
	{
		const log_ = await importLib('log');
		log_({ a: '', b: 0 });
	}
	{
		const { postMessage, resultSignal } = await importWorker('test');
		const { value } = resultSignal;
	}
	{
		const a = let_({
			attr: '',
			data: '',
		});
		a.value = 'aaerear';
	}
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = let_({
			dataOnly: '',
		});
	}
	lifecycleAttr('loop/child');
	on({
		click: {
			listener() {},
			options: {
				onAdd: {},
				onRemove: {},
			},
		},
	});
	onAttributeChanged(async ({ attr, newValue }) => {});
	onDisconnected(async () => {});
	onViewPort(
		async ({ onExitViewPort, removeOnExitCallback, removeOnViewCallback, unobserveElement }) => {
			removeOnViewCallback();
			removeOnExitCallback();
			unobserveElement();
			onExitViewPort(async () => {});
		}
	);
	{
		const { resume } = await qFIFO();
	}
	{
		const { resume } = await qUnique('');
	}
	select('', {
		isGlobal: true,
		async domReflect() {
			return '';
		},
		async lifecycle({ $, derived, let_, onAttributeChanged, onDisconnected }) {
			$(async () => {});
			derived({
				attr: '',
				async data() {
					return '';
				},
			});
			derived({
				async dataOnly() {
					return '';
				},
			});
			let_({
				attr: '',
				data: '',
			});
			let_({
				dataOnly: '',
			});
			onAttributeChanged(async () => {});
			onDisconnected(async () => {});
		},
		on: {
			click: {
				listener() {},
				options: { onAdd: {}, onRemove: {} },
			},
		},
		waitForOnViewToRender: true,
	});
	triggerLifecycle('app', element, true);
};
