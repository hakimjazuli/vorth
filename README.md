<h1>vorth</h1>

<b>`vorth`</b> is a `client-side` javascipt  library for handling `element lifecycle` and `data to dom reactivity`, which have:
>- 🐤 lightweight core;
>>- less then `10KB` gzipped
>- 🎯 declarative;
>>- dom reactivity follows this pattern:[`attributeName`="`attributeOrPropertySelector1`;`attributeOrPropertySelector2`;...;`attributeOrPropertySelectorN`"], to reflect and bind the input to the signal value `realtime`;
>- 🗜 `prebundled-first` approach;
>>- core are already prebuild in this `npm/git` `./initiator.mjs`;
>- 📃 comprehensive typehint;
>>- <b>`vorth`</b> functionality are fully `typehinted`;
>>- `YES`, even if you chose to develop <b>DIRECTLY</b> at the static `endpoints` you still got `limited yet powerfull enough` `typehint`;
>- 📊 data layer;
>>- <b>`vorth`</b> provide `synchronized data layer` out of the box via `virst` `signal` and `domReflector`;
>- 💪 strong integration support with `npm` `client-side` 📚 packages;
>>- for those who prefer to bundles aditional external library from `npm` `packages`, <b>`vorth`</b> have prepared [__vorthApp](#__vorthapp) `class` that functions as a directory watcher for developement (in `mjs`, `ts`, or `mts` ) to `bundle` and `minify` `1 to 1` `.mjs` `endpoints`;
>- ⌛ detects incremental dom update via [virst](https://www.npmjs.com/package/virst) `Lifecycle`;
>>- with the possibility of offloading the templating responsibility to server, your premade static html stack, or even incremental update by `HATEOAS` apporach, <b>`vorth`</b> can handle the client side `logic`at ⚡`O(1)`⚡ starts, without compromising the ability of html templating when it's neccessary;
>- ⚡ blazingly responsive ⚡;
>>- supports `webWorker` out of the box for more expensive computation, without blocking client interactivity;
>- 🔌 embeddable;
>>- by adding `vorth="lifecycle/name"` to your element, you can easily embed your <b>`vorth`</b> code into any templating library/framework, even those that are purely run on the browser runtime;
>>- the only rule is `vorth="lifecycle/name"` is to exist at the same time when element is connected to the dom;

## documentation for signal
refer to [virst](https://www.npmjs.com/package/virst):
- [Let](https://www.npmjs.com/package/virst#let) for exported `data.let`, only support dataOnly;
- [Derived](https://www.npmjs.com/package/virst#derived) for derived function `data.derived`, only support dataOnly;
- [$](https://www.npmjs.com/package/virst#$) for `$` as in `effect`;

## further documentation and examples
- will be posted in [html-first documentation website](https://html-first.bss.design/)

<b>!!!avoid importing on the endpoint!!!</b>
- there are cases that browser would `autocache` the imported library;
- we already profided `importData`, `importLib`, and `importWorker` that will optimize the cache with the browser session;
- if you use `__vorthApp` and find generated endpoint contains import statement, please report as bug, along with the source and the produced endpoint;

versions
>- `v0.10.x`:
>>- beta for full release;
>>- need to be checked for edge cases;
## type-helpers
- [StaticVorthData](#staticvorthdata)
- [StaticVorthLib](#staticvorthlib)
- [StaticVorthLifecycle](#staticvorthlifecycle)
- [Vorth](#vorth)
- [StaticVorthWorker](#staticvorthworker)
- [__vorthApp](#__vorthapp)
<h2 id="staticvorthdata">StaticVorthData</h2>

- typehelper for shared data if you want to write it directly in the static file endpoints, you can copy this code bellow to your file;```js// @ts-check/** * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButNull * @typedef {Object} $Instance * @property {()=>void} remove$ * @property {(isAtInitialization:boolean)=>Promise<void>} effect * @typedef {Object} letInstance * @property {any} value * @property {string|null} attr * @property {()=>void} call$ * @property {(effect:$Instance)=>void} remove$ * @property {()=>void} removeAll$ * @property {()=>void} unRef * @callback derivedFunction * @param {Object} options * @param {(relativePath:string)=>Promise<void|letInstance>} options.importData * @param {(relativePath:string)=>Promise<void|((...any:any)=>Promise<any>)>} options.importLib * @param {(path_:string)=>Promise<[letInstance:letInstance, postMessage:(message: any, options?: StructuredSerializeOptions)=>void]>} options.importWorker * @param {()=>Promise<{resume:()=>void}>} options.qFIFO * @param {(id:anyButNull)=>Promise<{resume:()=>void}>} options.qUnique * @returns {Promise<anyButNull>} * @typedef {derivedFunction|[signalValueType:anyButNull, storeMode?:'sessionStorage'|'localStorage'|undefined]} vorthData * @type {vorthData} */export const data = [''];export const data = async ()=> {};```

*) <sub>[go to exported list](#type-helpers)</sub>

<h2 id="staticvorthlib">StaticVorthLib</h2>

- typehelper if you want to write your vorth lib directly in your static endpoint, you can copy this code bellow to your file;```js// @ts-check/** * @typedef {Object} $Instance * @property {()=>void} remove$ * @property {(isAtInitialization:boolean)=>Promise<void>} effect * @callback $__ * @param {(isAtInitialization:boolean)=>Promise<void>} effect * @returns {$_} * @typedef {Object} letInstance * @property {any} value * @property {string|null} attr * @property {()=>void} call$ * @property {(effect:$Instance)=>void} remove$ * @property {()=>void} removeAll$ * @property {()=>void} unRef * @callback VorthLet * @param {{dataOnly:any}|{attr:string, data:any}} obj * @returns {letInstance} * @typedef {letInstance} derivedInstance * @callback VorthDerived * @param {{dataOnly:()=>Promise<any>}|{attr:string, data:()=>Promise<any>}} obj * @returns {derivedInstance} * @typedef {HTMLElementEventMap & { vorth: CustomEvent}} ExtendedHTMLElementEventMap * @typedef {{[K in keyof ExtendedHTMLElementEventMap]? : (K extends 'vorth' ? {listener:  (this: HTMLElement, options:{$:$__, let_:VorthLet, derived:VorthDerived, onAttributeChanged:((options:{attr:string, newValue:string})=>Promise<void>), onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>}: {listener:(this: HTMLElement, ev: ExtendedHTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}})}} selectArg_On * @callback ForData * @param {Object} a0 * @param {string} a0.dataName * @param {string} a0.childLifescycle * @param {HTMLElement} [a0.element] * @param {boolean} [a0.waitForOnViewToRender] * @param {()=>Promise<void>} [a0.afterLoopCallback] * @returns {Promise<void>} * @typedef {(handler:()=>Promise<void>)=>void} vorthOnDisconnected * @typedef {Object} onViewPortHandler * @property {()=>void} removeOnExitViewCallback * @property {()=>void} removeOnViewCallback * @property {()=>void} unobserveElement * @typedef {Object} elementsLCCallbacks * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback * @property {vorthOnDisconnected[]} lifecyclesOnDisconnected * @callback VorthSelect * @param {string} attributeName * @param {Object} a0 * @param {selectArg_On} a0.on * @param {boolean} [a0.waitForOnViewToRender] * @param {boolean} [a0.isGlobal] * @returns {{attr:string}} * @typedef {Object} vorthLifecycleOptions * @property {(effect:$Instance["effect"])=>$Instance} $ * @property {(options:{on:selectArg_On, waitForOnViewToRender?:boolean})=>string} attr * @property {VorthDerived} derived * @property {HTMLElement} element * @property {{data:ForData, of:()=>{index:number, value:{[key:string]:string}|undefined}|false}} for_ * @property {(strings:TemplateStringsArray,...values:string[])=>{inner:()=>void, string:string}} html * @property {(dataName:string)=>Promise<letInstance>} importData * @property {(libName:string)=>Promise<(...any:any)=>Promise<any>>} importLib * @property {(workerName:string, sharedSignal?:boolean)=>Promise<[signal:{value:MessageEvent}, postMessage:(message: any, options?: StructuredSerializeOptions)=>void]>} importWorker * @property {VorthLet} let_ * @property {(lifecycleName:string)=>string} lifecycleAttr * @property {(events:{[K in keyof HTMLElementEventMap]?: {listener:((this: HTMLElement, ev: HTMLElementEventMap[K])=> void), options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}})=>void} on * @property {(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged * @property {vorthOnDisconnected} onDisconnected * @property {(elementsCallbacks:elementsLCCallbacks)=>{disconnect:(()=>Promise<void>)}} onViewPort * @property {()=>{resume:(()=>void)}} qFIFO * @property {(id:any)=>{resume:(()=>void)}} qUnique * @property {VorthSelect} select * @property {(lifecycleName:string, element:HTMLElement, waitForOnViewToRender?:boolean)=>void} triggerLifecycle * @typedef {(vorthLifecycleOptions:vorthLifecycleOptions, ...any:any)=>Promise<any>} StaticVorthLib * @type {StaticVorthLib} */export const lib = async ({...vorthLifecycleOptions}, ...args) => {};```

*) <sub>[go to exported list](#type-helpers)</sub>

<h2 id="staticvorthlifecycle">StaticVorthLifecycle</h2>

- typehelper if you want to write your vorth lifecycle directly in your static endpoint, you can copy this code bellow to your file;```js// @ts-check/** * @typedef {Object} $Instance * @property {()=>void} remove$ * @property {(isAtInitialization:boolean)=>Promise<void>} effect * @callback $__ * @param {(isAtInitialization:boolean)=>Promise<void>} effect * @returns {$_} * @typedef {Object} letInstance * @property {any} value * @property {string|null} attr * @property {()=>void} call$ * @property {(effect:$Instance)=>void} remove$ * @property {()=>void} removeAll$ * @property {()=>void} unRef * @callback VorthLet * @param {{dataOnly:any}|{attr:string, data:any}} obj * @returns {letInstance} * @typedef {letInstance} derivedInstance * @callback VorthDerived * @param {{dataOnly:()=>Promise<any>}|{attr:string, data:()=>Promise<any>}} obj * @returns {derivedInstance} * @typedef {HTMLElementEventMap & { vorth: CustomEvent}} ExtendedHTMLElementEventMap * @typedef {{[K in keyof ExtendedHTMLElementEventMap]? : (K extends 'vorth' ? {listener:  (this: HTMLElement, options:{$:$__, let_:VorthLet, derived:VorthDerived, onAttributeChanged:((options:{attr:string, newValue:string})=>Promise<void>), onDisconnected:(arg0:()=>Promise<void>)=>void})=>Promise<void>}: {listener:(this: HTMLElement, ev: ExtendedHTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}})}} selectArg_On * @callback ForData * @param {Object} a0 * @param {string} a0.dataName * @param {string} a0.childLifescycle * @param {HTMLElement} [a0.element] * @param {boolean} [a0.waitForOnViewToRender] * @param {()=>Promise<void>} [a0.afterLoopCallback] * @returns {Promise<void>} * @typedef {(handler:()=>Promise<void>)=>void} vorthOnDisconnected * @typedef {Object} onViewPortHandler * @property {()=>void} removeOnExitViewCallback * @property {()=>void} removeOnViewCallback * @property {()=>void} unobserveElement * @typedef {Object} elementsLCCallbacks * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback * @property {vorthOnDisconnected[]} lifecyclesOnDisconnected * @callback VorthSelect * @param {string} attributeName * @param {Object} a0 * @param {selectArg_On} a0.on * @param {boolean} [a0.waitForOnViewToRender] * @param {boolean} [a0.isGlobal] * @returns {{attr:string}} * @typedef {Object} vorthLifecycleOptions * @property {(effect:$Instance["effect"])=>$Instance} $ * @property {(options:{on:selectArg_On, waitForOnViewToRender?:boolean})=>string} attr * @property {VorthDerived} derived * @property {HTMLElement} element * @property {{data:ForData, of:()=>{index:number, value:{[key:string]:string}|undefined}|false}} for_ * @property {(strings:TemplateStringsArray,...values:string[])=>{inner:()=>void, string:string}} html * @property {(dataName:string)=>Promise<letInstance>} importData * @property {(libName:string)=>Promise<(...any:any)=>Promise<any>>} importLib * @property {(workerName:string, sharedSignal?:boolean)=>Promise<[signal:{value:MessageEvent}, postMessage:(message: any, options?: StructuredSerializeOptions)=>void]>} importWorker * @property {VorthLet} let_ * @property {(lifecycleName:string)=>string} lifecycleAttr * @property {(events:{[K in keyof HTMLElementEventMap]?: {listener:((this: HTMLElement, ev: HTMLElementEventMap[K])=> void), options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}})=>void} on * @property {(handler:(options:{attr:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged * @property {vorthOnDisconnected} onDisconnected * @property {(elementsCallbacks:elementsLCCallbacks)=>{disconnect:(()=>Promise<void>)}} onViewPort * @property {()=>{resume:(()=>void)}} qFIFO * @property {(id:any)=>{resume:(()=>void)}} qUnique * @property {VorthSelect} select * @property {(lifecycleName:string, element:HTMLElement, waitForOnViewToRender?:boolean)=>void} triggerLifecycle * @typedef {(options:vorthLifecycleOptions)=>Promise<void>} StaticVorthLifecycle * @type {StaticVorthLifecycle} */export const lifecycle = async({ ...vorthLifecycleOptions })=>{  // code};```

*) <sub>[go to exported list](#type-helpers)</sub>

<h2 id="vorth">Vorth</h2>

if you want to develop it directly in the static endpoint;- download `./initiator.mjs` and `.vscode` from this `git repo` or `npm code`;- load `targetPath/initiator.mjs` to your `html`;```html<script type="module" src="targetPath/initiator.mjs"></script>```- add neccessary attribute to `vorthInitiator.mjs` like `defer`(if you put it in the head tag);- structure your folder:>- targetPath>>- `data`>>- `libs`>>- `lifecycles`>>- `workers`- use snippet prefixed by <b>`>>static`</b> for quick typehinting and <b>`>>workerThread`</b> are shared snippet;- add `property control` for vorth in the head tag if neccessary;```html<meta property="vorth-batch" content="10" />```>- [`property="vorth-batch"`]: `content` used to tell <b>`vorth`</b> maximum element to be loaded at batch when crossing the `viewPort`;>- you can add `;pre` like this [`vorth="lifecycle/name;pre"`] to bypass this limit;>- `"lifecycle/name"` means you are pointing to `"targetPath/lifecycles/lifecycle/name.mjs"`, this patterns also applied to `importData`, `lifecycleAttr`, `importWorker`, `importLib`, to their respective folder;```html<meta property="vorth-versionMin" content="1738851920151" />```>- [`property="vorth-versionMin"`]: `content` used to tell <b>`vorth`</b> minimum `cachedDate` in `unix date ms` is allowed;>- you can dynamically provide this tag from the server, and that will refresh the `cachedDate` of <b>`vorth`</b> code (`managed internally`), while keeping client's session and local storage;- both `property control` are monitored, so when it's changed dynamically in the runtime, <b>`vorth`</b> will reactively apply the new value to it's logic;

*) <sub>[go to exported list](#type-helpers)</sub>

<h2 id="staticvorthworker">StaticVorthWorker</h2>

- typehelper if you want to write your vorth web worker directly in your static endpoint;```js// @ts-check/** * @type {(this: WindowEventHandlers, ev: MessageEvent) =>Promise<any>} */self.onmessage = async function (event) { // code.... // self.postMessage(message)};```

*) <sub>[go to exported list](#type-helpers)</sub>

<h2 id="__vorthapp">__vorthApp</h2>

- for developer who want to add external modules from package managers;- install using npm to install `.vscode`, `snippets` and `starter project`;```shellnpm install vorth```- you'll then have this folder structure>- `.vscode`>- `node_modules`>- `vorth`>>- `dev`>>>- `index.mjs`: `directory watcher`>>- `src`>>>- `data`>>>- `libs`>>>- `lifecycles`>>>- `workers`- modify `directory watcher` the `index.mjs` to suit your setting;- run `index.mjs` to start develop your <b>`vorth`</b> code;	- <b>`vorth`</b> detects `.mjs`, `.ts`, and `.mts` extentions inside `src` directory, and bundles them to `targetPath` `1 to 1` it have to be in `esm`;	- all static imports will be bundled;check at [Vorth](#vorth) for `property control`;

*) <sub>[go to exported list](#type-helpers)</sub>
