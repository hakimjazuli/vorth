// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async function () {
	const { for_ } = this;
	for_.data({
		dataName: 'loop',
		childLifescycle: 'loop/child',
		waitForOnViewToRender: true,
	});
};
