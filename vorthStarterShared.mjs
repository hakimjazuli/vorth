// @ts-check

export class vorthStarterShared {
	/**
	 * @param {string} content
	 * @returns {string}
	 */
	static generateNewJSConfig = (content) => {
		const obj = JSON.parse(content);
		const keyToModify = vorthStarterShared.keyToModify;
		if (!(keyToModify in obj)) {
			obj[keyToModify] = {};
		}
		for (const key in vorthStarterShared.default) {
			obj[keyToModify][key] = vorthStarterShared.default[key];
		}
		return JSON.stringify(obj);
	};
	static fileName = 'jsconfig.json';
	static keyToModify = 'compilerOptions';
	static default = {
		allowJs: true,
		module: 'esnext',
		target: 'esnext',
		moduleResolution: 'node',
		esModuleInterop: true,
		skipLibCheck: true,
		skipDefaultLibCheck: true,
		allowSyntheticDefaultImports: true,
	};
}
