// @ts-check

/**
 * @description
 * - this class is to be used as helper to setup `vorth.config.mjs` on your project root.
 */
export class __vorthConfig {
	/**
	 * @param {Object} arg0
	 * @param {string} arg0.sourcePath
	 * @param {string} arg0.targetPath
	 * @param {boolean} [arg0.minify]
	 */
	constructor({ sourcePath, targetPath, minify = true }) {
		if (!targetPath.endsWith('/') || !targetPath.endsWith('\\')) {
			targetPath = `${targetPath}/`;
		}
		if (!sourcePath.endsWith('/') || !sourcePath.endsWith('\\')) {
			sourcePath = `${sourcePath}/`;
		}
		this.sourcePath = sourcePath;
		this.targetPath = targetPath;
		this.minify = minify;
	}
}
