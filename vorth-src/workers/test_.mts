import type { vorthWorker } from 'vorth';

type receive = { mainThreadSays: string };
type post = { theTestWorkerSays: string };
type workerType = vorthWorker<receive, post>;

onmessage = async function (event: workerType['receive']['worker']): Promise<any> {
	const rest: workerType['post']['worker'] = {
		theTestWorkerSays: `hi..... ${event.data.mainThreadSays}`,
	};
	postMessage(rest);
};
