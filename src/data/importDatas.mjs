// @ts-check

import { Q } from 'virst';
import { importData } from './importData.mjs';

/**
 * @template {Partial<Record<import('vorth').dataList, ''>>} T
 * @param {T} paths
 * @param {import('../lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} [lifecycleOptions]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {Promise<{ [K in keyof T]: Awaited<ReturnType<import('vorth/src/data/dataList.mjs').importData<K>>> }>}
 */
export const importDatas = async (paths, lifecycleOptions) => {
	const { resume } = await Q.unique(`importDatas:${JSON.stringify(paths)}`);
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
		// @ts-expect-error
		result[key] = datas[i];
	}
	resume();
	// @ts-expect-error
	return result;
};
