// @ts-check

export class helper {
	static windowMain = 'vorthJS';
	/**
	 * @param {Object} class_
	 */
	static singletonClass = (class_) => {
		console.warn({
			class: class_,
			message: 'singleton class, returning previous Instance',
		});
	};
}
