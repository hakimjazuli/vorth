// @ts-check

/**
 * @typedef {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecyclesList} lifecyclesList
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workersList
 * @typedef {import('vorth/src/data/dataList.mjs').dataList} dataList
 * @typedef {import('vorth/src/libs/libsList.mjs').libsList} libsList
 * @typedef {Record<string, any>|Array|string|number|boolean} returnOfSignal
 * @typedef {(isAtInitialization:boolean)=>Promise<void>} effectCallback
 * @typedef {typeof import('../Vorth.mjs').Vorth} Vorth
 */
/**
 * @typedef {Object} onViewPortHandler
 * @property {()=>void} removeOnExitViewCallback
 * @property {()=>void} removeOnViewCallback
 * @property {()=>void} unobserveElement
 */
/**
 * @typedef {Object} elementsLCCallbacks
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 * @property {vorthLifecycleOptions["onDisconnected"][]} lifecyclesOnDisconnected
 */
/**
 * @typedef {Object} vorthLifecycleOptions
 * @property {(effect:effectCallback)=>$Instance} $
 * - to create `effect` on data changes;
 * @property {(options:{on:import('./select.mjs').selectArg_On, waitForOnViewToRender?:boolean})=>string} attr
 * - best practice to add events and effects element for vorth;
 * @property {Vorth["derived"]} derived
 * - dataOnly?: reactive signal withou `DOM`;
 * - data?: use ase state without `domReflection`;
 * - attr?: to reflect the value to the DOM;
 * - returns `Dervied<returnOfSignal>`;
 * @property {HTMLElement} element
 * - current element reference of the current element lifecycle;
 * @property {{data:Vorth["for"], of:Vorth["of"]}} for_
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
 * @property {import('vorth/src/workers/importWorker.mjs').importWorker} importWorker
 * - typesafe import for data;
 * @property {Vorth["let"]} let_
 * - dataOnly?: reactive signla withou `DOM`;
 * - data?: use ase state without `domReflection`;
 * - attr?: to reflect the value to the DOM;
 * - returns `Let<returnOfSignal>`;
 * @property {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecycleAttr} lifecycleAttr
 * @property {import('./on.mjs').on['on']} on
 * - best practice to add events on the curent element lifecycle;
 * @property {(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged
 * - `handler`: will be called when element's attribute value changes;
 * @property {(handler:()=>Promise<void>)=>void} onDisconnected
 * - `handler`: will be called when element is disconnected from the `DOM`;
 * @property {(elementsCallbacks:elementsLCCallbacks)=>onViewPortInstance} onViewPort
 * - onViewPort helper for current element lifecycle;
 * @property {typeof import('virst').Q["fifo"]} qFIFO
 * - queue helper for opperation that might cause race condition;
 * @property {typeof import('virst').Q["unique"]} qUnique
 * - queue helper for opperation that might cause race condition, parallel with unique id;
 * @property {import('./select.mjs').select} select
 * - best practice to select multiple elements to attach events and lifecycle to them;
 * @property {Vorth["triggerLifecycle"]} triggerLifecycle
 * - manually trigger lifecycle on an element;
 */
/**
 * @typedef {(vorthLifecycleOptions:vorthLifecycleOptions)=>Promise<void>} vorthLifecycle
 */
/**
 * @typedef {import('virst').onViewPort} onViewPortInstance
 * @typedef {import('virst').$} $Instance
 * @typedef {import('virst').Let} LetInstance
 * @typedef {import('virst').Derived} DerivedInstance
 */

/**
 *
 * @type {vorthLifecycle} param0
 */
export const lifecycle = async ({}) => {};
