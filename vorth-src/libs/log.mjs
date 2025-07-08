// @ts-check

/** @type {import('vorth').vorthLib<(options:{a:string, b:number}) => Promise<void>>} */
export const lib = async function ({ a, b }) {
	const { element } = this;
	console.log({ hi: `hi-${a} number-${b.toString()} from log`, element });
};
