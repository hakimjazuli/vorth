// @ts-check

/**
 * @description
 * - typehelper if you want to write your vorth lib directly in your static endpoint, you can copy this code bellow to your file;
 * >- if you downloaded this package from npm, do NOT import this function from 'vorth', the exported function is only a typecheck helper for developement and README.md generation;
 * ```js
 * // @ts-check
 * /**
 *  * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
 *  * @typedef {Object} $Instance
 *  * @property {()=>void} remove$
 *  * @property {(isAtInitialization:boolean)=>Promise<void>} effect
 *  * @callback $__
 *  * @param {(isAtInitialization:boolean)=>Promise<void>} effect
 *  * @returns {$Instance}
 *  * @typedef {Object} letInstance
 *  * @property {anyButUndefined} value
 *  * @property {string|null} attr
 *  * @property {()=>void} call$
 *  * @property {(effect:$Instance)=>void} remove$
 *  * @property {()=>void} removeAll$
 *  * @property {()=>void} unRef
 *  * @callback VorthLet
 *  * @param {{dataOnly:anyButUndefined}|{attr:string, data:anyButUndefined}} obj
 *  * @returns {letInstance}
 *  * @typedef {letInstance} derivedInstance
 *  * @callback VorthDerived
 *  * @param {{dataOnly:()=>Promise<anyButUndefined>}|{attr:string, data:()=>Promise<anyButUndefined>}} obj
 *  * @returns {derivedInstance}
 *  * @typedef {{[K in keyof HTMLElementEventMap]? :{listener:(this: HTMLElement, ev: HTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}}} selectArg_On
 *  * @callback ForData
 *  * @param {Object} a0
 *  * @param {string} a0.dataName
 *  * @param {string} a0.childLifescycle
 *  * @param {HTMLElement} [a0.element]
 *  * @param {boolean} [a0.waitForOnViewToRender]
 *  * @param {()=>Promise<void>} [a0.afterLoopCallback]
 *  * @returns {Promise<void>}
 *  * @typedef {(handler:()=>Promise<void>)=>void} vorthOnDisconnected
 *  * @typedef {Object} onViewCallbackOptions
 *  * @property {(arg0:()=>Promise<void>)=>void} onExitViewPort
 *  * @property {()=>void} unobserveElement
 *  * @property {()=>void} removeOnViewCallback
 *  * @property {()=>void} removeOnExitCallback
 *  * @callback VorthSelect
 *  * @param {string} attributeName
 *  * @param {Object} a0
 *  * @param {(this: HTMLElement, options:{$:$__, let_:VorthLet, derived:VorthDerived, onAttributeChanged:(arg0:import('virst').attributeChangedLifecycle)=>void, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>} [a0.lifecycle]
 *  * @param {()=>Promise<anyButUndefined>} [a0.domReflect]
 *  * @param {selectArg_On} a0.on
 *  * @param {boolean} [a0.waitForOnViewToRender]
 *  * @param {boolean} [a0.isGlobal]
 *  * @returns {{attr:string}}
 *  * @typedef {Object} vorthLifecycleOptions
 *  * @property {(effect:$Instance["effect"])=>$Instance} $
 *  * @property {(options:{domReflect?:()=>Promise<anyButUndefined>, lifecycle?:(this: HTMLElement, options:{$:$__, let_:VorthLet, derived:VorthDerived, onAttributeChanged:(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>, on?:selectArg_On, waitForOnViewToRender?:boolean})=>string} attr
 *  * @property {VorthDerived} derived
 *  * @property {HTMLElement} element
 *  * @property {{data:ForData, of:()=>{index:number, value:{[key:string]:string}|undefined}|false}} for_
 *  * @property {(strings:TemplateStringsArray,...values:string[])=>{inner:()=>void, string:string}} html
 *  * @property {(dataName:string)=>Promise<letInstance>} importData
 *  * @property {(libName:string)=>Promise<(...any:any)=>Promise<any>>} importLib
 *  * @property {(workerName:string, sharedSignal?:boolean)=>Promise<{resultSignal:{value:MessageEvent}, postMessage:(message: any, options?: StructuredSerializeOptions)=>void}>} importWorker
 *  * @property {VorthLet} let_
 *  * @property {(lifecycleName:string)=>string} lifecycleAttr
 *  * @property {(events:{[K in keyof HTMLElementEventMap]?: {listener:((this: HTMLElement, ev: HTMLElementEventMap[K])=> void), options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}})=>void} on
 *  * @property {(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged
 *  * @property {vorthOnDisconnected} onDisconnected
 *  * @property {(onViewCallback: (onSightCallbackOptions:onViewCallbackOptions)=>Promise<void>) => void} onViewPort
 *  * @property {()=>{resume:(()=>void)}} qFIFO
 *  * @property {(id:any)=>{resume:(()=>void)}} qUnique
 *  * @property {VorthSelect} select
 *  * @property {(lifecycleName:string, element:HTMLElement, waitForOnViewToRender?:boolean)=>void} triggerLifecycle
 *  * @typedef {(vorthLifecycleOptions:vorthLifecycleOptions, ...any:any)=>Promise<any>} StaticVorthLib
 *  * @type {StaticVorthLib}
 *  *[blank]/
 * export const lib = async ({...vorthLifecycleOptions}, ...args) => {};
 * ```
 */
export const StaticVorthLib = async (vorth) => {
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
		const { attr, call$, remove$, removeAll$, unRef, value } = derived({
			attr: '',
			async data() {
				return '';
			},
		});
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
	html`<div>hehe</div>`.inner();
	html`<div>hehe</div>`.string;
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = await importData('count');
	}
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = await importData('derived');
	}
	const log_ = await importLib('log');
	log_({ a: '', b: 0 });
	const { postMessage, resultSignal } = await importWorker('test');
	{
		const { value } = resultSignal;
	}
	{
		const { attr, call$, remove$, removeAll$, unRef, value } = let_({
			attr: '',
			data: '',
		});
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
