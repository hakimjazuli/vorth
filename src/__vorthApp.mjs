// @ts-check

import chokidar from 'chokidar';
import esbuild from 'esbuild';
import { unlinkSync, rmdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { _QueueFIFO, _QueueObjectFIFO } from '@html_first/simple_queue';

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
	static __;
	/**
	 * @param {string} sourcePath
	 * @param {string} target
	 */
	constructor(sourcePath, target) {
		if (__vorthApp.__ instanceof __vorthApp) {
			console.warn({
				singleton: '`__vorthApp` is a singleton class',
				returns: 'returning the first `__vorthApp` instance',
			});
			return __vorthApp.__;
		}
		this.basePath = process.cwd();
		this.target = join(this.basePath, target);
		this.sourcePath = join(this.basePath, sourcePath);
		this.watcher = chokidar.watch(this.sourcePath);
		this.watcher
			.on('add', this.handler)
			.on('change', this.handler)
			.on('unlink', (path_, stats) => {
				this.handler(path_, stats, 'file');
			})
			.on('unlinkDir', (path_, stats) => {
				this.handler(path_, stats, 'dir');
			});
		this.queueHandler = new _QueueFIFO();
	}
	/**
	 * @private
	 * @type {string}
	 */
	basePath;
	/**
	 * @private
	 * @type {string}
	 */
	target;
	/**
	 * @private
	 * @type {_QueueFIFO}
	 */
	queueHandler;
	/**
	 * @private
	 * @type {import('chokidar').FSWatcher}
	 */
	watcher;
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
	handler = (path_, stats, unlink = false) => {
		this.queueHandler.assign(
			new _QueueObjectFIFO(async () => {
				await this.trueHandler(path_, stats, unlink);
			})
		);
	};
	/**
	 * @private
	 * @param {string} from
	 * @param {import('fs').Stats} _
	 * @param {unlinkMode|false} [unlink]
	 * @returns {Promise<void>}
	 */
	trueHandler = async (from, _, unlink = false) => {
		const target = this.target;
		const sourcePath = this.sourcePath;
		const toDir = from.replace(sourcePath, target);
		const to = toDir.replace(extname(from), '.mjs');
		try {
			const relativeTarget = from.replace(sourcePath, target).replace(basename(from), '');
			if (unlink === 'file') {
				unlinkSync(to);
				console.log({ message: 'succesfully delete', original: from, target: to });
				return;
			}
			if (unlink === 'dir') {
				let success = true;
				const handleRmdir = () => {
					setTimeout(() => {
						try {
							rmdirSync(toDir);
							console.log({
								message: 'succesfully delete',
								original: from,
								target: toDir,
							});
							success = true;
						} catch (error) {
							success = false;
							handleRmdir();
						}
					}, 1000);
				};
				handleRmdir();
				return;
			}
			await esbuild.build({
				entryPoints: [from],
				outdir: relativeTarget,
				minify: true,
				format: 'esm',
				bundle: true,
				outExtension: {
					'.js': '.mjs',
				},
			});
			console.log({ message: 'succesfully bundled', from, to, with: 'esbuild' });
		} catch (error) {
			console.error({
				...error,
				message: 'failed to bundle',
				from,
				to,
			});
		}
	};
}
