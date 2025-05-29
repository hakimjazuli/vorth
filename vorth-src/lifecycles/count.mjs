// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async ({ html, attr, importData, importLib }) => {
	const [countLet, log_] = await Promise.all([importData('count'), importLib('log')]);
	html`<div
			${attr({
				async lifecycle({ $, onDisconnected }) {
					this.style.backgroundColor = 'black';
					this.style.color = 'white';
					$(async () => {
						this.innerText = countLet.value.toString();
					});
					onDisconnected(async () => {
						log_({ a: 'a', b: 9 });
					});
				},
				on: {
					mouseover: {
						listener() {
							this.style.color = 'red';
							this.style.backgroundColor = 'green';
						},
					},
					mouseleave: {
						listener() {
							this.style.backgroundColor = 'black';
							this.style.color = 'white';
						},
					},
				},
			})}
		>
			loading...
		</div>
		<button
			${attr({
				on: {
					click: {
						listener() {
							countLet.value--;
						},
					},
				},
			})}
		>
			-
		</button>
		<button
			${attr({
				on: {
					click: {
						listener() {
							countLet.value++;
						},
					},
				},
			})}
		>
			+
		</button>`.inner();
};
