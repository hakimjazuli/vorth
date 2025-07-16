// @ts-check

/**
 * @type {import('vorth').vorthData<true, string>}
 */
export const data = async function () {
	const [{ let_ }] = await this.promises([this.importDatas({ let_: '' })]);
	const ret = `derived using "data" ${let_.value}`;
	console.log(ret);
	return ret;
};
