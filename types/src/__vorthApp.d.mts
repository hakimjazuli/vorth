/**
 * @description
 * for developer who want to use package managers:
 * - download the `prebundled.mjs`, and load it on your html:
 * ```html
 * <script type="module" src="/target/path/prebundled.mjs"></script>
 * ```
 * - you can instantiate this class to monitor directory;
 * ```js
 * // /dev/vorth.mjs
 * // @ts-check
 * import { __vorthApp } from 'vorth/src/__vorthApp.mjs'; // the main `vorth` got poluted with `Vorth` which refer to browser window;
 * new __vorthApp('source/path', 'target/path');
 * ```
 * - inside `source/path` do this:
 * > - place downloaded `./prebundled.mjs`;
 * > - create dir:
 * > > - `./lifecycles`;
 * > > - `./data`;
 * > > - `./libs`;
 * - add runner script to `package.json` `script`;
 * ```json
 * {
 * 	...
 * 	"scripts":{
 * 		...
 * 		"myscript" : "node ./dev/vorth.mjs",
 * 		...
 * 	},
 * 	...
 * }
 * ```
 * - run by calling `myscript` on terminal using packageManager;
 * ```bash
 * npm run myscript;
 * ```
 * - instead of copy pasting type helper from this README.md you can use exported type of `vorth` for the respective `modules`;
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
