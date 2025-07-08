// @ts-check
/**
 * generated using:
 * @see {@link https://www.npmjs.com/package/@html_first/js_lib_template | @html_first/js_lib_template}
 * @copyright
 * this library is build and bundled under MIT license
 * @description
 * <h1>vorth<super>JS</super></h1>
 * 
 * <b>`vorth`</b> is a `client-side` javascipt  library for handling `element lifecycle` and `data to dom reactivity`, which have:
 * >- 🐤 lightweight core;
 * >>- less then `10KB` gzipped
 * >- 🎯 declarative;
 * >>- dom reactivity follows this pattern:[`attributeName`="`attributeOrPropertySelector1`;`attributeOrPropertySelector2`;...;`attributeOrPropertySelectorN`"], to reflect and bind the input to the signal value `realtime`;
 * >- `v0.12.x`<strike> 🗜 `prebundled-first` approach</strike>;
 * >>-<strike> core are already prebuild in this `npm or github` `./vorthInitiator.mjs`</strike>;
 * >>- we drop this feature, in order to achieve full typehint support;
 * >- 📃 comprehensive typehint;
 * >>- <b>`vorth`</b> functionality are fully `typehinted`,
 * >>- `v0.12.x`<strike>`YES`, even if you chose to develop <b>DIRECTLY</b> at the static `endpoints` you still got `limited yet powerfull enough` `typehint`</strike>;
 * >>- purely for supporting full typehint across all files;
 * >- 📊 data layer;
 * >>- <b>`vorth`</b> provide `synchronized data layer` out of the box via `virst` `signal` and `domReflector`;
 * >- 💪 strong integration support with `npm` `client-side` 📚 packages;
 * >>- <b>`vorth`</b> have prepared `npx vorth` that functions as a directory watcher for developement (in `.mjs`, `.ts`, or `.mts` ) to `bundle` and `minify` `1 to 1` `.mjs` `endpoints`, for which you can `bundle` and `minify` additional client side `npm packages` as `libs`;
 * >>>- <b>YES</b>, you can put `typescript` and `javascipt` on the same source folder;
 * >- ⌛ on demand dom update via [virst](https://www.npmjs.com/package/virst) `Lifecycle`;
 * >>- with the possibility of offloading the templating responsibility to server, your premade static html stack, or even on demand update by `HATEOAS` apporach, <b>`vorth`</b> can handle the client side `logic`at ⚡`O(1)`⚡ starts, without compromising the ability of html templating when it's neccessary;
 * >- ⚡ blazingly responsive ⚡;
 * >>- supports `webWorker` out of the box for more expensive computation, without blocking client interactivity;
 * >- 🔌 embeddable;
 * >>- by adding `vorth="lifecycle/name"` to your element, you can easily embed your <b>`vorth`</b> code into any templating library/framework, even those that are purely run on the browser runtime;
 * >>- the only rule is `vorth="lifecycle/name"` is to exist at the same time when element is connected to the dom;
 * 
 * ## documentation for signal
 * refer to [virst](https://www.npmjs.com/package/virst):
 * - [let_](https://www.npmjs.com/package/virst#let);
 * - [derived](https://www.npmjs.com/package/virst#derived);
 * - [$](https://www.npmjs.com/package/virst#$);
 * 
 * <b>!!!avoid importing on the endpoint!!!</b>
 * - there are cases that browser would `autocache` the imported library;
 * - we already profided `importData`, `importLib`, and `importWorker` that will optimize the cache with the browser session;
 * - if you use `__vorthApp` and find generated endpoint contains static import statement, please report as bug, along with the source and the produced endpoint;
 * 
 * <b>!!!avoid importing on the endpoint!!!</b>
 * 
 * ## how to install starter project
 *  - install by running this script:
 *  ```shell
 *  npm i vorth
 *  ```
 *  - then for empty starter:
 *  ```shell
 *  npx vorth-starter
 *  ```
 *  - or for starter with examples:
 *  ```shell
 *  npx vorth-example
 *  ```
 *  - you'll then have this folder structure like this:
 *  >- `.vscode`: snippets collection.
 *  >- `jsconfig.json`: typehint helper for `.mts` and `.ts` files.
 *  >- `vorth.config.mjs`: builder config
 *  >- `vorth-src`: source folder.
 *  >>- `vorthInitiator.mjs`: <b>`vorth`</b> entry point.
 *  >>- `data`
 *  >>- `libs`
 *  >>- `lifecycles`
 *  >>- `workers`
 *  >- `node_modules`
 *  - modify `vorth.config.mjs` to suit your setting;
 *  - to start develop your <b>`vorth`</b> code, run:
 *  ```shell
 *  npx vorth
 *  ```
 *  >- <b>`vorth`</b> detects `.mjs`, `.ts`, and `.mts` extentions inside `sourcePath` directory, and bundles them to `targetPath` `1 to 1` (it have to be in `esm style`);
 *  >- all static imports will be bundled;
 *  >- due to <b>`vorth`</b> extensively generate types on the fly while also uses custom string generation and only generate `jsdoc`(no `.d.ts`), <b>`vorth`</b> need to put `jsconfig.json` on your project, so if you have any settings for this `compilerOptions` settings will be overwritten
 * ```json
 * {
 * ...
 * 	"compilerOptions": {
 * 		...
 * 		"baseUrl": ".",
 * 		"allowJs": true,
 * 		"module": "esnext",
 * 		"target": "esnext",
 * 		"moduleResolution": "node",
 * 		"esModuleInterop": true,
 * 		"skipLibCheck": true,
 * 		"skipDefaultLibCheck": true,
 * 		"allowSyntheticDefaultImports": true
 * 	}
 * }
 * ```
 *  - check at [Vorth](#vorth) for `property control`;
 * 
 * versions
 * >- `v0.11.x`:
 * >>- fixed `onViewPort` bugs;
 * >>- <strike>beta for full release;</strike>
 * >>- <strike>need to be checked for edge cases;</strike>
 * >- `v0.12.x`:
 * >>- drop direct writing on endpoint support, to achieve full typehint on all files;
 * >>- streamlined `install method` and `builder script`;
 * >>- beta for full release;
 * >>- need to be checked for edge cases;
 * >- `v0.12.9+`:
 * >>- updated <b>`virst`</b> version for security;
 * >>- example with `html` file;
 * >>- `for_.of` also returns parentData;
 * >- `v0.13.x`:
 * >>- main `modules`<sub>(`lifecycles`, `derivedData`, and `libs`)</sub> `options` are no longer passed to `arg0` but are binded to `this` for each `modules`;
 * >>>- reasoning by doing this, you need no longer to scroll to function declaration and `destructure`/`unwrap` `arg0`, all you need to do is refer `this.${optionName}` directly on the line you need to call that option, while ofcourse `destructure`/`unwrap` `this` is also an option;
 * 
 */
