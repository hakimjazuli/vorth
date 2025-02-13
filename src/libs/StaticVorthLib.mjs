// @ts-check

/**
 * @description
 * - typehelper if you want to write your vorth lib directly in your static endpoint, you can copy this code bellow to your file;
 * ```js
 * // @ts-check
 * /**
 *  * @typedef {Object} $Instance
 *  * @property {()=>void} remove$
 *  * @property {(isAtInitialization:boolean)=>Promise<void>} effect
 *  * @callback $__
 *  * @param {(isAtInitialization:boolean)=>Promise<void>} effect
 *  * @returns {$_}
 *  * @typedef {Object} letInstance
 *  * @property {any} value
 *  * @property {string|null} attr
 *  * @property {()=>void} call$
 *  * @property {(effect:$Instance)=>void} remove$
 *  * @property {()=>void} removeAll$
 *  * @property {()=>void} unRef
 *  * @callback VorthLet
 *  * @param {{dataOnly:any}|{attr:string, data:any}} obj
 *  * @returns {letInstance}
 *  * @typedef {letInstance} derivedInstance
 *  * @callback VorthDerived
 *  * @param {{dataOnly:()=>Promise<any>}|{attr:string, data:()=>Promise<any>}} obj
 *  * @returns {derivedInstance}
 *  * @typedef {HTMLElementEventMap & { vorth: CustomEvent }} ExtendedHTMLElementEventMap
 *  * @typedef {{[K in keyof ExtendedHTMLElementEventMap]? : (K extends 'vorth' ? {listener:  (this: HTMLElement, options:{$:$__, let_:VorthLet, derived:VorthDerived, onAttributeChanged:((options:{attr:string, newValue:string})=>Promise<void>), domReflect:(derivedCallback:()=>Promise<import('../Vorth.mjs').anyButNull>)=>derivedInstance, onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>}: {listener:(this: HTMLElement, ev: ExtendedHTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}})}} selectArg_On
 *  * @callback ForData
 *  * @param {Object} a0
 *  * @param {string} a0.dataName
 *  * @param {string} a0.childLifescycle
 *  * @param {HTMLElement} [a0.element]
 *  * @param {boolean} [a0.waitForOnViewToRender]
 *  * @param {()=>Promise<void>} [a0.afterLoopCallback]
 *  * @returns {Promise<void>}
 *  * @typedef {(handler:()=>Promise<void>)=>void} vorthOnDisconnected
 *  * @typedef {Object} onViewPortHandler
 *  * @property {()=>void} removeOnExitViewCallback
 *  * @property {()=>void} removeOnViewCallback
 *  * @property {()=>void} unobserveElement
 *  * @typedef {Object} elementsLCCallbacks
 *  * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 *  * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 *  * @property {vorthOnDisconnected[]} lifecyclesOnDisconnected
 *  * @callback VorthSelect
 *  * @param {string} attributeName
 *  * @param {Object} a0
 *  * @param {selectArg_On} a0.on
 *  * @param {boolean} [a0.waitForOnViewToRender]
 *  * @param {boolean} [a0.isGlobal]
 *  * @returns {{attr:string}}
 *  * @typedef {Object} vorthLifecycleOptions
 *  * @property {(effect:$Instance["effect"])=>$Instance} $
 *  * @property {(options:{on:selectArg_On, waitForOnViewToRender?:boolean})=>string} attr
 *  * @property {VorthDerived} derived
 *  * @property {HTMLElement} element
 *  * @property {{data:ForData, of:()=>{index:number, value:{[key:string]:string}|undefined}|false}} for_
 *  * @property {(strings:TemplateStringsArray,...values:string[])=>{inner:()=>void, string:string}} html
 *  * @property {(dataName:string)=>Promise<letInstance>} importData
 *  * @property {(libName:string)=>Promise<(...any:any)=>Promise<any>>} importLib
 *  * @property {(workerName:string, sharedSignal?:boolean)=>Promise<[signal:{value:MessageEvent}, postMessage:(message: any, options?: StructuredSerializeOptions)=>void]>} importWorker
 *  * @property {VorthLet} let_
 *  * @property {(lifecycleName:string)=>string} lifecycleAttr
 *  * @property {(events:{[K in keyof HTMLElementEventMap]?: {listener:((this: HTMLElement, ev: HTMLElementEventMap[K])=> void), options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}})=>void} on
 *  * @property {(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged
 *  * @property {vorthOnDisconnected} onDisconnected
 *  * @property {(elementsCallbacks:elementsLCCallbacks)=>{disconnect:(()=>Promise<void>)}} onViewPort
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
export const StaticVorthLib = async () => {};
