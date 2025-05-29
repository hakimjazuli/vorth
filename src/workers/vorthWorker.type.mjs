// @ts-check

/**
 * @template receiveMainThread
 * @template postMainThread
 * @typedef {{post:{main:MessageEvent<postMainThread>, worker:postMainThread}, receive:{main:receiveMainThread, worker:MessageEvent<receiveMainThread>}}} vorthWorker
 */
