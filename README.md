<h1>vorth</h1>

<b>`vorth`</b> is a `client-side` javascipt  library for handling `element lifecycle` and `data to dom reactivity`, which have:
>- 🐤 lightweight core;
>>- less then `10KB` gzipped
>- 🎯 declarative;
>>- dom reactivity follows this pattern:[`attributeName`="`attributeOrPropertySelector1`;`attributeOrPropertySelector2`;...;`attributeOrPropertySelectorN`"], to reflect and bind the input to the signal value `realtime`;
>- `v0.12.x`<strike> 🗜 `prebundled-first` approach;
>>- core are already prebuild in this `npm or github` `./vorthInitiator.mjs`;</strike>
>>- we drop this feature, in order to achieve full typehint support;
>- 📃 comprehensive typehint;
>>- <b>`vorth`</b> functionality are fully `typehinted`,
>>- `v0.12.x`<strike>`YES`, even if you chose to develop <b>DIRECTLY</b> at the static `endpoints` you still got `limited yet powerfull enough` `typehint`</strike>;
>>- purely for supporting full typehint across all files;
>- 📊 data layer;
>>- <b>`vorth`</b> provide `synchronized data layer` out of the box via `virst` `signal` and `domReflector`;
>- 💪 strong integration support with `npm` `client-side` 📚 packages;
>>- <b>`vorth`</b> have prepared `npx vorth` that functions as a directory watcher for developement (in `.mjs`, `.ts`, or `.mts` ) to `bundle` and `minify` `1 to 1` `.mjs` `endpoints`, for which you can `bundle` and `minify` additional client side `npm packages` as `libs`;
>>>- <b>YES</b>, you can put `typescript` and `javascipt` on the same source folder;
>- ⌛ on demand dom update via [virst](https://www.npmjs.com/package/virst) `Lifecycle`;
>>- with the possibility of offloading the templating responsibility to server, your premade static html stack, or even on demand update by `HATEOAS` apporach, <b>`vorth`</b> can handle the client side `logic`at ⚡`O(1)`⚡ starts, without compromising the ability of html templating when it's neccessary;
>- ⚡ blazingly responsive ⚡;
>>- supports `webWorker` out of the box for more expensive computation, without blocking client interactivity;
>- 🔌 embeddable;
>>- by adding `vorth="lifecycle/name"` to your element, you can easily embed your <b>`vorth`</b> code into any templating library/framework, even those that are purely run on the browser runtime;
>>- the only rule is `vorth="lifecycle/name"` is to exist at the same time when element is connected to the dom;

## documentation for signal
refer to [virst](https://www.npmjs.com/package/virst):
- [let_](https://www.npmjs.com/package/virst#let);
- [derived](https://www.npmjs.com/package/virst#derived);
- [$](https://www.npmjs.com/package/virst#$);

<b>!!!avoid importing on the endpoint!!!</b>
- there are cases that browser would `autocache` the imported library;
- we already profided `importData`, `importLib`, and `importWorker` that will optimize the cache with the browser session;
- if you use `__vorthApp` and find generated endpoint contains static import statement, please report as bug, along with the source and the produced endpoint;

<b>!!!avoid importing on the endpoint!!!</b>

## how to install starter project
 - install by running this script:
 ```shell
 npm i vorth
 ```
 - for empty starter:
 ```shell
 npx vorth-starter
 ```
 - for starter with examples:
 ```shell
 npx vorth-example
 ```
 - you'll then have this folder structure like this:
 >- `.vscode`
 >- `vorth.config.mjs`
 >- `vorth-src`
 >>- `vorthInitiator.mjs`
 >>- `data`
 >>- `libs`
 >>- `lifecycles`
 >>- `workers`
 >- `node_modules`
 - modify `vorth.config.mjs` to suit your setting;
 - to start develop your <b>`vorth`</b> code, run:
 ```shell
 npx vorth
 ```
 >- <b>`vorth`</b> detects `.mjs`, `.ts`, and `.mts` extentions inside `sourcePath` directory, and bundles them to `targetPath` `1 to 1` (it have to be in `esm`);
 >- all static imports will be bundled;
 >- due to <b>`vorth`</b> extensively generate types on the fly while also uses custom string generation and only generate `jsdoc`(no `.d.ts`), <b>`vorth`</b> need to put `jsconfig.json` on your project, so if you have any settings for this `compilerOptions` settings will be overwritten
```json
{
...
	"compilerOptions": {
		...
		"baseUrl": ".",
		"allowJs": true,
		"module": "esnext",
		"target": "esnext",
		"moduleResolution": "node",
		"esModuleInterop": true,
		"skipLibCheck": true,
		"skipDefaultLibCheck": true,
		"allowSyntheticDefaultImports": true
	}
}
```
 - check at [Vorth](#vorth) for `property control`;

versions
>- `v0.11.x`:
>>- fixed `onViewPort` bugs;
>>- <strike>beta for full release;
>>- need to be checked for edge cases;</strike>
>- `v0.12.x`:
>>- drop direct writing on endpoint support, to achieve full typehint on all files;
>>- streamlined `install method` and `builder script`;
>>- beta for full release;
>>- need to be checked for edge cases;
## importable-classes
- [Vorth](#vorth)
- [__vorthConfig](#__vorthconfig)
<h2 id="vorth">Vorth</h2>

#### how to structure your static file:- load `targetPath/vorthInitiator.mjs` to your `html`;```html<script type="module" src="targetPath/vorthInitiator.mjs"></script>```- add neccessary attribute to `vorthInitiator.mjs` like `defer`(if you put it in the head tag);- structure your folder:>- `{targetPath}`>>- `vorthInitiator.mjs`>>- `data`>>- `libs`>>- `lifecycles`>>- `workers`- use snippet prefixed by <b>`>>`</b>(double `greater than` symbol) for quick typehinting snippets;>- the snippets structure are templated in a way to generate the types, do not put the types outside the snippets recomended;- add `property controls` (`content` `attribute`) for vorth in the head tag if neccessary;```html<meta property="vorth-batch" content="10" />```>- [`property="vorth-batch"`]: `content` used to tell <b>`vorth`</b> maximum element to be loaded at batch when crossing the `viewPort`;>- you can add `;pre` like this [`vorth="lifecycle/name;pre"`] to directly process the `element` without waiting for it to cross the `viewPort`;>- `"lifecycle/name"` means you are pointing to `"targetPath/lifecycles/lifecycle/name.mjs"`, this patterns also applied to `importData`, `lifecycleAttr`, `importWorker`, `importLib`, to their respective folder;```html<meta property="vorth-versionMin" content="1738851920151" />```>- [`property="vorth-versionMin"`]: `content` used to tell <b>`vorth`</b> minimum `cachedDate` in `unix date ms` is allowed;>- you can dynamically provide this tag from the server, and that will refresh the `cachedDate` of <b>`vorth`</b> code (`managed internally`), while keeping client's session and local storage;- both `property controls` are monitored, so when it's changed dynamically in the runtime, <b>`vorth`</b> will reactively apply the new value to it's logic;#### how to add the lifecycle handler to html:```html<div vorth="path/fileName"></div>```- this will target `{targetPath}/lifecycles/path/fileName.mjs`;#### further documentation and examples- will be posted in [html-first documentation website](https://html-first.bss.design/)

*) <sub>[go to exported list](#importable-classes)</sub>

<h2 id="__vorthconfig">__vorthConfig</h2>

- this class is to be used as helper to setup `vorth.config.mjs` on your project root.

*) <sub>[go to exported list](#importable-classes)</sub>
