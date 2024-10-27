export class triggers {
    /**
     * @type {Record<string, (element:HTMLElement)=>Promise<void>>}
     */
    static default: Record<string, (element: HTMLElement) => Promise<void>>;
    /**
     * @type {triggers}
     */
    static __: triggers;
    /**
     * @param {import("./Vorth.mjs").registerOptions["triggers"]} triggers_
     */
    constructor(triggers_: import("./Vorth.mjs").registerOptions["triggers"]);
}
