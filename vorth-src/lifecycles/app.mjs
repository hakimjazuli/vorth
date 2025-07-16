// @ts-check

/** @type {import('vorth').vorthLifecycle} */
export const lifecycle = async function () {
	this.on({
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
	this.onAttributeChanged(async ({ attr, newValue }) => {
		if (attr === 'hehe') {
			console.log(`${newValue} from hehe tapi dari app`);
		}
	});
	this.onAttributeChanged(async ({ attr, newValue }) => {
		if (attr === 'app') {
			console.log(`${newValue} from app`);
		}
	});
	this.select('haha', {
		isGlobal: false,
		async lifecycle({ onDisconnected }) {
			this.innerText = 'modified dari app.mjs';
			onDisconnected(async () => {
				console.log({ dc: 'app overwrited' });
			});
		},
	});
	const duniaKeAttr = 'dunia-ke';
	const gjh = this.let_({
		attr: 'gjh',
		data: 'helo dari gajah',
	});
	this.select('haha-check', {
		waitForOnViewToRender: true,
		on: {
			mouseenter: {
				listener() {
					console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
				},
			},
		},
	});
	const [
		log_,
		{ let_: let__, derived: derived_ },
		datas,
		{ resultSignal: testSignal, postMessage },
	] = await this.promises([
		this.importLib('log'),
		this.importDatas({ let_: '', derived: '' }),
		this.importLets({ count: '' }),
		this.importWorker('test_'),
	]);
	this.html`
		<div haha-check derived-class="class" class="other class why not">haha-check</div>
		<div haha-check ${gjh.attr}="innerHTML" style="word-wrap: break-word;">
			hello dunia dari app
		</div>
		<div haha-check ${this.lifecycleAttr('multiref')}>check</div>
		<div id="test-haha" haha-check ${this.lifecycleAttr('test')}>
			<div haha>must not be permanent_</div>
		</div>
		<div haha-check ${this.lifecycleAttr('count')}>must not be permanent_</div>
		<div>
			<textarea ${duniaKeAttr}="value" autofocus></textarea>
		</div>
		<div>
			<span
				${this.attr({
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
				>"derived" and "hehe" color check</span
			>
		</div>
	`.inner();
	this.onAttributeChanged(async ({ attr, newValue }) => {
		if (attr === 'hehe') {
			console.log(`${newValue} from hehe`);
		}
	});
	const duniaKe = this.let_({
		attr: duniaKeAttr,
		data: let__.value,
	});
	this.derived({
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
	this.$(async () => {
		log_({ a: (let__.value = duniaKe.value.toString()), b: 99 });
	});
	this.$(async () => {
		console.log({ oaerkuhakruhea: datas.count.value });
	});
	this.$(async () => {
		const value = derived_.value;
		console.log({ derivedValue: derived_.value });
		postMessage({ mainThreadSays: value });
	});
	this.$(async () => {
		const value = testSignal.value;
		if (!('data' in value)) {
			return;
		}
		gjh.value = value.data.theTestWorkerSays;
	});
};
