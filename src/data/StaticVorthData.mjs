// @ts-check
/**
 * @description
 * - typehelper for shared data if you want to write it directly in the static file endpoints, you can copy this code bellow to your file;
 * >- if you downloaded this package from npm, do NOT import this function from 'vorth', the exported function is only a typecheck helper for developement and README.md generation;
 * ```js
 * // @ts-check
 * /**
 *  * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
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
 *  * @param {(dataPath:string)=>Promise<void|letInstance>} options.importData
 *  * @param {(libPath:string)=>Promise<void|((...any:any)=>Promise<any>)>} options.importLib
 *  * @param {(workerPath:string)=>Promise<{resultSignal:letInstance, postMessage:(message: any, options?: StructuredSerializeOptions)=>void}>} options.importWorker
 *  * @param {()=>Promise<{resume:()=>void}>} options.qFIFO
 *  * @param {(id:anyButUndefined)=>Promise<{resume:()=>void}>} options.qUnique
 *  * @returns {Promise<anyButUndefined>}
 *  * @typedef {derivedFunction|[signalValueType:anyButUndefined, storeMode?:'sessionStorage'|'localStorage'|undefined]} vorthData
 *  * @type {vorthData}
 *  *[blank]/
 * export const data = [''];
 * export const data = async ()=> {};
 * ```
 */
/**
 * @type {vorthData}
 */
// export const StaticVorthData = [''];
export const StaticVorthData = async ({ importData, importLib, importWorker, qFIFO, qUnique }) => {
	{
		const { resume } = await qFIFO();
	}
	{
		const { resume } = await qUnique('');
	}
	{
		const data = await importData('');
		if (!data) {
			return;
		}
		const { attr, call$, remove$, removeAll$, unRef, value } = data;
	}
	{
		const data = await importLib('');
		if (!data) {
			return;
		}
		await data('');
	}
	{
		const check = await importWorker('');
		if (!check) {
			return;
		}
		const { postMessage, resultSignal } = check;
	}
	return '';
};
