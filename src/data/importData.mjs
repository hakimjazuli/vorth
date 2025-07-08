// @ts-check

import { Q, Let, $, Derived } from 'virst';
import { Vorth } from '../Vorth.mjs';
import { importLib } from '../libs/importLib.mjs';
import { importWorker } from '../workers/importWorker.mjs';
import { keyValueindexedDB } from './keyValueindexedDB.mjs';

/**
 * @param { string } keyPrefix
 * @param { string } key
 * @param { number } currentVersion
 * @returns { boolean }
 */
const isToBeDeprecated = (keyPrefix, key, currentVersion) => {
	if (!key.startsWith(keyPrefix)) {
		return false;
	}
	const version = Number(key.split('-').pop());
	return version < currentVersion;
};

/**
 * @template {import('vorth/src/data/dataList.mjs').dataList} T
 * @param {T} relativePath
 * - relativePath of data inside `data`;
 * @param {import('../lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} [lifecycleOptions]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {ReturnType<import('vorth/src/data/dataList.mjs').importData<T>>}
 */
export const importData = async (relativePath, lifecycleOptions) => {
	const { resume } = await Q.unique(`importData-${relativePath}`);
	const { pathData, cacheDate, cacheDateName, cachedLet } = Vorth;
	const storageKey = Vorth.storageKey;
	const signal = cachedLet.get(relativePath);

	if (signal instanceof Let) {
		resume();
		// @ts-expect-error
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
			const [data, floatVersion = 0, storeMode = ''] = newData;
			const keyPrefix = `${storageKey__}-`;
			try {
				const storages = [sessionStorage, localStorage];
				for (let i = 0; i < storages.length; i++) {
					const storage = storages[i];
					for (let j = 0; j < storage.length; j++) {
						const key = storage.key(j);
						if (!isToBeDeprecated(keyPrefix, key, floatVersion)) {
							continue;
						}
						storage.removeItem(key);
					}
				}
				const allIndexedDBKeys = await keyValueindexedDB.list(storageKey__);
				for (let key of allIndexedDBKeys) {
					key = key.toString();
					if (!isToBeDeprecated(keyPrefix, key, floatVersion)) {
						continue;
					}
					await keyValueindexedDB.delete(key);
				}
			} catch (error) {
				throw Error('cannot delete key');
			}
			const storageKey__withVersion = `${keyPrefix}${floatVersion}`;
			let checkValue = data;
			const storage =
				storeMode === 'localStorage'
					? localStorage
					: storeMode === 'sessionStorage'
					? sessionStorage
					: undefined;
			try {
				switch (storeMode) {
					case 'localStorage':
					case 'sessionStorage':
						{
							const realValue = storage.getItem(storageKey__withVersion);
							if (realValue) {
								checkValue = JSON.parse(realValue);
							}
						}
						break;
					case 'indexedDB':
						{
							const realValue = await keyValueindexedDB.get(storageKey__withVersion);
							if (realValue) {
								checkValue = realValue;
							}
						}
						break;
				}
			} catch (error) {
				throw Error('cannot parse json');
			}
			const signal = new Let(checkValue);
			switch (storeMode) {
				case 'localStorage':
				case 'sessionStorage':
					new $(async () => {
						storage.setItem(storageKey__withVersion, JSON.stringify(signal.value));
					});
					break;
				case 'indexedDB':
					new $(async () => {
						keyValueindexedDB.set(storageKey__withVersion, signal.value);
					});
					break;
			}
			cachedLet.set(relativePath, signal);
			resume();
			// @ts-expect-error
			return signal;
		}
		if (cachedLet.has(relativePath)) {
			/**
			 * you might want to delete this block, but this is esential to prevent race condition on edge cases;
			 */
			resume();
			// @ts-expect-error
			return cachedLet.get(relativePath);
		}
		const signal = new Derived(async () => {
			/**
			 * @type {import('vorth/src/data/vorthData.mjs').derivedFuntionOptions}
			 */
			const options = {
				qFIFO: Q.fifo,
				qUnique: Q.unique,
				importData: async (relativePath) => await importData(relativePath, lifecycleOptions),
				// @ts-expect-error
				importLib: async (relativePath) => {
					const lib = await importLib(relativePath);
					return (...params) => lib.call(lifecycleOptions, ...params);
				},
				importWorker: async (relativePath) => await importWorker(relativePath, true),
			};
			return await newData.call(options);
		});
		cachedLet.set(relativePath, signal);
		resume();
		// @ts-expect-error
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
		} else if (error.message === 'cannot delete key') {
			console.error({
				endpoint,
				error,
				data: 'no_data',
				message: '`importData` point to a valid endpoint, but unable to renew data structure',
			});
		} else {
			console.error({
				endpoint,
				error,
				404: '`importData` point to a invalid endpoint',
			});
		}
		resume();
		return;
	}
};
