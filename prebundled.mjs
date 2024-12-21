class X{static webComponentGlobalStyles=[];static literal=(G,...J)=>{let K=[];for(let Q=0;Q<G.length;Q++)if(K.push(G[Q]),Q<J.length)K.push(J[Q]);return K.join("")};static subscriber=null;static debounce=0;static removeDOM$="virst-rm-dom$";static val="virst-a-val";static qRouteChange="virst-qrc";static getDocument=async(G)=>{if(G in X.cachedDocument)return X.cachedDocument[G];let J;try{if(J=await fetch(G),!J.ok)J=await fetch(`${G}.html`);if(!J.ok)throw Error(`Error fetching: status="${J.status}"`);let K=await J.text(),Q=new DOMParser;return X.cachedDocument[G]=Q.parseFromString(K,"text/html")}catch(K){console.error({error:K,response:J})}};static cachedDocument={};static docScopeElement="virst-sc";static storageIdentifier="virst-st";static DCCBIdentifier="virst-dc";static ACCBIdentifier="virst-ac";static onViewCBIdentifier="virst-ov";static onExitViewCBIdentifier="virst-oxv";static templatePrefix="virst-template";static keptElement="virst-keep";static ForQPrefix="virst-fq-";static ForChildAttributePrefix="virst-fc-";static warningSingleton=(G)=>{console.warn({class:G,message:"is a singleton class, and can only be instantiated once"})};static generateUniqueString(){let G=Date.now(),J=Math.floor(Math.random()*1e6);return`${G}${J}`}static attr=null;static currentDocumentScope_=void 0;static get currentDocumentScope(){if(this.currentDocumentScope_===void 0)this.currentDocumentScope_=window.document;return this.currentDocumentScope_}static set currentDocumentScope(G){this.currentDocumentScope_=G}static attrPrefix="virst-ap-";static attributeIndexGenerator=(G=!1)=>{if(X.currentDocumentScope==window.document&&!G)return this.attr=null;return this.attr=`${X.attrPrefix}${this.generateUniqueString()}`};static timeout=(G)=>new Promise((J)=>setTimeout(J,G));static splitX=(G,J)=>{let K=[],Q="",Y=!1;for(let Z=0;Z<G.length;Z++){let B=G[Z];if(Y)Q+=B,Y=!1;else if(B==="\\")Y=!0;else if(B===J)K.push(Q),Q="";else Q+=B}return K.push(Q),K};static separator=";";static validAttributeNameSelector=(G)=>G.toLowerCase().replace(/:/g,"\\:");static handlePromiseAll=async(G,J,...K)=>{if(!J)return;await Promise.all(J.map(async(Q)=>{try{await Q(...K)}catch(Y){console.error({callback:Q,source:G,message:"Error in callback",error:Y})}})).catch((Q)=>{console.error({asyncArrayFunctions:J,source:G,message:"Promise.all failed:",error:Q})})}}class A{constructor(){window.virst=window.virst??{},window.virst.QFIFO=window.virst.QFIFO??this.assign_}queue=[];isRunning=!1;assign_=(G)=>{if(this.push(G),!this.isRunning)this.run()};static _=new A;static assign=window.virst.QFIFO;push=(G)=>{this.queue.push(G.details)};run=async()=>{this.isRunning=!0;while(this.queue.length!==0){let[G,J]=this.queue[0];if(this.queue.shift(),J)await X.timeout(J);await G()}this.isRunning=!1}}class j{details;constructor(G,J=0){this.details=[G,J]}}class q{constructor(){window.virst=window.virst||{},window.virst.QUnique=window.virst.QUnique||this.assign_}queue=new Map;isRunning=!1;assign_=(G)=>{if(this.push(G),!this.isRunning)this.run()};static _=new q;static assign=window.virst.QUnique;push=(G)=>{let{callback:J,debounce:K,id:Q}=G;this.queue.set(Q,[J,K?K:0])};run=async()=>{this.isRunning=!0;let G=this.queue.keys(),J=G.next();while(!J.done){let K=J.value,[Q,Y]=this.queue.get(K);this.queue.delete(K),await X.timeout(Y),await Q(),J=G.next()}this.isRunning=!1}}class T{constructor(G,J,K=0){this.id=G,this.callback=J,this.debounce=K}id;callback;debounce}class ${asyncCallback;constructor(G,J,K="fifo",Q=void 0){if(this.asyncCallback=J,G)switch(K){case"fifo":this[K](!0);break;case"unique":this[K](Q,!0);break}}fifo=(G=!1)=>{A.assign(new j(async()=>{await this.asyncCallback(G)},X.debounce))};unique=(G,J=!1)=>{q.assign(new T(G,async()=>{await this.asyncCallback(J)},X.debounce))}}class R{effect;first=!0;constructor(G){this.effect=G,new $(!0,async()=>{X.subscriber=G,await G(this.first),this.first=!1,X.subscriber=null})}}class W{static __;static chachedTemplate={};constructor({callerAttribute:G,targetAttribute:J,targetPathRule:K=(Q)=>Q}){if(W.__ instanceof W){X.warningSingleton(W);return}W.__=this,W.targetAttribute=J,W.targetPathRule=K,W.callerAttribute=G,new z({attributeName:G,bypassNested:!0,onConnected:async({element:Q})=>{await this.renderElement({element:Q})}})}static callerAttribute;static targetAttribute;static targetPathRule;swap=(G)=>{this.renderElement(G)};static replace=(G,J,K="inner")=>{switch(K){case"outer":let Q=J[0].cloneNode(!0);G.replaceWith(Q);break;case"inner":default:G.innerHTML=J[1];break}};renderElement=async({element:G,path:J,templateName:K,mode:Q="inner"})=>{if(!J||!K){let H=W.callerAttribute,M=G.getAttribute(H);if(!M){console.warn({element:G,callerAttribute:H,message:`attributeName "${H}" must have value to be used as templateSelector`});return}[J,K,Q="inner"]=X.splitX(M,X.separator)}let Y=W.targetAttribute,Z=W.targetPathRule(J),B=await W.fromCache(Y,Z,K);W.replace(G,B,Q)};static fromCache=async(G,J,K)=>{let Q=W.chachedTemplate[J]?.[K];if(Q)return Q;let Y=await X.getDocument(J),Z=Y.querySelectorAll("script");for(let E=0;E<Z.length;E++)Z[E].remove();W.chachedTemplate[J]={};let B=Y.body;W.chachedTemplate[J].body=[B,B.innerHTML];let H=Y.head;W.chachedTemplate[J].head=[H,H.innerHTML];let M=Y.querySelectorAll(`[${G}]`),I;for(let E=0;E<M.length;E++){let _=M[E],V=_.getAttribute(G);if(!(_ instanceof HTMLElement))continue;if(W.chachedTemplate[J][V]=[_,_.innerHTML],V===K)I=_}if(K!=="head"&&K!=="body"&&!I){console.error(`couldn't find '[${G}="${K}"]' in the ${J}`);return}return W.chachedTemplate[J]?.[K]}}class x{static domReflector=(G,J,K,Q)=>{let Y=X.splitX(K.getAttribute(J)??"",X.separator);for(let Z=0;Z<Y.length;Z++){let B=Y[Z];try{if(!(B in K))throw"";if(K[B]=G,B==="value"&&"value"in K&&K.parentNode&&K instanceof HTMLInputElement&&!K.hasAttribute(X.val))K.setAttribute(X.val,""),K.oninput=()=>{Q.value=K.value}}catch(H){if(G=JSON.stringify(G).replace(/^"(.*)"$/,"$1"),B==""){console.warn({element:K,attributeName:J,message:"doesn't have target"});return}K.setAttribute(B,G)}}};static dataOnly=(G)=>new x(G);removeAll$=()=>{this.subscription=[]};remove$=(G)=>{this.subscription=this.subscription.filter((J)=>G.effect!==J)};unRef=()=>{this.removeAll$(),this.value_=null,this.attr=null};subscription=[];value_;call$=()=>{new $(!0,async()=>{await X.handlePromiseAll(this,this.subscription,!1)})};constructor(G,J=void 0,K={}){if(this.value_=G,J){this.attr=J;let{bypassNested:Q=!0,documentScope:Y=void 0}=K;new z({documentScope:Y,attributeName:J,bypassNested:Q,onConnected:async({element:Z,onDisconnected:B})=>{let H=new R(async()=>{x.domReflector(this.value,J,Z,this)});Z[X.removeDOM$]=async()=>{if(this.remove$(H),typeof Z.oninput==="function")Z.oninput=null},B(Z[X.removeDOM$])}})}}attr=void 0;get value(){if(X.subscriber&&!this.subscription.some((G)=>G===X.subscriber))this.subscription.push(X.subscriber);return this.value_}set value(G){if(this.value_===G)return;this.value_=G,this.call$()}}class U{constructor({element:G,onExitViewCallback:J,onViewCallback:K,lifecyclesOnDisconnected:Q}){this.element=G,U.observer.observe(G),G[X.onViewCBIdentifier]=K,G[X.onExitViewCBIdentifier]=J;for(let Y=0;Y<Q.length;Y++)Q[Y](async()=>{if(U.removeOnViewCallback(G),G[X.onExitViewCBIdentifier])await G[X.onExitViewCBIdentifier](U.onViewCallbacksOptions(G));U.removeOnExitViewCallback(G),U.unobserve(G)})}element;disconnect=async()=>{let G=this.element;if(U.removeOnViewCallback(G),G[X.onExitViewCBIdentifier])await G[X.onExitViewCBIdentifier](U.onViewCallbacksOptions(G));U.removeOnExitViewCallback(G),U.unobserve(G)};static observer=new IntersectionObserver((G)=>{new $(!0,async()=>{for(let J=0;J<G.length;J++)await this.handleEntry(G[J])})},{threshold:[0,0]});static takeRecords=()=>this.observer.takeRecords();static disconnect=()=>this.observer.disconnect();static get root(){return this.observer.root}static get rootMargin(){return this.observer.rootMargin}static unobserve=(G)=>this.observer.unobserve(G);static removeOnViewCallback=(G)=>{if(X.onViewCBIdentifier in G)delete G[X.onViewCBIdentifier]};static removeOnExitViewCallback=(G)=>{if(X.onExitViewCBIdentifier in G)delete G[X.onExitViewCBIdentifier]};static onViewCallbacksOptions=(G)=>{return{removeOnViewCallback:()=>U.removeOnViewCallback(G),removeOnExitViewCallback:()=>U.removeOnExitViewCallback(G),unobserveElement:()=>U.unobserve(G)}};handlers=(G)=>{return U.onViewCallbacksOptions(G)};static registeredOnExit=new Map;static handleEntry=async(G)=>{let J=G.target;if(G.isIntersecting&&X.onViewCBIdentifier in J)await J[X.onViewCBIdentifier](U.onViewCallbacksOptions(J)),this.registeredOnExit.set(J,!0);if(!G.isIntersecting&&X.onExitViewCBIdentifier in J&&this.registeredOnExit.has(J))await J[X.onExitViewCBIdentifier](U.onViewCallbacksOptions(J)),this.registeredOnExit.delete(J)}}class z{attr;static registeredDocumentScope=[];static createMutationObserver=(G)=>{let J=z.registeredDocumentScope.filter((Z)=>{return Z[2]===G})[0];if(J)return J;let K=x.dataOnly(""),Q=new MutationObserver((Z)=>{K.value=Z});Q.observe(G,{childList:!0,subtree:!0,attributes:!0});let Y=[Q,K,G];return z.registeredDocumentScope.push(Y),Y};static shallowScope=async({documentScope:G,scopedCallback:J})=>{let K=X.currentDocumentScope;X.currentDocumentScope=G,await J(),X.currentDocumentScope=K};static scopedPing=({documentScope:G,scopedCallback:J,runCheckAtFirst:K})=>new $(K,async()=>{let Q=X.currentDocumentScope;X.currentDocumentScope=G,await J(),X.currentDocumentScope=Q}).fifo;static onParentDCWrapper=async(G,J)=>{let K=(Y)=>{z.setDCCB(G,Y)},Q=z.currentOnParentDCCB;z.currentOnParentDCCB=K,await J(),z.currentOnParentDCCB=Q};static currentOnParentDCCB=void 0;static ID=new Map;currentDocumentScope;disconnect=()=>{if(this.effect)this.mutationSignal.remove$(this.effect);let G=this.currentDocumentScope;if(G!==document)this.mutationObserver.disconnect(),z.ID.delete(G)};takeRecords;mutationSignal;mutationObserver;effect;onConnected;assignBypass=()=>{let G=this.attr,J=this.currentDocumentScope,K=z.bypassNest.get(J);if(!K)z.bypassNest.set(J,[G]);else K.push(G)};static bypassNest=new Map;constructor({onConnected:G,attributeName:J=X.attributeIndexGenerator(),documentScope:K=X.currentDocumentScope,bypassNested:Q=!1}){if(this.attr=J,this.onConnected=G,this.currentDocumentScope=K,Q)this.assignBypass();let[Y,Z]=z.createMutationObserver(K);this.mutationObserver=Y,this.mutationSignal=Z,this.takeRecords=Y.takeRecords;let B=this.isScopeMapped(),H=z.currentOnParentDCCB;if(H)H(async()=>{this.disconnect()});switch(B){case"newScope":this.effect=new R(async(M)=>{let I=Z.value;if(M){await this.initiator();return}await this.mutationHandler(I)});break;case"addToScope":z.scopedPing({documentScope:K,runCheckAtFirst:!0,scopedCallback:async()=>{await this.initiator()}});break;default:console.error({documentScope:K,message:`'${B}' already registered in this 'documentScope'`,registeredAttributes:Object.keys(z.ID.get(K))});break}}isScopeMapped=()=>{let G=this.currentDocumentScope;if(!z.ID.has(G))return z.ID.set(G,{[this.attr]:this.onConnected}),"newScope";if(this.attr in z.ID.get(G))return this.attr;return z.ID.get(G)[this.attr]=this.onConnected,"addToScope"};initiator=async()=>{await this.checkNestedAddedNodes(this.currentDocumentScope,this.attr)};checkValidScoping=(G,J)=>{let K=G;if(!(G instanceof HTMLElement))return!1;let Q=this.currentDocumentScope,Y=!1,Z=z.bypassNest.get(Q);if(Z){if(Z.includes(J))return G.setAttribute(X.docScopeElement,""),!0}while(G){if("hasAttribute"in G&&!G.hasAttribute(X.docScopeElement)){if(!Y&&K===G)Y=!0,K.setAttribute(X.docScopeElement,"");G=G.parentElement;continue}if(G===Q)return!0;return!1}return!0};static addedNodeScoper=(G,J)=>{z.scopedPing({documentScope:G,runCheckAtFirst:!0,scopedCallback:async()=>{z.onParentDCWrapper(G,J)}})};static registeredLCCB=new Map;addedNodeHandler=async(G,J)=>{if(!(G instanceof HTMLElement))return;if(!("hasAttribute"in G)||!G.hasAttribute(J)||!this.checkValidScoping(G,J))return;if(z.registeredLCCB.has(G))return;z.registeredLCCB.set(G,!0);let K=z.ID.get(this.currentDocumentScope)[J];z.addedNodeScoper(G,async()=>{if(G.parentElement)K({get isConnected(){return G.isConnected},swap:(Q)=>{if(!(W instanceof W))return;W.__.swap({element:G,...Q})},onViewPort:(Q)=>new U({element:G,...Q}),element:G,html:(Q,...Y)=>{G.innerHTML=X.literal(Q,...Y)},lifecycleObserver:this,onDisconnected:(Q)=>{z.setDCCB(G,async()=>{z.addedNodeScoper(G,async()=>{await Q(),z.registeredLCCB.delete(G)})})},onAttributeChanged:(Q)=>{z.setACCB(G,async(Y)=>{z.addedNodeScoper(G,async()=>{await Q(Y)})})}})})};static setDCCB=(G,J)=>{if(!(X.DCCBIdentifier in G))G[X.DCCBIdentifier]=[];G[X.DCCBIdentifier].push(J)};static getDCCB=(G)=>{if(!(X.DCCBIdentifier in G))return;return G[X.DCCBIdentifier]};static setACCB=(G,J)=>{G[X.ACCBIdentifier]=J};static getACCB=(G)=>{if(!(X.ACCBIdentifier in G))return;return G[X.ACCBIdentifier]};callACCB=async(G,J)=>{let K=z.getACCB(G);if(!K)return;await K({attributeName:J,newValue:G.getAttribute(J)??""})};checkNestedAddedNodes=async(G,J)=>{let K=X.validAttributeNameSelector(J);if("querySelectorAll"in G){let Q=G.querySelectorAll(`[${K}]`);for(let Y=0;Y<Q.length;Y++)await this.addedNodeHandler(Q[Y],J)}};mutationHandler=async(G)=>{let J=z.ID.get(this.currentDocumentScope);for(let K=0;K<G.length;K++){let Q=G[K];if(Q.addedNodes)for(let Z=0;Z<Q.addedNodes.length;Z++){let B=Q.addedNodes[Z];for(let H in J)await this.addedNodeHandler(B,H),await this.checkNestedAddedNodes(B,H)}if(Q.removedNodes)for(let Z=0;Z<Q.removedNodes.length;Z++){let B=Q.removedNodes[Z];if(!(B instanceof HTMLElement))continue;await this.mutationDCHandler(B)}if(Q.type!=="attributes")continue;let Y=Q.target;if(Y instanceof HTMLElement&&Q.attributeName)this.callACCB(Y,Q.attributeName)}};removeParentOfNestedLCDCCB=(G)=>{if(z.ID.has(G))G[X.DCCBIdentifier].push(async()=>{z.ID.delete(G)})};mutationDCHandler=async(G)=>{let J=z.findDeepNested(G),K=[];for(let Q=0;Q<J.length;Q++){let Y=J[Q];if(!(Y instanceof HTMLElement))continue;this.removeParentOfNestedLCDCCB(Y);let Z=z.getDCCB(Y);if(Z)K.push(...Z)}await X.handlePromiseAll(this,K)};static findDeepNested=(G,J=[])=>{if(z.getDCCB(G))J.push(G);for(let K=0;K<G.children.length;K++)z.findDeepNested(G.children[K],J);return J}}class F extends x{static dataOnly=(G)=>new F(G);constructor(G,J=void 0,K){super("",J,K);new R(async()=>{super.value=await G()})}get value(){return super.value}set value(G){console.warn("you are not allowed to change Derived value manually")}}class O{static __;constructor(){if(O.__ instanceof O)return;O.__=this,this.setBase(),this.mRefLifecycle()}cacheDate=`?t=${Date.now()}`;chacedRef=new Map;cachedLet=new Map;setBase=()=>{new z({attributeName:"property",documentScope:document,onConnected:async({element:J,onAttributeChanged:K})=>{let Q=async()=>{let Y=J.getAttribute("property");if(!(J instanceof HTMLMetaElement))return;if(Y!=="vorth")return;let Z=J.getAttribute("content");if(!Z)return;this.base=Z};K(async({attributeName:Y})=>{if(Y!=="content")return;await Q()}),await Q()}})};importVorth=async(G)=>{let J=this.chacedRef.get(G);if(J)return J;let K=`${this.base}${G}.mjs`;try{let Q=(await import(`${K}${this.cacheDate}`)).default;return this.chacedRef.set(G,Q),Q}catch(Q){return console.error({path:K,code:404,error:"not found",message:"importVorth pointing to invalid endpoint"}),!1}};base="";storagePath=(G)=>`vorth-s-${G}`;signalRef=async(G)=>{let J=this.storagePath(G),K=this.cachedLet.get(G);if(K instanceof F)return K[0];if(K){switch(K[1]??!1){case"local":K[0].value=localStorage.getItem(J);break;case"session":K[0].value=sessionStorage.getItem(J);break}return K[0]}let Q=`${this.base}${G}.mjs`;try{let Y=await import(`${Q}${this.cacheDate}`),Z=Y.mode,B=Y.default;if(typeof Y==="function")this.cachedLet.set(G,[new F(B),Z]);else{let H=new x(B);this.cachedLet.set(G,[new x(B),Z]),new R(async()=>{let M=H.value;switch(Z){case"local":localStorage.setItem(J,M);break;case"session":sessionStorage.setItem(J,M);break}})}return B}catch(Y){return console.error({path:Q,code:404,error:"not found",message:"signalRef pointing to invalid endpoint"}),!1}};mRefLifecycle=()=>{new z({attributeName:"vorth",bypassNested:!0,documentScope:document,onConnected:async({element:J,html:K,isConnected:Q,onAttributeChanged:Y,onDisconnected:Z,onViewPort:B})=>{let H=J.getAttribute("vorth");if(!H)return;let M=await this.importVorth(H);if(!M)return;await M({element:J,html:K,isConnected:Q,onAttributeChanged:Y,onDisconnected:Z,onViewPort:B,$:(I)=>new R(I),signalRef:this.signalRef})}})}}new O;