// @ts-check

import { Vorth } from '../Vorth.mjs';

/**
 * @template {import('vorth/src/libs/libsList.mjs').libsList} T
 * @param {T} relativePath
 * - relativePath of lib inside `libs`;
 * @returns {ReturnType<import('vorth/src/libs/libsList.mjs').importLib<T>>}
 */
export const importLib = async (relativePath) => {
	const { pathLibs, cacheDate, cacheDateName } = Vorth;
	const endpoint = `${pathLibs}${relativePath}.mjs`;
	try {
		const lib = await import(`${endpoint}?${cacheDateName}=${cacheDate}`);
		if (!('lib' in lib)) {
			throw Error('no_lib');
		}
		return lib.lib;
	} catch (error) {
		if (error.message === 'no_data') {
			console.error({
				endpoint,
				error,
				message:
					'`importLib` point to a valid `endpoint`, but the `endpoint` have no named export as `lib`',
			});
		} else {
			console.error({
				endpoint,
				404: 'not found',
				message: '`importLib` pointing to invalid endpoint',
			});
		}
		return;
	}
};
