// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async ({ for_ }) => {
	for_.data({
		dataName: 'loop',
		childLifescycle: 'loop/child',
		waitForOnViewToRender: false,
	});
};
