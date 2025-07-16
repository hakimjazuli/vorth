// @ts-check

import { importLets } from './importLets.mjs';

/**
 * @template {Partial<Record<import('vorth').dataList, ''>>} T
 * @param {T} paths
 * @param {import('../lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} [lifecycleOptions]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {Promise<{ [K in keyof T]: Awaited<ReturnType<import('vorth/src/data/dataList.mjs').importData<K>>> }>}
 */
export const importDatas = async (paths, lifecycleOptions) =>
	// @ts-expect-error
	await importLets(paths, lifecycleOptions);
