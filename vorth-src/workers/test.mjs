// @ts-check

import { NewPingUnique } from 'vivth';

/**
 * @typedef {{ mainThreadSays:string }} receive
 * @typedef {{ theTestWorkerSays:string }} post
 * @typedef {import('vorth').vorthWorker<receive, post>} workerType
 */
/**
 * @type {(this: WindowEventHandlers, event: workerType['receive']['worker']) => Promise<any>}
 */
onmessage = async function (event) {
	NewPingUnique(
		'',
		async () => {
			/**
			 * @type {workerType['post']['worker']}
			 */
			const rest = {
				theTestWorkerSays: `hi..... ${event.data.mainThreadSays}`,
			};
			postMessage(rest);
		},
		1000
	);
};
