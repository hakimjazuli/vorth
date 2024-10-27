- this is a placeholder for client side router & renderer library made using [virst](https://www.npmjs.com/package/virst) `Lifecycle`;
- until later stable release of vorth, the documentation will be minimal;


<h2 id="exported-api-and-type-list">exported-api-and-type-list</h2>

- [Vorth](#vorth)

<h2 id="vorth">Vorth</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- Vorth window object initialization- use this as the type definition```js/*** @type {register}*/const vorth = window['vorthJS'];/*** @typedef {Record<string, string>} Data* @typedef {(registerOptions:registerOptions)=>void} register* @typedef {Object} registerOptions* @property {(attributeValue:string)=>string} options.pathRule* @property {()=>Promise<void>} [options.onRouteChange]* - modify fetch end point from `v-path`;* @property {Record<string, ()=>Promise<void>>} [options.triggers]* @property {Record<string, ()=>Promise<{template:string, Data:Data}>>} [options.callbacks]*/```- donwload "/build/index.mjs" and load it on your all of your `*.html` files;*

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
