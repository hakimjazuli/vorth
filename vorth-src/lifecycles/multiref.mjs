// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async ({ html, importData, attr }) => {
	const let__ = importData('let_');
	html`
		<div
			style="word-wrap: break-word;"
			${attr({
				async lifecycle({ $ }) {
					$(async () => {
						const value = (await let__).value;
						console.log({ multiref: value });
						this.innerText = value;
					});
				},
			})}
		></div>
	`.inner();
};
