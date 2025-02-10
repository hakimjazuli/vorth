// @ts-check

import { existsSync, promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class setup {
	static __filename = fileURLToPath(import.meta.url);
	static __dirname = path.dirname(setup.__filename);
	static sourceDir = path.join(setup.__dirname, 'starter');
	static vscode = '.vscode';
	static vsCodeSnippets = path.join(setup.__dirname, setup.vscode);
	static targetDir = process.env.INIT_CWD || process.cwd();
	static run = async () => {
		try {
			await setup.copyFiles(setup.sourceDir, setup.targetDir);
			await setup.copyFiles(setup.vsCodeSnippets, path.join(setup.targetDir, setup.vscode));
			console.log('✅ Starter project setup complete!');
		} catch (err) {
			console.error('❌ Error setting up project:', err);
		}
	};
	/**
	 * Recursively finds the project root by locating `node_modules`
	 * @param {string} dir - Starting directory
	 * @returns {string} - The actual project root
	 */
	static findProjectRoot = (dir) => {
		while (dir !== path.parse(dir).root) {
			if (path.basename(dir) === 'node_modules') {
				// Move up once more to get the project root
				return path.dirname(dir);
			}
			dir = path.dirname(dir); // Move up one level
		}
		// If no `node_modules` is found, fallback to INIT_CWD or process.cwd()
		return process.env.INIT_CWD || process.cwd();
	};

	/**
	 * @param {string} src
	 * @param {string} dest
	 */
	static copyFiles = async (src, dest) => {
		await fs.mkdir(dest, { recursive: true });
		const entries = await fs.readdir(src, { withFileTypes: true });
		if (entries.length === 0) {
			console.log(`📁 Created empty directory: ${dest}`);
			return;
		}
		for (const entry of entries) {
			const srcPath = path.join(src, entry.name);
			const destPath = path.join(dest, entry.name);
			if (entry.isDirectory()) {
				await this.copyFiles(srcPath, destPath);
			} else {
				await fs.copyFile(srcPath, destPath);
				console.log(`📄 Copied: ${entry.name}`);
			}
		}
	};
}

setup.run();
