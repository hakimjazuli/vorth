// @ts-check

import chokidar from 'chokidar';
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import {
	unlinkSync,
	rmdirSync,
	existsSync,
	statSync,
	rmSync,
	writeFileSync,
	readdirSync,
	realpathSync,
	readFileSync,
} from 'fs';
import { join, basename, extname } from 'path';
import { _Queue, _QueueFIFO, _QueueObject, _QueueObjectFIFO } from '@html_first/simple_queue';

/**
 * @description
 * - for developer who want to add external modules from package managers;
 * - install using npm to install `.vscode`, `snippets` and `starter project`;
 * ```shell
 * npm install vorth
 * ```
 * - you'll then have this folder structure
 * >- `.vscode`
 * >- `node_modules`
 * >- `vorth`
 * >>- `dev`
 * >>>- `index.mjs`: `directory watcher`
 * >>- `src`
 * >>>- `data`
 * >>>- `libs`
 * >>>- `lifecycles`
 * >>>- `workers`
 * - modify `directory watcher` the `index.mjs` to suit your setting;
 * - run `index.mjs` to start develop your <b>`vorth`</b> code;
 * 	- <b>`vorth`</b> detects `.mjs`, `.ts`, and `.mts` extentions inside `src` directory, and bundles them to `targetPath` `1 to 1` it have to be in `esm`;
 * 	- all static imports will be bundled;
 * check at [Vorth](#vorth) for `property control`;
 */