export { shared } from './src//shared.export.mjs';
export { Vorth } from './src//Vorth.mjs';
export { __vorthApp } from './src//__vorthApp.mjs';
export { __vorthConfig } from './src//__vorthConfig.mjs';
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
 * @typedef {(this:import('./src/lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions, ...paramsTypes:Parameters<F>)=>ReturnType<F>} vorthLib
 */
/**
 * @typedef {import('vorth/src/lifecycles/lifecyclesList.mjs').lifecyclesList} lifecyclesList
 */
/**
 * @typedef {import('./src/lifecycles/vorthLifecycle.mjs').vorthLifecycle} vorthLifecycle
 */
/**
 * @typedef {Object} shadredTypes
 * @typedef {(onViewCallback: import('virst').onViewPortHandler['onViewPort']) => import('virst').onViewPort} onViewPortCallback
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
 * @typedef {'vorth'} VorthNamespace
 * @typedef {'domReflect'} VorthDomReflect
 * @typedef {import('./src//lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} vorthLifecycleOptions
 * @typedef {{[K in keyof HTMLElementEventMap]? :{listener:(this: HTMLElement, ev: HTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}}} selectArg_On
 */
/**
 * @template receiveMainThread
 * @template postMainThread
 * @typedef {{post:{main:MessageEvent<postMainThread>, worker:postMainThread}, receive:{main:receiveMainThread, worker:MessageEvent<receiveMainThread>}}} vorthWorker
 */
/**
 * @typedef {import('vorth/src/workers/workersList.mjs').workersList} workersList
 */