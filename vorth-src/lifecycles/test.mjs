// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async function () {
	this.select('haha', {
		isGlobal: false,
		async lifecycle({ onDisconnected }) {
			this.innerText = 'modified dari test.mjs';
			onDisconnected(async () => {
				console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
			});
		},
	});
};
