// @ts-check

import { Q, Let, $, Derived } from 'virst';
import { Vorth } from '../Vorth.mjs';
import { importLib } from '../libs/importLib.mjs';
import { importWorker } from '../workers/importWorker.mjs';

/**
 * @template {import('vorth/src/data/dataList.mjs').dataList} T
 * @param {T} relativePath
 * - relativePath of data inside `data`;
 * @param {import('../lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} [_]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {ReturnType<import('vorth/src/data/dataList.mjs').importData<T>>}
 */
export const importData = async (relativePath, _) => {
	const { resume } = await Q.unique(`importData-${relativePath}`);
	const { pathData, cacheDate, cacheDateName, cachedLet } = Vorth;
	const storageKey = Vorth.storageKey;
	const signal = cachedLet.get(relativePath);
	if (signal instanceof Let) {
		resume();
		// @ts-ignore
		return signal;
	}
	const endpoint = `${pathData}${relativePath}.mjs`;
	try {
		const importedData = await import(`${endpoint}?${cacheDateName}=${cacheDate}`);
		if (!('data' in importedData)) {
			throw Error('no_data');
		}
		/**
		 * @type {import('vorth/src/data/vorthData.mjs').vorthData<boolean, any>}
		 */
		const newData = importedData.data;
		if (Array.isArray(newData)) {
			const storageKey__ = storageKey(relativePath);
			const [data, storeMode] = newData;
			let checkValue = data;
			try {
				if (storeMode === 'localStorage') {
					const realValue = localStorage.getItem(storageKey__);
					if (realValue) {
						checkValue = JSON.parse(realValue);
					}
				} else if (storeMode === 'sessionStorage') {
					const realValue = sessionStorage.getItem(storageKey__);
					if (realValue) {
						checkValue = JSON.parse(realValue);
					}
				}
			} catch (error) {
				throw Error('cannot parse json');
			}
			const signal = new Let(checkValue);
			if (storeMode === 'localStorage') {
				new $(async () => {
					localStorage.setItem(storageKey__, JSON.stringify(signal.value));
				});
			} else if (storeMode === 'sessionStorage') {
				new $(async () => {
					sessionStorage.setItem(storageKey__, JSON.stringify(signal.value));
				});
			}
			cachedLet.set(relativePath, signal);
			resume();
			// @ts-ignore
			return signal;
		}
		if (cachedLet.has(relativePath)) {
			// @ts-ignore
			return cachedLet.get(relativePath);
		}
		const signal = new Derived(async () => {
			return await newData({
				qFIFO: Q.fifo,
				qUnique: Q.unique,
				// @ts-ignore
				importData: async (relativePath) => await importData(relativePath, _),
				// @ts-ignore
				importLib: async (relativePath) => {
					const lib = await importLib(relativePath);
					// @ts-ignore
					return (...params) => lib.call(_, ...params);
				},
				importWorker: async (relativePath) => await importWorker(relativePath, true),
			});
		});
		cachedLet.set(relativePath, signal);
		resume();
		// @ts-ignore
		return signal;
	} catch (error) {
		if (error.message === 'cannot parse json') {
			console.error({
				endpoint,
				error,
				message: 'unable to parse json',
			});
		} else if (error.message === 'no_data') {
			console.error({
				endpoint,
				error,
				data: 'no_data',
				message:
					'`importData` point to a valid endpoint, but badly formed, default export must have `data` property',
			});
		} else {
			console.error({
				endpoint,
				error,
				404: '`importData` point to a invalid endpoint',
			});
		}
		resume();
		// @ts-ignore
		return;
	}
};
