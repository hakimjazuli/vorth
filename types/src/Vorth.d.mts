/**
 * @description
 * - Vorth window object initialization
 * - use this as the type definition
 * ```js
 * /**
 * * @type {register}
 * *[blank]/
 * const vorth = window['vorthJS'];
 * /**
 * * @typedef {Record<string, string>} Data
 * * @typedef {(registerOptions:registerOptions)=>void} register
 * * @typedef {Object} registerOptions
 * * @property {(attributeValue:string)=>string} options.pathRule
 * * @property {()=>Promise<void>} [options.onRouteChange]
 * * - modify fetch end point from `v-path`;
 * * @property {Record<string, ()=>Promise<void>>} [options.triggers]
 * * @property {Record<string, ()=>Promise<{template:string, Data:Data}>>} [options.callbacks]
 * *[blank]/
 * ```
 * - donwload "/build/index.mjs" and load it on your all of your `*.html` files;
 **/
export class Vorth {
    /**
     * @private
     */
    private static _;
    /**
     * @private
     * @type {register}
     */
    private static register;
}
/**
 * *
 */
export type Data = Record<string, string>;
/**
 * *
 */
export type register = (registerOptions: registerOptions) => void;
/**
 * *
 */
export type registerOptions = {
    /**
     * *
     */
    pathRule: (attributeValue: string) => string;
    /**
     * * - modify fetch end point from `v-path`;
     * *
     */
    onRouteChange?: () => Promise<void>;
    /**
     * *
     */
    triggers?: Record<string, () => Promise<void>>;
    /**
     * *[blank]/
     * ```
     * - donwload "/build/index.mjs" and load it on your all of your `*.html` files;
     */
    callbacks?: Record<string, () => Promise<{
        template: string;
        Data: Data;
    }>>;
};
