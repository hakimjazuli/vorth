/**
 * @description
 * - typehelper for shared data if you want to write it directly in the static file endpoints, you can copy this code bellow to your file;
 * ```js
 * // @ts-check
 * /**
 *  * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButNull
 *  * @typedef {Object} $Instance
 *  * @property {()=>void} remove$
 *  * @property {(isAtInitialization:boolean)=>Promise<void>} effect
 *  * @typedef {Object} letInstance
 *  * @property {any} value
 *  * @property {string|null} attr
 *  * @property {()=>void} call$
 *  * @property {(effect:$Instance)=>void} remove$
 *  * @property {()=>void} removeAll$
 *  * @property {()=>void} unRef
 *  * @callback derivedFunction
 *  * @param {Object} options
 *  * @param {(relativePath:string)=>Promise<void|letInstance>} options.importData
 *  * @param {(relativePath:string)=>Promise<void|((...any:any)=>Promise<any>)>} options.importLib
 *  * @param {(path_:string)=>Promise<[letInstance:letInstance, postMessage:(message: any, options?: StructuredSerializeOptions)=>void]>} options.importWorker
 *  * @param {()=>Promise<{resume:()=>void}>} options.qFIFO
 *  * @param {(id:anyButNull)=>Promise<{resume:()=>void}>} options.qUnique
 *  * @returns {Promise<anyButNull>}
 *  * @typedef {derivedFunction|[signalValueType:anyButNull, storeMode?:'sessionStorage'|'localStorage'|undefined]} vorthData
 *  * @type {vorthData}
 *  *[blank]/
 * export const data = [''];
 * export const data = async ()=> {};
 * ```
 */
/**
 * @type {vorthData}
 */
export const StaticVorthData = async ({}) => {};
