// @ts-check

import { Let, WorkerMainThread, Ping, Q } from 'virst';
import { Vorth } from '../Vorth.mjs';
/**
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workerList
 */
/**
 * @template {workerList} T
 * @typedef {ReturnType<Awaited<import('./workersList.mjs').workerType<T>>>} workerType;
 */
/**
 * @template {workerList} T
 * @param {T} path_
 * @param {boolean} [sharedSignal]
 * - whether to share the signal througout the callers to `path_`;
 * - true default;
 * - if you called importWorker inside `derived` data, the value will allways be true;
 * @returns {Promise<{resultSignal:import('virst').Let<workerType<T>['post']['main']>, postMessage:(message: workerType<T>['receive']['main'], options?: StructuredSerializeOptions)=>void}>}
 * due to the prerequisite of offloading callculation to a worker is that the calculation have to be massive and/or might take times for a single calculation to finish, the request will be debounced and only will calculate the first and the last of the request logged through `unique Ping`
 */
export const importWorker = async (path_, sharedSignal = true) => {
	const { resume } = await Q.unique(`importWorker-${path_}`);
	const { cachedWorker, cacheDate, pathWorkers, cacheDateName } = Vorth;
	if (!sharedSignal && cachedWorker.has(path_)) {
		resume();
		return cachedWorker.get(path_);
	}
	const workerPath = `${pathWorkers}/${path_}.mjs?${cacheDateName}=${cacheDate}`;
	/**
	 * @type {Let<MessageEvent>}
	 */
	// @ts-ignore
	const signal = new Let({});
	const worker = new WorkerMainThread({
		onMessage: {
			error: (event) => {
				new Ping(
					true,
					async () => {
						signal.value = event;
					},
					{ unique: worker }
				);
			},
			success: (event) => {
				new Ping(
					true,
					async () => {
						signal.value = event;
					},
					{ unique: worker }
				);
			},
		},
		workerPath,
	});
	const ret_ = { resultSignal: signal, postMessage: worker.postMessage };
	if (sharedSignal) {
		// @ts-expect-error
		cachedWorker.set(path_, ret_);
	}
	resume();
	return ret_;
};
