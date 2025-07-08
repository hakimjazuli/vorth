import type { vorthLib } from 'vorth';

export const lib: vorthLib<(options: { a: string; b: number }) => Promise<void>> = async function ({
	a,
	b,
}) {
	const { element } = this;
	console.log({ hi: `hi-${a} number-${b.toString()} from log`, element });
};
