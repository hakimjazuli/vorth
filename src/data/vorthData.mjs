// @ts-check

/**
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workersList
 * @typedef {import('vorth/src/data/dataList.mjs').dataList} dataList
 * @typedef {import('vorth/src/libs/libsList.mjs').libsList} libsList
 */
/**
 * @template signalValueType
 * @callback derivedFunction
 * @param {Object} options
 * @param {import('./importData.mjs').importData} options.importData
 * @param {import('../libs/importLib.mjs').importLib} options.importLib
 * @param {import('vorth/src/workers/importWorker.mjs').importWorker} options.importWorker
 * - the second argument `sharedSignal` will allways be true;
 * @param {typeof import('virst').Q["unique"]} options.qUnique
 * - queue helper for opperation that might cause race condition, parallel with unique id;
 * @param {typeof import('virst').Q["fifo"]} options.qFIFO
 * - queue helper for opperation that might cause race condition;
 * @returns {Promise<signalValueType>}
 */
/**
 * @template {boolean} isDerived
 * @template signalValueType
 * @typedef {isDerived extends true ?
 * derivedFunction<signalValueType> :
 * [signalValueType:signalValueType, storeMode?:'sessionStorage'|'localStorage'|undefined]
 *} vorthData
 */
