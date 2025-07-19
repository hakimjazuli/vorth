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
import { shared } from './shared.export.mjs';
import { trySync } from 'vivth';

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
	 * @param {import('./__vorthConfig.mjs').__vorthConfig} __vorthConfig
	 */
	constructor(__vorthConfig) {
		if (__vorthApp.__ instanceof __vorthApp) {
			console.warn({
				singleton: '`__vorthApp` is a singleton class',
				returns: 'returning the first `__vorthApp` instance',
			});
			return __vorthApp.__;
		}
		const { sourcePath, targetPath, minify } = __vorthConfig;
		__vorthApp.minify = minify;
		__vorthApp.plugins = minify ? [__vorthApp.cleanHTML()] : [];
		__vorthApp.basePath = process.cwd();
		__vorthApp.target = join(__vorthApp.basePath, targetPath);
		__vorthApp.sourcePath = join(__vorthApp.basePath, sourcePath);
		__vorthApp.watcher = chokidar.watch(__vorthApp.sourcePath);
		__vorthApp.resolvedCorePath = realpathSync(fileURLToPath(new URL('./', import.meta.url)));
		__vorthApp.cleanupTarget();
		__vorthApp.watcher
			.on('add', (path_, stats) => {
				__vorthApp.handler(path_, stats, false);
			})
			.on('change', (path_, stats) => {
				__vorthApp.handler(path_, stats, false);
			})
			.on('unlink', (path_, stats) => {
				__vorthApp.handler(path_, stats, 'file');
			})
			.on('unlinkDir', (path_, stats) => {
				__vorthApp.handler(path_, stats, 'dir');
			})
			.once('add', (_, stats) => {
				const paths = shared.paths;
				for (const path_ in paths) {
					__vorthApp.handler(paths[path_], stats);
				}
			});
		__vorthApp.#registerProcessExit();
	}
	static #isProcessExited = false;
	static #exitEvents = [
		'exit',
		'uncaughtException',
		'unhandledRejection',
		'beforeExit',
		'SIGHUP',
		'SIGQUIT',
	];
	static #registerProcessExit = () => {
		const exitEventNames = __vorthApp.#exitEvents;
		for (let i = 0; i < exitEventNames.length; i++) {
			process.on(exitEventNames[i], () => {
				if (__vorthApp.#isProcessExited) {
					return;
				}
				__vorthApp.#isProcessExited = true;
				__vorthApp.watcher.removeAllListeners();
				process.exit();
			});
		}
	};

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
		__vorthApp.queueFIFOHandler.assign(
			new _QueueObjectFIFO(async () => {
				const deletePath = __vorthApp.target;
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
				__vorthApp.readFilesNestedSync(join(dirPath, entry.name), fileList);
			} else if (entry.isFile()) {
				fileList.push(entry);
			}
		}
		return fileList;
	};
	/**
	 * @param {import('fs').PathLike} fullPath
	 * @param {RegExp} regex
	 * @returns {RegExpMatchArray | null}
	 */
	static getFileContentWithRegex = (fullPath, regex) =>
		readFileSync(fullPath, { encoding: 'utf-8' }).match(regex);
	/**
	 * @private
	 * @param {string} path_
	 * @param {import('fs').Stats} [_]
	 */
	static generateType = async (path_, _) => {
		const relative = path_.replace(__vorthApp.sourcePath, '').replace(/\//g, '\\').split('\\');
		let typeof_ = '';
		const typeof__ = relative[0];
		relative.shift();
		const paths = shared.paths;
		switch (typeof__) {
			case paths.data:
			case paths.libs:
			case paths.lifecycles:
			case paths.workers:
				typeof_ = typeof__;
				break;
		}
		if (!typeof_) {
			return;
		}
		__vorthApp.queueUniqueHandler.assign(
			new _QueueObject(
				typeof_,
				async () => {
					const fileBaseName = `${typeof_}List`;
					const file_ = join(__vorthApp.resolvedCorePath, typeof_, `${fileBaseName}.mjs`);
					const folder_ = join(__vorthApp.sourcePath, typeof_);
					const files_ = __vorthApp.readFilesNestedSync(folder_);
					const listName = [];
					const fileNames = [];
					for (let i = 0; i < files_.length; i++) {
						const file__ = files_[i];
						const fileName = join(file__.parentPath, file__.name).replace(/\\/g, '/');
						fileNames.push(fileName);
						listName.push(
							fileName
								.replace(__vorthApp.sourcePath.replace(/\\/g, '/'), '')
								.replace('/', '')
								.replace(typeof_, '')
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
						case paths.data:
							{
								const extender = ['void'];
								const Let_s = [];
								const LetExtender = ['void'];
								for (let i = 0; i < fileNames.length; i++) {
									trySync(() => {
										const [_, isDerived, dataType] = __vorthApp.getFileContentWithRegex(
											fileNames[i],
											/vorthData<(.+?),(.+?)>/s
										);
										const name = listName[i];
										const dataType_ = __vorthApp.tsToJsType(dataType);
										let mode = '';
										if (isDerived === 'true') {
											mode = `import('virst').Derived<${dataType_}>`;
										} else {
											mode = `import('virst').Let<${dataType_}>`;
											Let_s.push(name);
											LetExtender.unshift(`T extends '${name}'?${mode}`);
										}
										extender.unshift(`T extends '${name}'?${mode}`);
									});
								}
								modifiedContent = `${modifiedContent}
 * @callback importData
 * @param {T} relativePath
 * - relativePath of data inside \`data\`;
 * @param {import('vorth').vorthLifecycleOptions} [_]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {Promise<${extender.join(':')}>}
 */
/**
 * @typedef {'${Let_s.join("'|'")}'} LetList
 */
/**
 * @template {LetList} T
 * @callback importLets
 * @param {T} relativePath
 * - relativePath of data inside \`data\`;
 * @param {import('vorth').vorthLifecycleOptions} [_]
 * - auto filled by Vorth, keep it unfilled!!!;
 * @returns {Promise<${LetExtender.join(':')}>}
 */`;
							}
							break;
						case paths.libs:
							{
								const extender = ['void'];
								for (let i = 0; i < fileNames.length; i++) {
									trySync(() => {
										const [_, args, awaitedReturnType] = __vorthApp.getFileContentWithRegex(
											fileNames[i],
											/vorthLib<\s*\(([^)]+)\)\s*=>\s*Promise\s*<([^>]+)>/m
										);
										const name = listName[i];
										extender.unshift(
											`T extends '${name}'?(${__vorthApp.tsToJsType(
												args
											)})=>Promise<${__vorthApp.tsToJsType(awaitedReturnType)}>`
										);
									});
								}
								modifiedContent = `${modifiedContent}
 * @callback importLib
 * @param {T} relativePath
 * - relativePath of lib inside \`libs\`;
 * @returns {Promise<${extender.join(':')}>}
 */`;
							}
							break;
						case paths.lifecycles:
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
						case paths.workers:
							{
								let lists = ['void'];
								for (let i = 0; i < listName.length; i++) {
									trySync(() => {
										const matches = __vorthApp.getFileContentWithRegex(
											fileNames[i],
											/type\s+(receive|post)\s*=\s*([\[{][\s\S]*?[\]}]);|@typedef\s+\{\{([^}]+)\}\}\s+(receive|post)|@typedef\s+\{([^}]+)\}\s+(receive|post)/gm
										);
										const typeOfWorker = {
											receive: '',
											post: '',
										};
										matches
											.map((line) => {
												line = line.replace(/\s/g, ' ').replace(/;/gm, ',') + ';';
												const match =
													/@typedef\s+\{\{(.+?)\}\}\s+(receive|post)|@typedef\s+\{(.+?)\}\s+(receive|post)|type\s+(receive|post)\s*=\s*(.+?);/.exec(
														__vorthApp.tsToJsType(line) + ';'
													);
												if (!match) return null;
												let name = match[2] || match[4] || match[5];
												let type = match[1] ? `{${match[1]}}` : match[3] || match[6];
												if (name in typeOfWorker) {
													typeOfWorker[name] = type.replace(/\s/g, '');
												}
											})
											.filter(Boolean);
										lists.unshift(
											`T extends'${listName[i]}'?vorthWorker<${typeOfWorker.receive},${typeOfWorker.post}>`
										);
									});
								}
								const extender = lists.join(':');
								modifiedContent = `${modifiedContent}
 */
/**
 * @template {${fileBaseName}} T
 * @callback workerType
 * @param {T} relativePath
 * - relativePath of worker inside \`workers\`;
 * @returns {${extender}}
 */
/**
 * @template receiveMainThread
 * @template postWorkerThread
 * @typedef {import('vorth').vorthWorker<receiveMainThread, postWorkerThread>} vorthWorker
 */`;
							}
							break;
					}
					if (__vorthApp.mappedTypes.get(file_) !== modifiedContent) {
						__vorthApp.mappedTypes.set(file_, modifiedContent);
						writeFileSync(file_, modifiedContent, 'utf-8');
						console.log({
							message: `succesfully assign types of ${typeof_}`,
							file_,
						});
					}
				},
				100
			)
		);
	};
	/**
	 * @private
	 * @param {string} string
	 * @returns {string}
	 */
	static tsToJsType = (string) =>
		string
			.replace(/\s+/g, ' ') /** multiple whitespace to single space */
			.replace(/;/gm, ',') /** typescript Object uses semicolon */
			.replace(/,+/g, ',') /** multiple comma to comma */
			.replace(/,(\s*)$/, '$1'); /** delete the last coma */
	/**
	 * @private
	 * @type {Map<string, string>}
	 */
	static mappedTypes = new Map();
	/**
	 * @private
	 * @param {string} path_
	 * @param {import('fs').Stats} [stats]
	 * @param {unlinkMode|false} [unlink]
	 * @returns {void}
	 */
	static handler = (path_, stats, unlink = false) => {
		__vorthApp.queueFIFOHandler.assign(
			new _QueueObjectFIFO(async () => {
				await __vorthApp.trueBundleAndMinify(path_, unlink);
			})
		);
		__vorthApp.generateType(path_, stats);
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
					__vorthApp.queueUniqueHandler.assign(
						new _QueueObject(
							'cleanHTML-whitespace',
							async () => {
								const outputDirents = __vorthApp.readFilesNestedSync(__vorthApp.target);
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
		const target = __vorthApp.target;
		const sourcePath = __vorthApp.sourcePath;
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
				minify: __vorthApp.minify,
				format: 'esm',
				bundle: true,
				absWorkingDir: __vorthApp.basePath,
				treeShaking: true,
				outExtension: {
					'.js': '.mjs',
				},
				plugins: __vorthApp.plugins,
				banner: {
					js: `/** @module */`, // Ensures module-level JSDoc is included
				},
			});
			console.log({ message: 'succesfully bundled', from, to, timestamp: Date.now() });
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
