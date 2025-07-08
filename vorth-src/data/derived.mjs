// @ts-check

/**
 * @type {import('vorth').vorthData<true, string>}
 */
export const data = async function () {
	const let__ = (await this.importData('let_')).value;
	const ret = `derived using "data" ${let__}`;
	console.log(ret);
	return ret;
};
