// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async ({ for_, html, attr, importData }) => {
	const child = for_.of('loop');
	if (!child) {
		return;
	}
	html`
		<button
			${attr({
				async lifecycle({ $ }) {
					$(async () => {
						this.innerText = child.value.a;
					});
				},
				on: {
					click: {
						async listener() {
							const looped = await child.parentData;
							const newOne = looped.value.length;
							looped.value.push({ a: `${newOne + 1}`, b: `b${newOne + 1}` });
							looped.call$();
						},
					},
				},
			})}
		></button>
		<button
			${attr({
				on: {
					click: {
						async listener() {
							const looped = await child.parentData;
							looped.value.splice(child.index, 1);
							looped.call$();
						},
					},
				},
			})}
		>
			delete this
		</button>
		<p
			${attr({
				async lifecycle({ $ }) {
					$(async () => {
						this.innerText = child.value.b;
					});
				},
			})}
		></p>
	`.inner();
};
