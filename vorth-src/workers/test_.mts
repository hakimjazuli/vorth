import type { vorthWorker } from 'vorth';
import { NewPingUnique } from 'vivth';

type receive = { mainThreadSays: string };
type post = { theTestWorkerSays: string };
type workerType = vorthWorker<receive, post>;

onmessage = async function (
	this: WindowEventHandlers,
	event: workerType['receive']['worker']
): Promise<void> {
	NewPingUnique('', async () => {
		const rest: workerType['post']['worker'] = {
			theTestWorkerSays: `hi..... ${event.data.mainThreadSays}`,
		};
		postMessage(rest);
	});
};
