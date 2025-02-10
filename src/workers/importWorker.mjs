// @ts-check

import { Let, WorkerMainThread, Ping, Q } from 'virst';
import { Vorth } from '../Vorth.mjs';

/**
 * @template {import('vorth/src/workers/workersList.mjs').workersList} T
 * @param {T} path_
 * @param {boolean} [sharedSignal]
 * - whether to share the signal througout the callers to `path_`;
 * - true default;
 * - if you called importWorker inside `derived` data, the value will allways be true;
 * @returns {ReturnType<import('vorth/src/workers/workersList.mjs').importWorker<T>>}
 * due to the prerequisite of offloading callculation to a worker is that the calculation have to be massive and/or might take times for a single calculation to finish, the request will be debounced and only will calculate the first and the last of the request logged through `unique Ping`
 */
export const importWorker = async (path_, sharedSignal = true) => {
	const { resume } = await Q.unique(`importWorker-${path_}`);
	const { cachedWorker, cacheDate, pathWorkers, cacheDateName } = Vorth;
	if (!sharedSignal && cachedWorker.has(path_)) {
		resume();
		// @ts-ignore
		return cachedWorker.get(path_);
	}
	const workerPath = `${pathWorkers}/${path_}.mjs?${cacheDateName}=${cacheDate}`;
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
	const ret_ = [signal, worker.postMessage];
	if (sharedSignal) {
		// @ts-ignore
		cachedWorker.set(path_, ret_);
	}
	resume();
	// @ts-ignore
	return ret_;
};
