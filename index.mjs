// @ts-check
/**
 * generated using:
 * @see {@link https://www.npmjs.com/package/@html_first/js_lib_template | @html_first/js_lib_template}
 * @copyright
 * this library is build and bundled under MIT license
 * @description
 * <h1>vorth</h1>
 * 
 * <b>`vorth`</b> is a `client-side` javascipt  library for handling `element lifecycle` and `data to dom reactivity`, which have:
 * >- 🐤 lightweight core;
 * >>- less then `10KB` gzipped
 * >- 🎯 declarative;
 * >>- dom reactivity follows this pattern:[`attributeName`="`attributeOrPropertySelector1`;`attributeOrPropertySelector2`;...;`attributeOrPropertySelectorN`"], to reflect and bind the input to the signal value `realtime`;
 * >- 🗜 `prebundled-first` approach;
 * >>- core are already prebuild in this `npm/git` `./initiator.mjs`;
 * >- 📃 comprehensive typehint;
 * >>- <b>`vorth`</b> functionality are fully `typehinted`;
 * >>- `YES`, even if you chose to develop <b>DIRECTLY</b> at the static `endpoints` you still got `limited yet powerfull enough` `typehint`;
 * >- 📊 data layer;
 * >>- <b>`vorth`</b> provide `synchronized data layer` out of the box via `virst` `signal` and `domReflector`;
 * >- 💪 strong integration support with `npm` `client-side` 📚 packages;
 * >>- for those who prefer to bundles aditional external library from `npm` `packages`, <b>`vorth`</b> have prepared [__vorthApp](#__vorthapp) `class` that functions as a directory watcher for developement (in `mjs`, `ts`, or `mts` ) to `bundle` and `minify` `1 to 1` `.mjs` `endpoints`;
 * >- ⌛ detects incremental dom update via [virst](https://www.npmjs.com/package/virst) `Lifecycle`;
 * >>- with the possibility of offloading the templating responsibility to server, your premade static html stack, or even incremental update by `HATEOAS` apporach, <b>`vorth`</b> can handle the client side `logic`at ⚡`O(1)`⚡ starts, without compromising the ability of html templating when it's neccessary;
 * >- ⚡ blazingly responsive ⚡;
 * >>- supports `webWorker` out of the box for more expensive computation, without blocking client interactivity;
 * >- 🔌 embeddable;
 * >>- by adding `vorth="lifecycle/name"` to your element, you can easily embed your <b>`vorth`</b> code into any templating library/framework, even those that are purely run on the browser runtime;
 * >>- the only rule is `vorth="lifecycle/name"` is to exist at the same time when element is connected to the dom;
 * 
 * ## documentation for signal
 * refer to [virst](https://www.npmjs.com/package/virst):
 * - [Let](https://www.npmjs.com/package/virst#let) for exported `data.let`, only support dataOnly;
 * - [Derived](https://www.npmjs.com/package/virst#derived) for derived function `data.derived`, only support dataOnly;
 * - [$](https://www.npmjs.com/package/virst#$) for `$` as in `effect`;
 * 
 * ## further documentation and examples
 * - will be posted in [html-first documentation website](https://html-first.bss.design/)
 * 
 * <b>!!!avoid importing on the endpoint!!!</b>
 * - there are cases that browser would `autocache` the imported library;
 * - we already profided `importData`, `importLib`, and `importWorker` that will optimize the cache with the browser session;
 * - if you use `__vorthApp` and find generated endpoint contains import statement, please report as bug, along with the source and the produced endpoint;
 * 
 * versions
 * - v0.9.0:
 * >- this is a test version, for smooth installation;
 */
export { StaticVorthData } from './src/data/StaticVorthData.mjs';
export { StaticVorthLib } from './src/libs/StaticVorthLib.mjs';
export { StaticVorthLifecycle } from './src/lifecycles/StaticVorthLifecycle.mjs';
export { Vorth } from './src//Vorth.mjs';
export { StaticVorthWorker } from './src/workers/StaticVorthWorker.mjs';
export { __vorthApp } from './src//__vorthApp.mjs';
/**
 * @typedef {import('vorth/src/data/dataList.mjs').dataList} dataList
 */
/**
 * @template {boolean} isDerived
 * @template signalValueType
 * @typedef {import('./src/data/vorthData.mjs').vorthData<isDerived, signalValueType>} vorthData
 */
/**
 * @typedef {import('vorth/src/libs/libsList.mjs').libsList} libsList
 */
/**
 * @template {(...any:any)=>Promise<any>} F
 * @typedef {(vorthLifecycleOptions:import('./src/lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions, ...paramsTypes:Parameters<F>)=>ReturnType<F>} vorthLib
 */
/**
 * @typedef {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecyclesList} lifecyclesList
 */
/**
 * @typedef {import('./src/lifecycles/vorthLifecycle.mjs').vorthLifecycle} vorthLifecycle
 */
/**
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workersList
 */