/**
 * @description
 * - for developer who want to use package managers, you can instantiate this class to monitor directory;
 * - inside `source/path` do this:
 * > - place downloaded `./prebundled.mjs`;
 * > - create dir:
 * > > - `./lifecycles`;
 * > > - `./data`;
 * > > - `./libs`;
 * ```js
 * // @ts-check
 * import { __vorthApp } from 'vorth/src/__vorthApp.mjs'; // the main `vorth` got poluted with `Vorth` which refer to browser window;
 * new __vorthApp('source/path', 'target/path');
 * ```
 * - then instead of copy pasting type helper from this README.md you can use exported type of `vorth` for the respective `modules`;
 * ```ts
 * // typescript
 * import type { vorthData, vorthLib, vorthLifecycle } from 'vorth';
 * const module_ : vorthData = {};
 * export default module_
 * ```
 * ```js
 * // mjs with jsdoc
 * // @ts-check
 * /**
 * * [blank]@typedef {import('vorth').vorthData} vorthData
 * * [blank]@typedef {import('vorth').vorthLib} vorthLib
 * * [blank]@typedef {import('vorth').vorthLifecycle} vorthLifecycle
 * * [blank]@type {vorthData}
 * *[blank]/
 * export default {};
 * ```
 */
export class __vorthApp {
    /**
     * @private
     * @type {__vorthApp}
     */
    private static __;
    /**
     * @param {string} sourcePath
     * @param {string} target
     */
    constructor(sourcePath: string, target: string);
    /**
     * @private
     * @type {string}
     */
    private basePath;
    /**
     * @private
     * @type {string}
     */
    private target;
    sourcePath: string;
    /**
     * @private
     * @type {import('chokidar').FSWatcher}
     */
    private watcher;
    /**
     * @private
     * @type {_QueueFIFO}
     */
    private queueHandler;
    /**
     * @typedef {'file'|'dir'} unlinkMode
     */
    /**
     * @private
     * @param {string} path_
     * @param {import('fs').Stats} stats
     * @param {unlinkMode|false} unlink
     * @returns {void}
     */
    private handler;
    /**
     * @private
     * @param {string} from
     * @param {import('fs').Stats} _
     * @param {unlinkMode|false} [unlink]
     * @returns {Promise<void>}
     */
    private trueHandler;
}
