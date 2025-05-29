// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async ({
	html,
	lifecycleAttr,
	importData,
	let_,
	$,
	importLib,
	importWorker,
	attr,
	onAttributeChanged,
	on,
	derived,
	select,
}) => {
	on({
		mouseenter: {
			listener() {
				console.log({ mouseEnter: 'Enter dari on' });
			},
		},
		mouseleave: {
			listener() {
				console.log({ mouseLeave: 'Leave dari on' });
			},
		},
	});
	onAttributeChanged(async ({ attr, newValue }) => {
		if (attr === 'hehe') {
			console.log(`${newValue} from hehe tapi dari app`);
		}
	});
	onAttributeChanged(async ({ attr, newValue }) => {
		if (attr === 'app') {
			console.log(`${newValue} from app`);
		}
	});
	select('haha', {
		isGlobal: false,
		async lifecycle({ onDisconnected }) {
			this.innerText = 'modified dari app.mjs';
			onDisconnected(async () => {
				console.log({ dc: 'app overwrited' });
			});
		},
	});
	const duniaKeAttr = 'dunia-ke';
	const gjh = let_({
		attr: 'gjh',
		data: 'helo dari gajah',
	});
	select('haha-check', {
		waitForOnViewToRender: true,
		on: {
			mouseenter: {
				listener() {
					console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
				},
			},
		},
	});
	const [log_, let__, derived_, { resultSignal: testSignal, postMessage }] = await Promise.all([
		importLib('log'),
		importData('let_'),
		importData('derived'),
		importWorker('test'),
	]);
	html`
		<div haha-check derived-class="class" class="other class why not">haha-check</div>
		<div haha-check ${gjh.attr}="innerHTML" style="word-wrap: break-word;">
			hello dunia dari app
		</div>
		<div haha-check ${lifecycleAttr('multiref')}>check</div>
		<div id="test-haha" haha-check ${lifecycleAttr('test')}>
			<div haha>must not be permanent_</div>
		</div>
		<div haha-check ${lifecycleAttr('count')}>must not be permanent_</div>
		<div>
			<textarea ${duniaKeAttr}="value" autofocus></textarea>
		</div>
		<div>
			<span
				${attr({
					async domReflect() {
						if (let__.value.includes('derived')) {
							return { class: 'woho ada derived' };
						} else if (let__.value.includes('hehe')) {
							return { class: 'muhahaha' };
						}
						return { class: '' };
					},
					on: {
						mouseenter: {
							listener() {
								this.setAttribute(
									'style',
									'color: red !important; background-color: green !important;'
								);
							},
						},
						mouseleave: {
							listener() {
								this.setAttribute('style', '');
							},
						},
					},
				})}="class"
				>derived and hehe color check</span
			>
		</div>
	`.inner();
	onAttributeChanged(async ({ attr, newValue }) => {
		if (attr === 'hehe') {
			console.log(`${newValue} from hehe`);
		}
	});
	const duniaKe = let_({
		attr: duniaKeAttr,
		data: let__.value,
	});
	derived({
		attr: 'derived-class',
		async data() {
			if (let__.value.includes('derived')) {
				return { class: 'woho ada derived' };
			} else if (let__.value.includes('hehe')) {
				return { class: 'muhahaha' };
			}
			return { class: '' };
		},
	});
	$(async () => {
		log_({ a: (let__.value = duniaKe.value.toString()), b: 99 });
	});
	$(async () => {
		const value = derived_.value;
		postMessage(value);
	});
	$(async () => {
		const value = testSignal.value;
		if (!('data' in value)) {
			return;
		}
		gjh.value = value.data.theTestWorkerSays;
	});
};
