/**
 * @description
 * how to use:
 * - download the `prebundled.mjs`, and load it on your html:
 * ```html
 * <script type="module" src="/your/vort_root/path/prebundled.mjs"></script>
 * ```
 * - add `vorth` and `your/relative/path/module` as `attribute` on the element:
 * ```html
 * <div vorth="your/relative/path/module"></div>
 * ```
 * - `vorthLifecycle`: paste this type helper on `/your/vort_root/path/lifecycles/your/relative/path/module.mjs`(the `lifecycles/` is fixed path):
 * ```js
 * /**
 * * @typedef {(...args:any)=>Promise<any>} importedLib
 * * @typedef {Record<string, any>|Array|string|number|boolean} returnOfSignal
 * * @typedef {{value:returnOfSignal,call$:()=>void,remove$:(effect:{effect:()=>void})=>void}} signalRef_
 * * @typedef {Object} onViewPortInstance
 * * @property {() => Promise<void>} disconnect
 * * @property {(element: Element | HTMLElement) => onViewPortHandler} handlers
 * * @typedef {Object} onViewPortHandler
 * * @property {()=>void} removeOnExitViewCallback
 * * @property {()=>void} removeOnViewCallback
 * * @property {()=>void} unobserveElement
 * * @typedef {(isAtInitialization:boolean)=>Promise<void>} effectCallback
 * * @typedef {Object} elementsLCCallbacks
 * * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onViewCallback
 * * @property {(onViewCallbacksOptions: onViewPortHandler) => Promise<void>} onExitViewCallback
 * * @property {mrefOptions["onDisconnected"][]} lifecyclesOnDisconnected
 * * @typedef {Object} mrefOptions
 * * @property {HTMLElement} element
 * * @property {boolean} isConnected
 * * @property {(strings:TemplateStringsArray,...values:string[])=>void} html
 * * - control innerHTML using `templateLiteral`;
 * * @property {(arg0:(options:{attributeName:string, newValue:string})=>Promise<void>)=>void} onAttributeChanged
 * * @property {(arg0:()=>Promise<void>)=>void} onDisconnected
 * * @property {(elementsCallbacks:elementsLCCallbacks)=>onViewPortInstance} onViewPort
 * * @property {(effect:effectCallback)=>{effect:effectCallback}} $
 * * - to create `effect` on data changes;
 * * @property {(relativePath:string)=>Promise<signalRef_|false>} importData
 * * @property {(relativePath:string)=>Promise<importedLib|false>} importLib
 * * @property {(options:{dataOnly:returnOfSignal}|{attributeName:string, data:returnOfSignal})=>signalRef_|false} let_
 * * @property {(options:{dataOnly:()=>Promise<returnOfSignal>}|{attributeName:string, data:()=>Promise<returnOfSignal>})=>signalRef_|false} derived
 * * @property {string} loopedAttrName
 * * @property {()=>{[key:string]:string}} parsedLoopedAttr
 * * @property {(options:{signal:signalRef_, childLifescyclePath:string, afterLoopCallback?:()=>Promise<void>,element?:HTMLElement})=>void} for_
 * * @typedef {(mrefOptions:mrefOptions)=>Promise<void>} vorthLifecycle
 * *[blank]/
 * /** [blank]@type {vorthLifecycle} *[blank]/
 *	export default async ( { ...options /** replace ...option with properties that you need;  *[blank]/ } )=>{
 *		// your js code;
 *	}
 * ```
 * > - for `onDisconnected` `event`, there's no need for manual clean-up on `let_` and `derived`, as both are automatically `unRefed`, when this `event` is triggered;
 * > - `for_`:
 * > > - `element` if not filled will refer to current `lifecycle` `element`;
 * > > - `signal` `value` `type` should be `{[key:string]:string}[]`;
 * > - `html` method can be called using html\`yourHMTLLiteral\`;
 * > - recommended to install `lit-plugin` in vs-code for syntax highlighting;
 * > - in real `runtime` the path will be something like:
 * > > - `/assets/js/modules/lifecycles/my_module.mjs`;
 * > > - `/assets/js/modules/data/my_data.mjs`;
 * - `vorthData`: for data layer, on the `/your/vort_root/path/data/your/relative/path/signal.mjs`(the `data/` is fixed path):
 * ```js
 * /**
 * * @typedef {{value:any,call$:()=>void,remove$:(effect:{effect:()=>void})=>void}} signalRef__
 * * @typedef {{data:{let:Record<string, any>|Array|string|number|boolean},storeMode:false|'localStorage'|'sessionStorage'}|{data:{derived:((a0:{importData:(relativePath:string)=>Promise<signalRef__|false>,importLib:(relativePath:string)=>Promise<((...args:any)=>Promise<any>)|false>})=>Promise<Record<string, any>|Array|string|number|boolean>)}}} vorthData
 * *[blank]/
 * /** [blank]@type {vorthData} *[blank]/
 * export default { storeMode: false, data: {...option} }
 * ```
 * > - which you can reference with `mrefOptions.signalRef` on the relative path it's pointing to;
 * > - the destructured { value } returned from `mrefOptions.signalRef`, can be reassigned to trigger `changes`, except the endpoint that are `derived`;
 * > - in the `mrefOptions.$`, you can reference return value of `mrefOptions.signalRef`, to create `effects`, which is a `callback` that will be called everytime there's `changes` on the value of that `reference` called in the `$` `callback` parameter, unless it's nested value like array(using array modification method) or object, in wich you need to fire `call$` in the element lifecyle, unless you want to use reassignment syntax using spreading operator;
 * ```js
 * // in vorthLifecycle scope
 * const signal = let_([1,2,3]); // or from signalRef;
 * signal.value.push(4);
 * signal.call$();
 * // will have the same effect of
 * signal.value = [ ...signal.value, 1 ];
 * // the spreading operator also works on object type
 * // const signal = let_({ data1:'1', data2:'2' }); // or from signalRef;
 * // signal.value = { ...signal.value, newKey:'value' };
 * $(async (isAtInitialization) => {
 *		const value = signal.value;
 *		// if (isAtInitialization) {
 *		//	return;
 *		// } // uncomment this to stop any further signal autosubscribing bellow this point
 *		console.console.log(value);
 * });
 * ```
 * - `vorthLib`: for data layer, on the `/your/vort_root/path/libs/your/relative/path/lib.mjs`(the `libs/` is fixed path):
 * ```js
 * /**
 * * @typedef {(...args:any)=>Promise<any>} vorthLib
 * *[blank]/
 * /** @type {vorthLib} *[blank]/
 * export default async () => {
 * 	// js code
 * }
 * ```
 * > - which you can use by using `importLib` on multiple `lifecycle` or `derived` `data`;
 */
