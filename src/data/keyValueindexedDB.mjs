// @ts-check

export class keyValueindexedDB {
	static #DB_NAME = 'vorthIndexDB';
	static #STORE = 'data';
	/**
	 * @returns {Promise<IDBDatabase>}
	 */
	static #open = () =>
		new Promise((res, rej) => {
			const req = indexedDB.open(keyValueindexedDB.#DB_NAME, 1);
			req.onupgradeneeded = () => req.result.createObjectStore(keyValueindexedDB.#STORE);
			req.onsuccess = () => res(req.result);
			req.onerror = () => rej(req.error);
		});
	/**
	 * @param {string} key
	 * @returns {Promise<any>}
	 */
	static get = async (key) => {
		const db = await keyValueindexedDB.#open();
		const STORE = keyValueindexedDB.#STORE;
		return new Promise((res, rej) => {
			const tx = db.transaction(STORE, 'readonly');
			const req = tx.objectStore(STORE).get(key);
			req.onsuccess = () => res(req.result ?? null);
			req.onerror = () => rej(req.error);
		});
	};
	/**
	 * @param {string} [key]
	 * @returns {Promise<IDBValidKey[]>}
	 */
	static list = async (key = '') => {
		const db = await keyValueindexedDB.#open();
		return await new Promise((resolve, reject) => {
			const tx = db.transaction(keyValueindexedDB.#STORE, 'readonly');
			const store = tx.objectStore(keyValueindexedDB.#STORE);
			const req = store.getAllKeys();
			req.onsuccess = () => {
				/**
				 * @type {IDBValidKey[]}
				 */
				const result = req.result.filter((k) => typeof k === 'string' && k.startsWith(key));
				resolve(result);
			};
			req.onerror = () => reject(req.error);
		});
	};
	/**
	 * @param {string} key
	 * @param {string} value
	 * @returns {Promise<void>}
	 */
	static set = async (key, value) => {
		const db = await keyValueindexedDB.#open();
		const STORE = keyValueindexedDB.#STORE;
		return await new Promise((res, rej) => {
			const tx = db.transaction(STORE, 'readwrite');
			const req = tx.objectStore(STORE).put(value, key);
			req.onsuccess = () => res();
			req.onerror = () => rej(req.error);
		});
	};
	/**
	 * @param {string} key
	 * @returns {Promise<void>}
	 */
	static delete = async (key) => {
		const db = await keyValueindexedDB.#open();
		const STORE = keyValueindexedDB.#STORE;
		return await new Promise((res, rej) => {
			const tx = db.transaction(STORE, 'readwrite');
			const req = tx.objectStore(STORE).delete(key);
			req.onsuccess = () => res();
			req.onerror = () => rej(req.error);
		});
	};
}