export class __vorthApp {
	/**
	 * @typedef {import('fs').Dirent} Dirent
	 */
	/**
	 * @private
	 * @type {__vorthApp}
	 */
	static __;
	/**
	 * @param {Object} arg0
	 * @param {string} arg0.sourcePath
	 * @param {string} arg0.targetPath
	 * @param {boolean} [arg0.minify]
	 */
	constructor({ sourcePath, targetPath, minify = true }) {
		if (__vorthApp.__ instanceof __vorthApp) {
			console.warn({
				singleton: '`__vorthApp` is a singleton class',
				returns: 'returning the first `__vorthApp` instance',
			});
			return __vorthApp.__;
		}
		__vorthApp.minify = minify;
		__vorthApp.plugins = minify ? [__vorthApp.cleanHTML()] : [];
		__vorthApp.basePath = process.cwd();
		__vorthApp.target = join(__vorthApp.basePath, targetPath);
		__vorthApp.sourcePath = join(__vorthApp.basePath, sourcePath);
		__vorthApp.watcher = chokidar.watch(__vorthApp.sourcePath);
		__vorthApp.resolvedCorePath = realpathSync(fileURLToPath(new URL('./', import.meta.url)));
		__vorthApp.cleanupTarget();
		__vorthApp.bundleVorthMain();
		__vorthApp.watcher
			.on('add', (path_, stats) => {
				__vorthApp.handler(path_, stats, false, true);
			})
			.on('change', (path_, stats) => {
				__vorthApp.handler(path_, stats, false);
			})
			.on('unlink', (path_, stats) => {
				__vorthApp.handler(path_, stats, 'file', true);
			})
			.on('unlinkDir', (path_, stats) => {
				__vorthApp.handler(path_, stats, 'dir', true);
			});
	}
	/**
	 * @private
	 * @type {import('esbuild').Plugin[]}
	 */
	static plugins;
	/**
	 * @private
	 * @type {boolean}
	 */
	static minify;
	/**
	 * @private
	 * @type {string}
	 */
	static target;
	/**
	 * @private
	 * @type {string}
	 */
	static sourcePath;
	/**
	 * @private
	 * @type {string}
	 */
	static resolvedCorePath;
	/**
	 * @private
	 * @type {string}
	 */
	static basePath;
	/**
	 * @private
	 * @type {_Queue}
	 */
	static queueUniqueHandler = new _Queue();
	/**
	 * @private
	 * @type {_QueueFIFO}
	 */
	static queueFIFOHandler = new _QueueFIFO();
	/**
	 * @private
	 * @type {import('chokidar').FSWatcher}
	 */
	static watcher;
	/**
	 * @typedef {'file'|'dir'} unlinkMode
	 */
	/**
	 * @private
	 * @returns {void}
	 */
	static cleanupTarget = () => {
		this.queueFIFOHandler.assign(
			new _QueueObjectFIFO(async () => {
				const deletePath = this.target;
				const stats = existsSync(deletePath) ? statSync(deletePath) : null;
				if (stats && stats.isDirectory()) {
					rmSync(deletePath, { recursive: true, force: true });
					console.log({
						message: 'succesfully reset',
						target: deletePath,
					});
					return;
				}
				console.log({
					target: deletePath,
					message: 'target is in `clean-slate`',
				});
			})
		);
	};
	/**
	 * Recursively reads a directory and returns all files with their full paths.
	 * @param {string} dirPath - The directory to read.
	 * @param {Dirent[]} fileList - An accumulator array for the file paths (default: empty array).
	 * @returns {Dirent[]} - Array of file paths.
	 */
	static readFilesNestedSync = (dirPath, fileList = []) => {
		const entries = readdirSync(dirPath, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.isDirectory()) {
				this.readFilesNestedSync(join(dirPath, entry.name), fileList);
			} else if (entry.isFile()) {
				fileList.push(entry);
			}
		}
		return fileList;
	};
	/**
	 * @private
	 * @param {string} path_
	 * @param {import('fs').Stats} [_]
	 */
	static generateType = async (path_, _) => {
		const relative = path_.replace(this.sourcePath, '').replace(/\//g, '\\').split('\\');
		relative.shift();
		let typeof_;
		const typeof__ = relative[0];
		switch (typeof__) {
			case 'workers':
			case 'libs':
			case 'data':
			case 'lifecycles':
				typeof_ = typeof__;
				break;
		}
		if (!typeof_) {
			return;
		}
		this.queueUniqueHandler.assign(
			new _QueueObject(
				typeof_,
				async () => {
					const fileBaseName = `${typeof_}List`;
					const file_ = join(this.resolvedCorePath, typeof_, `${fileBaseName}.mjs`);
					const folder_ = join(this.sourcePath, typeof_);
					const files_ = this.readFilesNestedSync(folder_);
					const listName = [];
					for (let i = 0; i < files_.length; i++) {
						const file__ = files_[i];
						listName.push(
							join(file__.parentPath.replace(this.sourcePath, ''), file__.name)
								.replace('\\', '')
								.replace(/\\/g, '/')
								.replace(`${typeof_}/`, '')
								.replace(extname(file__.name), '')
						);
					}
					const generatedList = `{'${listName.join("'|'")}'}`;
					let modifiedContent = `/** 
 * generated by \`__vorthApp\` instance
 */
// @ts-check
/**
 * @typedef ${generatedList} ${fileBaseName}
 */
/**
 * @template {${fileBaseName}} T`;
					switch (typeof__) {
						case 'lifecycles':
							modifiedContent = `${modifiedContent}
 * @template {boolean} B
 * @param {T} lifecycleName
 * @param {B} [bypasWaitOnViewToRender]
 * @returns {\`vorth='\${T}\${B extends true ? ';pre' : ''}'\`}
 */
// @ts-expect-error
export const lifecycleAttr = (lifecycleName, bypasWaitOnViewToRender = false) => {
	const pre = bypasWaitOnViewToRender ? ';pre' : '';
	// @ts-expect-error
	return \`vorth='\${lifecycleName}\${pre}'\`;
};`;
							break;
						case 'workers':
							modifiedContent = `${modifiedContent}
 */`.replace(
								`/**
 * @template {workersList} T
 */`,
								''
							);
							break;
						case 'libs':
							{
								const extender = ['void'];
								for (let i = 0; i < listName.length; i++) {
									const file_ = files_[i];
									const fullPath = join(file_.parentPath, file_.name);
									const regex = /vorthLib<\(([^)]+)\)\s*=>\s*Promise\s*<([^>]+)>/s;
									const [_, args, awaitedReturnType] = readFileSync(fullPath, {
										encoding: 'utf-8',
									}).match(regex);
									const name = listName[i];
									extender.unshift(`T extends '${name}'?(${args})=>Promise<${awaitedReturnType}>`);
								}
								modifiedContent = `${modifiedContent}
 * @callback importLib
 * @param {T} relativePath
 * - relativePath of lib inside \`libs\`;
 * @returns {Promise<${extender.join(':')}>}
 */`;
							}
							break;
						case 'data':
							{
								const extender = ['void'];
								for (let i = 0; i < listName.length; i++) {
									const file_ = files_[i];
									const fullPath = join(file_.parentPath, file_.name);
									const regex = /vorthData<(.+?),(.+?)>/s;
									const [_, isDerived, dataType] = readFileSync(fullPath, {
										encoding: 'utf-8',
									}).match(regex);
									const name = listName[i];
									const dataType_ = dataType.replace(/\s+/g, '');
									const mode =
										isDerived === 'true'
											? `import('virst').Derived<${dataType_}>`
											: `import('virst').Let<${dataType_}>`;
									extender.unshift(`T extends '${name}'?${mode}`);
								}
								modifiedContent = `${modifiedContent}
 * @callback importData
 * @param {T} relativePath
 * - relativePath of data inside \`data\`;
 * @param {import('../lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} [_]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {Promise<${extender.join(':')}>}
 */`;
							}
							break;
					}
					writeFileSync(file_, modifiedContent, 'utf-8');
					console.log({
						message: `succesfully assign types of ${typeof_}`,
						file_,
					});
				},
				100
			)
		);
	};
	/**
	 * @private
	 * @param {string} path_
	 * @param {import('fs').Stats} [stats]
	 * @param {unlinkMode|false} [unlink]
	 * @param {boolean} [isSrcListChanges]
	 * @returns {void}
	 */
	static handler = (path_, stats, unlink = false, isSrcListChanges = false) => {
		this.queueFIFOHandler.assign(
			new _QueueObjectFIFO(async () => {
				await this.trueBundleAndMinify(path_, unlink);
			})
		);
		if (!isSrcListChanges) {
			return;
		}
		this.generateType(path_, stats);
	};
	/**
	 * @private
	 * @returns {import('esbuild').Plugin}
	 */
	static cleanHTML = () => {
		return {
			name: 'delete-template-literal-whitespace',
			setup: (build) => {
				build.onEnd(async (result) => {
					if (result.errors.length > 0) {
						return;
					}
					this.queueUniqueHandler.assign(
						new _QueueObject(
							'cleanHTML-whitespace',
							async () => {
								const outputDirents = this.readFilesNestedSync(this.target);
								for (let i = 0; i < outputDirents.length; i++) {
									const dirent = outputDirents[i];
									if (!dirent.name.endsWith('.mjs')) {
										return;
									}
									const filename = join(dirent.parentPath, dirent.name);
									try {
										const content = readFileSync(filename, 'utf-8');
										const regex = /(?<=`(?:\\.|[^`])*?)\s{2,}(?=(?:\\.|[^`])*?`)/g;
										if (regex.test(content)) {
											const modifiedContent = content
												.replace(regex, ' ')
												.replace(/\s*(<|>)\s*/g, '$1');
											writeFileSync(filename, modifiedContent, 'utf-8');
											console.log({
												message:
													'succesfully minify whitespace from template literal called by `html` function',
												filename,
											});
										}
									} catch (error) {
										console.error({
											error,
											message:
												'unable to minify whitespace from template literal called by `html` function',
											filename,
										});
									}
								}
							},
							1000
						)
					);
				});
			},
		};
	};
	/**
	 * @private
	 */
	static bundleVorthMain = async () => {
		this.queueFIFOHandler.assign(
			new _QueueObjectFIFO(async () => {
				const fileName = 'vorthInitiator.mjs';
				const from = join(this.resolvedCorePath, fileName);
				const to = join(this.target);
				try {
					await esbuild.build({
						entryPoints: [from],
						outdir: this.target,
						minify: true,
						format: 'esm',
						bundle: true,
						absWorkingDir: this.basePath,
						treeShaking: true,
						outExtension: {
							'.js': '.mjs',
						},
						plugins: this.plugins,
						banner: {
							js: `/** @module */`, // Ensures module-level JSDoc is included
						},
					});
					console.log({ message: 'succesfully bundled', from, to });
				} catch (error) {
					console.error({
						...error,
						message: 'failed to bundle',
						from,
						to,
					});
				}
			})
		);
	};
	/**
	 * @private
	 * @param {string} from
	 * @param {unlinkMode|false} [unlink]
	 * @returns {Promise<void>}
	 */
	static trueBundleAndMinify = async (from, unlink = false) => {
		const extention = extname(from);
		switch (extention) {
			case '.mjs':
			case '.mts':
			case '.ts':
				break;
			default:
				return;
		}
		const target = this.target;
		const sourcePath = this.sourcePath;
		const toDir = from.replace(sourcePath, target);
		const to = toDir.replace(extention, '.mjs');
		try {
			const relativeTarget = from.replace(sourcePath, target).replace(basename(from), '');
			if (unlink === 'file') {
				unlinkSync(toDir);
				console.log({ message: 'succesfully delete', original: from, target: to });
				return;
			}
			if (unlink === 'dir') {
				const handleRmdir = () => {
					setTimeout(() => {
						try {
							if (existsSync(toDir)) {
								rmdirSync(toDir);
								console.log({
									message: 'succesfully delete',
									original: from,
									target: toDir,
								});
								return;
							}
							console.log({
								message: 'succesfully delete by side effect',
								original: from,
								target: toDir,
							});
						} catch (error) {
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
				minify: this.minify,
				format: 'esm',
				bundle: true,
				absWorkingDir: this.basePath,
				treeShaking: true,
				outExtension: {
					'.js': '.mjs',
				},
				plugins: this.plugins,
				banner: {
					js: `/** @module */`, // Ensures module-level JSDoc is included
				},
			});
			console.log({ message: 'succesfully bundled', from, to });
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
