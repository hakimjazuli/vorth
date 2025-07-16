// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async function () {
	const { for_, html, attr } = this;
	const child = for_.of('loop');
	if (!child) {
		return;
	}
	const parentData = await child.parentData;
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
							const looped = parentData;
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
							const looped = parentData;
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
