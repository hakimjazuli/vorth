// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async function () {
	const { html, importDatas, attr } = this;
	const { let_: let__ } = await importDatas({ let_: '' });
	html`
		<div
			style="word-wrap: break-word;"
			${attr({
				async lifecycle({ $ }) {
					$(async () => {
						const value = let__.value;
						console.log({ multiref: value });
						this.innerText = value;
					});
				},
			})}
		></div>
	`.inner();
};
