// @ts-check

import { Q } from 'virst';
import { importData } from './importData.mjs';

/**
 * @template {Partial<Record<import('vorth').LetList, ''>>} T
 * @param {T} paths
 * @param {import('../lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} [lifecycleOptions]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {Promise<{ [K in keyof T]: Awaited<ReturnType<import('vorth/src/data/dataList.mjs').importLets<K>>> }>}
 */
export const importLets = async (paths, lifecycleOptions) => {
	const { resume } = await Q.unique(`importLets:${JSON.stringify(paths)}`);
	/**
	 * @type {{ [K in keyof T]: Awaited<ReturnType<import('vorth/src/data/dataList.mjs').importLets<import('vorth').LetList>>> }}
	 */
	// @ts-expect-error
	const result = {};
	const list = [];
	const promises = [];
	for (const key in paths) {
		list.push(key);
		// @ts-expect-error
		promises.push(importData(key, lifecycleOptions));
	}
	const datas = await Promise.all(promises);
	for (let i = 0; i < list.length; i++) {
		const key = list[i];
		const data = datas[i];
		result[key] = data;
	}
	resume();
	// @ts-expect-error
	return result;
};
