// @ts-check

/**
 * @typedef {Object} shadredTypes
 * @typedef {(onViewCallback: import('virst').onViewPortHandler['onViewPort']) => import('virst').onViewPort} onViewPortCallback
 * @typedef {{}|null|number|string|boolean|symbol|bigint|function} anyButUndefined
 * @typedef {'vorth'} VorthNamespace
 * @typedef {'domReflect'} VorthDomReflect
 * @typedef {import('./lifecycles/vorthLifecycle.mjs').vorthLifecycleOptions} vorthLifecycleOptions
 * @typedef {{[K in keyof HTMLElementEventMap]? :{listener:(this: HTMLElement, ev: HTMLElementEventMap[K])=> void, options?:{onAdd?:boolean|AddEventListenerOptions, onRemove?:boolean|EventListenerOptions}}}} selectArg_On
 */