export class Vorth {
    /**
     * @type {Vorth}
     */
    static __: Vorth;
    /**
     * @private
     * @returns {void}
     */
    private setDate;
    /**
     * @type {string}
     */
    cacheDate: string;
    /**
     * @private
     * @type {Map<string, vorthLifecycle>}
     */
    private chacedRef;
    /**
     * @private
     * @type {Map<string, vorthData & {signal:Derived|Let}>}
     */
    private cachedLet;
    /**
     * @private
     * @type {Map<string, importedLib>}
     */
    private cachedLib;
    /**
     * @private
     * @returns {void}
     */
    private setBase;
    /**
     * @private
     * @type {string}
     */
    private base;
    /**
     * @private
     * @param {string} importPath
     * @returns {Promise<vorthLifecycle|false>}
     */
    private importVorth;
    /**
     * @private
     * @param {string} relativePath
     * @returns {string}
     */
    private storageKey;
    /**
     * @private
     * @param {string} relativePath
     */
    private importLib;
    /**
     * @private
     * @param {string} relativePath
     * @returns {Promise<signalRef_|false>}
     */
    private importData;
    /**
     * @private
     */
    private loopedAttr;
    /**
     * @private
     * @param {Object} a0
     * @param {HTMLElement} a0.element
     * @param {signalRef_} a0.signal
     * @param {string} a0.childLifescyclePath
     * @param {()=>Promise<void>} [a0.afterLoopCallback]
     * @returns {void}
     */
    private for;
    /**
     * @private
     * @return {void}
     */
    private vorthLifecycle;
}
/**
 * *
 */
export type importedLib = (...args: any) => Promise<any>;
/**
 * *
 */
export type returnOfSignal = Record<string, any> | any[] | string | number | boolean;
/**
 * *
 */
export type signalRef_ = {
    value: returnOfSignal;
    call$: () => void;
    remove$: (effect: {
        effect: () => void;
    }) => void;
};
/**
 * *
 */
export type onViewPortInstance = {
    /**
     * *
     */
    disconnect: () => Promise<void>;
    /**
     * *
     */
    handlers: (element: Element | HTMLElement) => onViewPortHandler;
};
/**
 * *
 */
export type onViewPortHandler = {
    /**
     * *
     */
    removeOnExitViewCallback: () => void;
    /**
     * *
     */
    removeOnViewCallback: () => void;
    /**
     * *
     */
    unobserveElement: () => void;
};
/**
 * *
 */
export type effectCallback = (isAtInitialization: boolean) => Promise<void>;
/**
 * *
 */
export type elementsLCCallbacks = {
    /**
     * *
     */
    onViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    /**
     * *
     */
    onExitViewCallback: (onViewCallbacksOptions: onViewPortHandler) => Promise<void>;
    /**
     * *
     */
    lifecyclesOnDisconnected: mrefOptions["onDisconnected"][];
};
/**
 * *
 */
