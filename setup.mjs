// @ts-check

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class setup {
	static __filename = fileURLToPath(import.meta.url);
	static __dirname = path.dirname(setup.__filename);
	static sourceDir = path.join(setup.__dirname, 'starter');
	static vscode = '.vscode';
	static vsCodeSnippets = path.join(setup.__dirname, setup.vscode);
	static targetDir = process.env.INIT_CWD || process.cwd();
	static srcDefaultFolders = ['data', 'workers', 'libs', 'lifecycles'];
	static run = async () => {
		try {
			const srcDefaultFolders = setup.srcDefaultFolders;
			for (let i = 0; i < srcDefaultFolders.length; i++) {
				await fs.mkdir(path.join(setup.targetDir, 'src', srcDefaultFolders[i]), {
					recursive: true,
				});
			}
			setup.copyFiles(setup.sourceDir, setup.targetDir);
			await setup.copyFiles(setup.vsCodeSnippets, path.join(setup.targetDir, setup.vscode));
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
