// @ts-check

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class setup {
	static __filename = fileURLToPath(import.meta.url);
	static __dirname = path.dirname(setup.__filename);
	static sourceDir = path.join(setup.__dirname, 'starter');
	static vsCodeSnippets = path.join(setup.__dirname, '.vscode');
	static targetDir = process.cwd();
	static run = async () => {
		try {
			await setup.copyFiles(setup.sourceDir, setup.targetDir);
			await setup.copyFiles(setup.vsCodeSnippets, setup.targetDir);
			console.log('✅ Starter project setup complete!');
		} catch (err) {
			console.error('❌ Error setting up project:', err);
		}
	};
	/**
	 * @param {string} src
	 * @param {string} dest
	 */
	static copyFiles = async (src, dest) => {
		await fs.mkdir(dest, { recursive: true });
		const entries = await fs.readdir(src, { withFileTypes: true });
		for (const entry of entries) {
			const srcPath = path.join(src, entry.name);
			const destPath = path.join(dest, entry.name);
			if (entry.isDirectory()) {
				await setup.copyFiles(srcPath, destPath);
			} else {
				await fs.copyFile(srcPath, destPath);
				console.log(`Copied: ${entry.name}`);
			}
		}
	};
}

setup.run();