export type mrefOptions = {
    /**
     * *
     */
    element: HTMLElement;
    /**
     * *
     */
    isConnected: boolean;
    /**
     * * - control innerHTML using `templateLiteral`;
     * *
     */
    html: (strings: TemplateStringsArray, ...values: string[]) => void;
    /**
     * *
     */
    onAttributeChanged: (arg0: (options: {
        attributeName: string;
        newValue: string;
    }) => Promise<void>) => void;
    /**
     * *
     */
    onDisconnected: (arg0: () => Promise<void>) => void;
    /**
     * *
     */
    onViewPort: (elementsCallbacks: elementsLCCallbacks) => onViewPortInstance;
    /**
     * * - to create `effect` on data changes;
     * *
     */
    $: (effect: effectCallback) => {
        effect: effectCallback;
    };
    /**
     * *
     */
    importData: (relativePath: string) => Promise<signalRef_ | false>;
    /**
     * *
     */
    importLib: (relativePath: string) => Promise<importedLib | false>;
    /**
     * *
     */
    let_: (options: {
        dataOnly: returnOfSignal;
    } | {
        attributeName: string;
        data: returnOfSignal;
    }) => signalRef_ | false;
    /**
     * *
     */
    derived: (options: {
        dataOnly: () => Promise<returnOfSignal>;
    } | {
        attributeName: string;
        data: () => Promise<returnOfSignal>;
    }) => signalRef_ | false;
    /**
     * *
     */
    loopedAttrName: string;
    /**
     * *
     */
    parsedLoopedAttr: () => {
        [key: string]: string;
    };
    /**
     * *
     */
    for_: (options: {
        signal: signalRef_;
        childLifescyclePath: string;
        afterLoopCallback?: () => Promise<void>;
        element?: HTMLElement;
    }) => void;
};
/**
 * *[blank]/
 * /** [blank]@type {vorthLifecycle} *[blank]/
 * export default async ( { ...options /** replace ...option with properties that you need;  *[blank]/ } )=>{
 * // your js code;
 * }
 * ```
 * > - for `onDisconnected` `event`, there's no need for manual clean-up on `let_` and `derived`, as both are automatically `unRefed`, when this `event` is triggered;
 * > - `for_`:
 * > > - `element` if not filled will refer to current `lifecycle` `element`;
 * > > - `signal` `value` `type` should be `{[key:string]:string}[]`;
 * > - `html` method can be called using html\`yourHMTLLiteral\`;
 * > - recommended to install `lit-plugin` in vs-code for syntax highlighting;
 * > - in real `runtime` the path will be something like:
 * > > - `/assets/js/modules/lifecycles/my_module.mjs`;
 * > > - `/assets/js/modules/data/my_data.mjs`;
 * - `vorthData`: for data layer, on the `/your/vort_root/path/data/your/relative/path/signal.mjs`(the `data/` is fixed path):
 * ```js
 * /**
 * *
 */
export type vorthLifecycle = (mrefOptions: mrefOptions) => Promise<void>;
/**
 * *
 */
export type signalRef__ = {
    value: any;
    call$: () => void;
    remove$: (effect: {
        effect: () => void;
    }) => void;
};
/**
 * *[blank]/
 * /** [blank]@type {vorthData} *[blank]/
 * export default { storeMode: false, data: {...option} }
 * ```
 * > - which you can reference with `mrefOptions.signalRef` on the relative path it's pointing to;
 * > - the destructured { value } returned from `mrefOptions.signalRef`, can be reassigned to trigger `changes`, except the endpoint that are `derived`;
 * > - in the `mrefOptions.$`, you can reference return value of `mrefOptions.signalRef`, to create `effects`, which is a `callback` that will be called everytime there's `changes` on the value of that `reference` called in the `$` `callback` parameter, unless it's nested value like array(using array modification method) or object, in wich you need to fire `call$` in the element lifecyle, unless you want to use reassignment syntax using spreading operator;
 * ```js
 * // in vorthLifecycle scope
 * const signal = let_([1,2,3]); // or from signalRef;
 * signal.value.push(4);
 * signal.call$();
 * // will have the same effect of
 * signal.value = [ ...signal.value, 1 ];
 * // the spreading operator also works on object type
 * // const signal = let_({ data1:'1', data2:'2' }); // or from signalRef;
 * // signal.value = { ...signal.value, newKey:'value' };
 * $(async (isAtInitialization) => {
 * const value = signal.value;
 * // if (isAtInitialization) {
 * //	return;
 * // } // uncomment this to stop any further signal autosubscribing bellow this point
 * console.console.log(value);
 * });
 * ```
 * - `vorthLib`: for data layer, on the `/your/vort_root/path/libs/your/relative/path/lib.mjs`(the `libs/` is fixed path):
 * ```js
 * /**
 * *
 */
export type vorthData = {
    data: {
        let: Record<string, any> | any[] | string | number | boolean;
    };
    storeMode: false | "localStorage" | "sessionStorage";
} | {
    data: {
        derived: ((a0: {
            importData: (relativePath: string) => Promise<signalRef__ | false>;
            importLib: (relativePath: string) => Promise<((...args: any) => Promise<any>) | false>;
        }) => Promise<Record<string, any> | any[] | string | number | boolean>);
    };
};
/**
 * *[blank]/
 * /**
 */
export type vorthLib = (...args: any) => Promise<any>;
