// @ts-check

/**
 * @description
 * - typehelper if you want to write your vorth web worker directly in your static endpoint;
 * ```js
 * // @ts-check
 * /**
 *  * [blank]@type {(this: WindowEventHandlers, ev: MessageEvent) =>Promise<any>}
 *  *[blank]/
 *self.onmessage = async function (event) {
 *  // code....
 *  // self.postMessage(message)
 *};
 * ```
 */
export const StaticVorthWorker = {};
