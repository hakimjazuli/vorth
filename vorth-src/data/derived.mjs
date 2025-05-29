// @ts-check

/**
 * @type {import('vorth').vorthData<true, string>}
 */
export const data = async ({ importData }) => {
	const let__ = (await importData('let_')).value;
	console.log({ derived: let__ });
	return `derived using "data" ${let__}`;
};
