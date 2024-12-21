- this is a placeholder for client side router & renderer library made using [virst](https://www.npmjs.com/package/virst) `Lifecycle`;
- until later stable release of vorth, the documentation will be minimal;
## type-helper
- [Vorth](#vorth)
<h2 id="vorth">Vorth</h2>

how to use:- download the `prebundled.mjs`, and load it on your html:```html<script type="module" src="/path/to/the/prebundled.mjs"></script>```- add this `meta tag` on your `html` `head`:```html<meta property="vorth" content="/your/prefix/path/" />```> - `/your/prefix/path/` as in prefix for path of `vorth` function located;- add `vorth` and `your/relative/path/function` as attribute on the element:```html<div vorth="your/relative/path/function"></div>```> - meaning it will target `/your/prefix/path/your/relative/path/function.mjs`;> - as some `build` might bundle or rename `.js` in its production buld, we only support `.mjs` file;- element lifecycle paste this type helper on `/your/prefix/path/your/relative/path/function.mjs`:```js/** * @typedef {{value:any,call$:()=>void,remove$:(effect:{effect:()=>void})=>void}} signalRef_ * @typedef {Object} onViewPortInstance * @property {() => Promise<void>} disconnect * @property {(element: Element | HTMLElement) => onViewPortHandler} handlers * @typedef {Object} onViewPortHandler * @property {()=>void} removeOnExitViewCallback * @property {()=>void} removeOnViewCallback * @property {()=>void} unobserveElement * @typedef {elementsLCCallbacks & { element: HTMLElement }} elementsCallbacks * @typedef {(isAtInitialization:boolean)=>Promise<void>} effectCallback * @typedef {Object} elementsLCCallbacks * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback * @property {mrefOptions["onDisconnected"][]} lifecyclesOnDisconnected * @typedef {(options:{attributeName:string, newValue:string})=>Promise<void>} attributeChangedLifecycle * @typedef {Object} mrefOptions * @property {HTMLElement} element * @property {boolean} isConnected * @property {(strings:TemplateStringsArray,...values:string[])=>void} html * - control innerHTML using `templateLiteral` * @property {(arg0:attributeChangedLifecycle)=>void} onAttributeChanged * @property {(arg0:()=>Promise<void>)=>void} onDisconnected * @property {(elementsCallbacks:elementsLCCallbacks)=>onViewPortInstance} onViewPort * @property {(effect:effectCallback)=>{effect:effectCallback}} $ * - effect to monitor data changes; * @property {(relativePath:string)=>Promise<signalRef_|false>} signalRef * @typedef {(mrefOptions:mrefOptions)=>Promise<void>} vorth * @type {vorth} */export default async ( { ...options } )=>{	// replace ...option with properties that you need;	// your js code;}```> - `html` method can be called using html\`yourHMTLLiteral\`;> - recommended to install `lit-plugin` in vs-code for syntax highlighting;- for data layer, on the `/your/prefix/path/your/relative/path/signal.mjs`, export default of `any` type:```jsexport default '';// orexport default 1;// orexport default [];// orexport default { data: 'anything' };// or/** * @param {Promise<{value:any,call$:()=>void, remove$:()=>void}|false>} importData */export default async (importData) => { // must return with `any` type;};```> - which you can reference with `mrefOptions.signalRef` on the relative path it's pointing to;> - in the `mrefOptions.$`, you can reference return value of `mrefOptions.signalRef`, to create `effects`, which is a `callback` that will be called everytime there's changes on the value of that `reference` called in the `$` `callback` parameter, unless it's nested value like array or object, in wich you need to fire `call$` in the element lifecyle;> - the destructured { value } returned `mrefOptions.signalRef`, can be reassigned to trigger changes, except the endpoint that are exporting function type;> > - the function type is to tell `Vorth` that this is a `derived` `signal`, that are dependent on other `signal`;## documentation for signalrefer to [virst](https://www.npmjs.com/package/virst):- [Let](https://www.npmjs.com/package/virst#let) for exported data;- [Derived](https://www.npmjs.com/package/virst#derived) for derived function data;- [$](https://www.npmjs.com/package/virst#$) for effect `$`;

*) <sub>[go to exported list](#type-helper)</sub>
