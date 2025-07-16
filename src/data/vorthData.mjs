// @ts-check

/**
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workersList
 * @typedef {import('vorth/src/data/dataList.mjs').dataList} dataList
 * @typedef {import('vorth/src/libs/libsList.mjs').libsList} libsList
 */
/**
 * @typedef {Object} derivedFuntionOptions
 * @property {import('vorth').vorthLifecycleOptions["promises"]} promises
 * @property {import('./importDatas.mjs').importDatas} importDatas
 * @property {import('./importLets.mjs').importLets} importLets
 * @property {import('../libs/importLib.mjs').importLib} importLib
 * @property {import('vorth/src/workers/importWorker.mjs').importWorker} importWorker
 * @property {typeof import('virst').Q["unique"]} qUnique
 * @property {typeof import('virst').Q["fifo"]} qFIFO
 */
/**
 * @template signalValueType
 * @callback derivedFunction
 * @this {derivedFuntionOptions}
 * @returns {Promise<signalValueType>}
 */
/**
 * @template {boolean} isDerived
 * @template signalValueType
 * @typedef {isDerived extends true ?
 * derivedFunction<signalValueType> :
 * [signalValueType:signalValueType, floatVersion?:number, storeMode?:'sessionStorage'|'localStorage'|'indexedDB'|undefined]
 *} vorthData
 */
