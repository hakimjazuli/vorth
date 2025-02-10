class K{static webComponentGlobalStyles=[];static literal=(z,...J)=>{let X=[];for(let Y=0;Y<z.length;Y++)if(X.push(z[Y]),Y<J.length)X.push(J[Y]);return X.join("")};static debounce=0;static removeDOM$="virst-rm-dom$";static val="virst-a-val";static classes="virst-a-class";static toValidClassNames=(z)=>z.replace(/[^a-zA-Z0-9]+/g," ").trim().split(" ");static qRouteChange="virst-qrc";static docScopeElement="virst-sc";static storageIdentifier="virst-st";static DCCBIdentifier="virst-dc";static ACCBIdentifier="virst-ac";static onViewCBIdentifier="virst-ov";static onExitViewCBIdentifier="virst-oxv";static templatePrefix="virst-template";static keptElement="virst-keep";static ForQPrefix="virst-fq-";static ForChildAttributePrefix="virst-fc-";static warningSingleton=(z)=>{console.warn({class:z,message:"is a singleton class, and can only be instantiated once"})};static uniqueID_=new Set;static get uniqueID(){let z=Math.floor(Math.random()*1000000000000000),J=`${Date.now()}${z}`;if(K.uniqueID_.has(J))return K.uniqueID;return K.uniqueID_.add(J),setTimeout(()=>{K.uniqueID_.delete(J)},100),J}static currentDocumentScope_=void 0;static get currentDocumentScope(){if(K.currentDocumentScope_===void 0)K.currentDocumentScope_=document;return K.currentDocumentScope_}static set currentDocumentScope(z){K.currentDocumentScope_=z}static attrPrefix="virst-ap-";static attributeIndexGenerator=(z=!1)=>{if(K.currentDocumentScope==document&&!z)return null;return`${K.attrPrefix}${K.uniqueID}`};static timeout=(z)=>new Promise((J)=>setTimeout(J,z));static splitX=(z,J)=>{let X=[],Y="",Z=!1;for(let H=0;H<z.length;H++){let G=z[H];if(Z)Y+=G,Z=!1;else if(G==="\\")Z=!0;else if(G===J)X.push(Y),Y="";else Y+=G}return X.push(Y),X};static separator=";";static isAsync=(z)=>z.constructor.name==="AsyncFunction";static validAttributeNameSelector=(z)=>z.toLowerCase().replace(/:/g,"\\:");static handlePromiseAll=async(z,J,...X)=>{if(!J)return;await Promise.all(J.map(async(Y)=>{try{await Y(...X)}catch(Z){console.error({callback:Y,source:z,message:"Error in callback",error:Z})}})).catch((Y)=>{console.error({asyncArrayFunctions:J,source:z,message:"Promise.all failed:",error:Y})})}}var _=window.virst=window.virst??{};class L{static assign_=(z)=>{if(this.push(z),!L.isRunning)this.run()};static{_.QFIFO=_.QFIFO??L.assign_}constructor(){}static queue=[];static isRunning=!1;static assign=_.QFIFO;static push=(z)=>{this.queue.push(z.details)};static run=async()=>{L.isRunning=!0;while(this.queue.length!==0){let[z,J]=this.queue[0];if(this.queue.shift(),J)await K.timeout(J);await z()}L.isRunning=!1}}class b{details;constructor(z,J=0){this.details=[z,J]}}class V{static assign_=(z)=>{if(this.push(z),!this.isRunning)this.run()};static{_.QUnique=_.QUnique??V.assign_}static queue=new Map;static isRunning=!1;static assign=_.QUnique;static push=(z)=>{let{callback:J,debounce:X,id:Y}=z;this.queue.set(Y,[J,X?X:0])};static run=async()=>{this.isRunning=!0;let z=this.queue.keys(),J=z.next();while(!J.done){let X=J.value,[Y,Z]=this.queue.get(X);this.queue.delete(X),await K.timeout(Z),await Y(),J=z.next()}this.isRunning=!1}}class h{constructor(z,J,X=0){this.id=z,this.callback=J,this.debounce=X}id;callback;debounce}class ${asyncCallback;constructor(z,J,X={fifo:!0}){if(this.asyncCallback=J,z){if("fifo"in X)this.fifo(!0);if("unique"in X)this.unique(X.unique,!0)}}fifo=(z=!1)=>{L.assign(new b(async()=>{await this.asyncCallback(z)},K.debounce))};static get isRunning(){return L.isRunning}unique=(z,J=!1)=>{V.assign(new h(z,async()=>{await this.asyncCallback(J)},K.debounce))}}class T{static domReflector=(z,J,X,Y)=>{let Z=K.splitX(X.getAttribute(J)??"",K.separator);for(let H=0;H<Z.length;H++){let G=Z[H];try{if(!(G in X))throw"";if(X[G]=z,X.parentElement&&G==="value"&&"value"in X&&"oninput"in X&&!X.hasAttribute(K.val))X.setAttribute(K.val,""),X.oninput=()=>{new $(!0,async()=>{Y.value=X.value})}}catch(Q){if(X.parentElement&&G==="class"){if(!X.hasAttribute(K.classes)){X.setAttribute(K.classes,"");let W=Y.value;new I(async(B)=>{let R=Y.value;if(JSON.stringify(R)===JSON.stringify(W)&&!B)return;try{let M=K.toValidClassNames(R.class),E=K.toValidClassNames(W.class),F=Math.max(M.length,E.length);for(let O=0;O<F;O++){let S=E[O];if(S)X.classList.remove(S);let k=M[O];if(k)X.classList.add(k)}}catch(M){console.warn({signal:this,value:R,error:M,cause:"signal value incorrectly formatted",validFormat:{class:"string of classNames separated by spaces"}})}W=R})}continue}if(z=JSON.stringify(z).replace(/^"(.*)"$/,"$1"),G==""){console.warn({element:X,attributeName:J,message:"doesn't have target"});return}X.setAttribute(G,z)}}};static dataOnly=(z)=>new T(z);removeAll$=()=>{I.effects.forEach((z)=>{if(z.has(this))z.delete(this)}),this.subscriptions.clear()};remove$=(z)=>{if(I.effects.has(z.effect))I.effects.get(z.effect).delete(this);this.subscriptions.delete(z.effect)};unRef=()=>{this.removeAll$(),this.value_=null,this.attr=null};value_;get subscriptions(){return I.signals.get(this)}call$=()=>{new $(!0,async()=>{if(!this.subscriptions)return;K.handlePromiseAll(this,Array.from(this.subscriptions),!1)})};constructor(z,J=void 0,X={}){if(this.value_=z,J){this.attr=J;let{documentScope:Y=void 0}=X;x.scopedPing({documentScope:Y,runCheckAtFirst:!0,scopedCallback:async()=>{new x({documentScope:Y,attr:J,onConnected:async({element:Z,onDisconnected:H})=>{let G=new I(async()=>{T.domReflector(this.value,J,Z,this)});Z[K.removeDOM$]=async()=>{if(this.remove$(G),typeof Z.oninput==="function")Z.oninput=null},H(Z[K.removeDOM$])}})}})}}attr=void 0;get value(){if(I.isRegistering)I.letInstances.add(this);return this.value_}set value(z){if(this.value_===z)return;this.value_=z,this.call$()}}class I{static effects=new Map;static signals=new Map;static letInstances=new Set;static isRegistering=!1;remove$=()=>{if(!I.effects.has(this.effect)&&!I.effects.get(this.effect))return;I.effects.get(this.effect).forEach((z)=>{I.signals.delete(z)}),I.effects.delete(this.effect)};effect;constructor(z){this.effect=z,new $(!0,async()=>{I.isRegistering=!0,await z(!0),I.isRegistering=!1;let J=I.letInstances;I.effects.set(z,new Set(J)),J.forEach((X)=>{if(!I.signals.has(X))I.signals.set(X,new Set([z]));else I.signals.get(X).add(z)}),I.letInstances.clear()})}}class q{static __;static chachedTemplate={};constructor({callerAttribute:z,targetAttribute:J,targetPathRule:X=(Y)=>Y}){if(q.__ instanceof q){K.warningSingleton(q);return}q.__=this,q.targetAttribute=J,q.targetPathRule=X,q.callerAttribute=z,new x({attr:z,onConnected:async({element:Y})=>{await this.renderElement({element:Y})}})}static callerAttribute;static targetAttribute;static targetPathRule;swap=(z)=>{this.renderElement(z)};static replace=(z,J,X="inner")=>{switch(X){case"outer":let Y=J[0].cloneNode(!0);z.replaceWith(Y);break;case"inner":default:z.innerHTML=J[1];break}};renderElement=async({element:z,path:J,templateName:X,mode:Y="inner"})=>{if(!J||!X){let Q=q.callerAttribute,W=z.getAttribute(Q);if(!W){console.warn({element:z,callerAttribute:Q,message:`attributeName "${Q}" must have value to be used as templateSelector`});return}[J,X,Y="inner"]=K.splitX(W,K.separator)}let Z=q.targetAttribute,H=q.targetPathRule(J),G=await q.fromCache(Z,H,X);q.replace(z,G,Y)};static getDocument=async(z)=>{if(z in this.cachedDocument)return this.cachedDocument[z];let J;try{if(J=await fetch(z),!J.ok)J=await fetch(`${z}.html`);if(!J.ok)throw Error(`Error fetching: status="${J.status}"`);let X=await J.text(),Y=new DOMParser;return this.cachedDocument[z]=Y.parseFromString(X,"text/html")}catch(X){console.error({error:X,response:J})}};static cachedDocument={};static fromCache=async(z,J,X)=>{let Y=q.chachedTemplate[J]?.[X];if(Y)return Y;let Z=await this.getDocument(J),H=Z.querySelectorAll("script");for(let R=0;R<H.length;R++)H[R].remove();q.chachedTemplate[J]={};let G=Z.body;q.chachedTemplate[J].body=[G,G.innerHTML];let Q=Z.head;q.chachedTemplate[J].head=[Q,Q.innerHTML];let W=Z.querySelectorAll(`[${z}]`),B;for(let R=0;R<W.length;R++){let M=W[R],E=M.getAttribute(z);if(!(M instanceof HTMLElement))continue;if(q.chachedTemplate[J][E]=[M,M.innerHTML],E===X)B=M}if(X!=="head"&&X!=="body"&&!B){console.error(`couldn't find '[${z}="${X}"]' in the ${J}`);return}return q.chachedTemplate[J]?.[X]}}class A{constructor({element:z,onExitViewCallback:J,onViewCallback:X,lifecyclesOnDisconnected:Y}){this.element=z,A.observer.observe(z),z[K.onViewCBIdentifier]=X,z[K.onExitViewCBIdentifier]=J;for(let Z=0;Z<Y.length;Z++)Y[Z](async()=>{if(A.removeOnViewCallback(z),z[K.onExitViewCBIdentifier])await z[K.onExitViewCBIdentifier](A.onViewCallbacksOptions(z));A.removeOnExitViewCallback(z),A.unobserve(z)})}element;disconnect=async()=>{let z=this.element;if(A.removeOnViewCallback(z),z[K.onExitViewCBIdentifier])await z[K.onExitViewCBIdentifier](A.onViewCallbacksOptions(z));A.removeOnExitViewCallback(z),A.unobserve(z)};static loadCount_=10;static get loadCount(){return this.loadCount_}static set loadCount(z){if(typeof z==="number"&&z>0)this.loadCount_=z;else console.warn("loadCount must be a positive number. Using the absolute value instead;"),this.loadCount_=Math.abs(z)}static observer=new IntersectionObserver((z)=>{let J=this.loadCount,X=[];for(let Y=0;Y<z.length;Y++){if(X.push(async()=>{await this.handleEntry(z[Y])}),(Y+1)%J!==0)continue;K.handlePromiseAll(this,X),X.length=0}if(X.length>0)K.handlePromiseAll(this,X)},{threshold:[0,0]});static takeRecords=()=>this.observer.takeRecords();static disconnect=()=>this.observer.disconnect();static get root(){return this.observer.root}static get rootMargin(){return this.observer.rootMargin}static unobserve=(z)=>this.observer.unobserve(z);static removeOnViewCallback=(z)=>{if(K.onViewCBIdentifier in z)delete z[K.onViewCBIdentifier]};static removeOnExitViewCallback=(z)=>{if(K.onExitViewCBIdentifier in z)delete z[K.onExitViewCBIdentifier]};static onViewCallbacksOptions=(z)=>{return{removeOnViewCallback:()=>A.removeOnViewCallback(z),removeOnExitViewCallback:()=>A.removeOnExitViewCallback(z),unobserveElement:()=>A.unobserve(z)}};static registeredOnExit=new Map;static handleEntry=async(z)=>{let J=z.target;if(z.isIntersecting&&K.onViewCBIdentifier in J)await J[K.onViewCBIdentifier](A.onViewCallbacksOptions(J)),this.registeredOnExit.set(J,!0);if(!z.isIntersecting&&K.onExitViewCBIdentifier in J&&this.registeredOnExit.has(J))await J[K.onExitViewCBIdentifier](A.onViewCallbacksOptions(J)),this.registeredOnExit.delete(J)}}class x{constructor({onConnected:z,attr:J=K.attributeIndexGenerator(),documentScope:X=K.currentDocumentScope}){new $(!0,async()=>{this.attr=J,this.onConnected=z,this.currentDocumentScope=X;let{mutationObserver:Y,mutationRecordSignal:Z}=x.createObserver(X,J);this.mutationObserver=Y,this.mutationSignal=Z,this.takeRecords=Y.takeRecords;let H=this.isScopeMapped(),G=x.currentOnParentDCCB;if(G)G(async()=>{this.disconnect()});switch(H){case"newScope":this.effect=new I(async(Q)=>{let W=Z.value;if(Q){await this.initiator();return}new $(!0,async()=>{await this.mutationHandler(W)},{unique:W})});break;case"addToScope":await this.initiator();break;default:console.error({documentScope:X,message:`'${H}' already registered in this 'documentScope'`,registeredAttributes:Object.keys(x.ID.get(X))});break}})}isScopeMapped=()=>{let z=this.currentDocumentScope;if(!x.ID.has(z))return x.ID.set(z,new Map().set(this.attr,this.onConnected)),"newScope";if(this.attr in x.ID.get(z))return this.attr;return x.ID.get(z).set(this.attr,this.onConnected),"addToScope"};initiator=async()=>{await this.addedNodeHandler(this.currentDocumentScope,this.attr,!0)};attr;static registeredDocumentScope=new Map;static createObserver=(z,J)=>{if(x.registeredDocumentScope.has(z)){let H=x.registeredDocumentScope.get(z);if(!H.attr.has(J))H.attr.add(J);return H}let X=T.dataOnly(""),Y=new MutationObserver((H)=>{X.value=H});Y.observe(z,{childList:!0,subtree:!0,attributes:!0});let Z={mutationObserver:Y,mutationRecordSignal:X,attr:new Set([J])};return x.registeredDocumentScope.set(z,Z),Z};static shallowScope=async({documentScope:z,scopedCallback:J})=>{let X=K.currentDocumentScope;K.currentDocumentScope=z,await J(),K.currentDocumentScope=X};static scopedPing=({documentScope:z,scopedCallback:J,runCheckAtFirst:X})=>new $(X,async()=>{let Y=K.currentDocumentScope;K.currentDocumentScope=z,await J(),K.currentDocumentScope=Y}).fifo;static currentOnParentDCCB=void 0;static ID=new Map;currentDocumentScope;disconnect=()=>{if(this.effect)this.mutationSignal.remove$(this.effect);let z=this.currentDocumentScope;if(z!==document)this.mutationObserver.disconnect(),x.ID.delete(z)};takeRecords;mutationSignal;mutationObserver;effect;onConnected;static addedNodeScoper=(z,J,X,Y)=>{x.scopedPing({documentScope:J,runCheckAtFirst:!0,scopedCallback:async()=>{let Z=(G)=>{x.setDCCB(z,J,X,G)},H=x.currentOnParentDCCB;x.currentOnParentDCCB=Z,await Y(),x.currentOnParentDCCB=H}})};checkValidScoping=(z,J,X)=>{if(J!==X&&J!==document){let Y=x.registeredDocumentScope.get(J);if(Y&&Y.attr.has(z))return!1;if(J.parentElement)return this.checkValidScoping(z,J.parentElement,X)}if(!x.registeredDocumentScope.has(X))return!1;if(!x.registeredDocumentScope.get(X).attr.has(z))return!1;return!0};addedNodeHandler=async(z,J,X)=>{if(X&&"querySelectorAll"in z){let G=K.validAttributeNameSelector(J),Q=z.querySelectorAll(`[${G}]`);for(let W=0;W<Q.length;W++)await this.addedNodeHandler(Q[W],J,!1)}let Y=this.currentDocumentScope;if(!(z instanceof HTMLElement)||!("hasAttribute"in z)||!z.hasAttribute(J)||!this.checkValidScoping(J,z,Y))return;let Z=x.getDCCB(z);if(Z&&Z.has(J)){let G=[],Q=[];Z.get(J).forEach((W,B)=>{if(B===Y)return;console.warn({warning:"you have `element` with `outOfScope` `attributeName`, the `currentDocumentScope` has the same `attributeName`",attributeName:J,outOfScope:B,currentDocumentScope:Y,LifecycleInstance:this}),G.push(...Array.from(W)),Q.push(B)}),await K.handlePromiseAll(this.addedNodeHandler,G);for(let W=0;W<Q.length;W++)Z.get(J).delete(Q[W])}let H=x.ID.get(Y);if(!H||!H.has(J))return;x.addedNodeScoper(Y,z,J,async()=>{if(z.parentElement)H.get(J)({get isConnected(){return z.isConnected},swap:(G)=>{if(!(q instanceof q))return;q.__.swap({element:z,...G})},onViewPort:(G)=>new A({element:z,...G}),element:z,html:(G,...Q)=>{let W=K.literal(G,...Q);return{inner:()=>{z.innerHTML=W},string:W}},lifecycleObserver:this,onDisconnected:async(G)=>{x.setDCCB(Y,z,J,async()=>{x.addedNodeScoper(Y,z,J,async()=>{await G()})})},onAttributeChanged:(G)=>{x.setACCB(z,J,async(Q)=>{x.addedNodeScoper(Y,z,J,async()=>{await G(Q)})})}})})};static setDCCB=async(z,J,X,Y)=>{let Z=x.getDCCB(J);if(!Z)Z=J[K.DCCBIdentifier]=new Map;if(!Z.has(X))Z.set(X,new Map);let H=Z.get(X);if(!H.has(z))H.set(z,new Set);H.get(z).add(Y)};static getDCCB=(z)=>{if(!(K.DCCBIdentifier in z))return;return z[K.DCCBIdentifier]};static setACCB=(z,J,X)=>{let Y=x.getACCB(z);if(!Y)Y=z[K.ACCBIdentifier]=new Map;if(!Y.has(J))Y.set(J,new Set);Y.get(J).add(X)};static getACCB=(z)=>{if(!(K.ACCBIdentifier in z))return;return z[K.ACCBIdentifier]};callACCB=(z,J)=>{let X=x.getACCB(z);if(!X)return;new $(!0,async()=>{let Y=[];X.forEach(async(Z)=>{Z.forEach((H)=>{Y.push(async()=>{await H({attr:J,newValue:z.getAttribute(J)??""})})})}),await K.handlePromiseAll(this,Y)},{unique:z})};mutationHandler=async(z)=>{let J=x.ID.get(this.currentDocumentScope);for(let X=0;X<z.length;X++){let Y=z[X];if(Y.addedNodes)for(let H=0;H<Y.addedNodes.length;H++){let G=Y.addedNodes[H];if(J)J.forEach(async(Q,W)=>{await this.addedNodeHandler(G,W,!0)})}if(Y.removedNodes)for(let H=0;H<Y.removedNodes.length;H++){let G=Y.removedNodes[H];if(!(G instanceof HTMLElement))continue;await this.mutationDCHandler(G)}if(Y.type!=="attributes")continue;let Z=Y.target;if(Z instanceof HTMLElement&&Y.attributeName)this.callACCB(Z,Y.attributeName)}};removeParentOfNestedLCDCCB=(z)=>{if(x.ID.has(z))z[K.DCCBIdentifier].set("",[async()=>{x.ID.delete(z)}])};mutationDCHandler=async(z)=>{let J=x.findDeepNested(z);new $(!0,async()=>{let X=[];for(let Y=0;Y<J.length;Y++){let Z=J[Y];if(!(Z instanceof HTMLElement))continue;this.removeParentOfNestedLCDCCB(Z);let H=x.getDCCB(Z);if(H)H.forEach((G)=>{G.forEach((Q)=>{X.push(...Array.from(Q))})})}await K.handlePromiseAll(this,X)},{unique:z})};static findDeepNested=(z,J=[])=>{if(x.getDCCB(z))J.push(z);for(let X=0;X<z.children.length;X++)x.findDeepNested(z.children[X],J);return J}}var P=_.uniqueVirstQueue=_.uniqueVirstQueue??new Map;class w{static fifo_=Promise.resolve();static fifo=async()=>{let z,J=new Promise((Y)=>{z=Y}),X=this.fifo_;return this.fifo_=J,await X,{resume:()=>{z()}}};static unique=async(z)=>{if(!P.has(z)){P.set(z,Promise.resolve());let J,X=new Promise((Z)=>{J=Z}),Y=P.get(z);return P.set(z,X),await Y,{resume:()=>{J(),P.delete(z)}}}else return await P.get(z),await this.unique(z)}}class C extends T{static dataOnly=(z)=>new C(z);constructor(z,J=void 0,X){super("",J,X);new I(async()=>{super.value=await z()})}get value(){return super.value}set value(z){console.warn("you are not allowed to change Derived value manually")}}class N{constructor({workerPath:z,onMessage:J}){this.worker=new Worker(z),new $(!0,async()=>{this.worker.onmessage=(X)=>{J.success(X)},this.worker.onmessageerror=(X)=>{J.error(X)}})}worker;postMessage=(z,J)=>{this.worker.postMessage(z,J)}}var m=(z)=>`vorth='${z}'`;var y=async(z)=>{let{pathLibs:J,cacheDate:X,cacheDateName:Y}=U,Z=`${J}${z}.mjs`;try{let H=await import(`${Z}?${Y}=${X}`);if(!("lib"in H))throw Error("no_lib");return H.lib}catch(H){if(H.message==="no_data")console.error({endpoint:Z,error:H,message:"`importLib` point to a valid `endpoint`, but the `endpoint` have no named export as `lib`"});else console.error({endpoint:Z,404:"not found",message:"`importLib` pointing to invalid endpoint"});return}};var g=async(z,J=!0)=>{let{resume:X}=await w.unique(`importWorker-${z}`),{cachedWorker:Y,cacheDate:Z,pathWorkers:H,cacheDateName:G}=U;if(!J&&Y.has(z))return X(),Y.get(z);let Q=`${H}/${z}.mjs?${G}=${Z}`,W=new T({}),B=new N({onMessage:{error:(M)=>{new $(!0,async()=>{W.value=M},{unique:B})},success:(M)=>{new $(!0,async()=>{W.value=M},{unique:B})}},workerPath:Q}),R=[W,B.postMessage];if(J)Y.set(z,R);return X(),R};var f=async(z,J)=>{let{resume:X}=await w.unique(`importData-${z}`),{pathData:Y,cacheDate:Z,cacheDateName:H,cachedLet:G}=U,Q=U.storageKey,W=G.get(z);if(W instanceof T)return X(),W;let B=`${Y}${z}.mjs`;try{let R=await import(`${B}?${H}=${Z}`);if(!("data"in R))throw Error("no_data");let M=R.data;if(Array.isArray(M)){let F=Q(z),[O,S]=M,k=O;try{if(S==="localStorage"){let j=localStorage.getItem(F);if(j)k=JSON.parse(j)}else if(S==="sessionStorage"){let j=sessionStorage.getItem(F);if(j)k=JSON.parse(j)}}catch(j){throw Error("cannot parse json")}let D=new T(k);if(S==="localStorage")new I(async()=>{localStorage.setItem(F,JSON.stringify(D.value))});else if(S==="sessionStorage")new I(async()=>{sessionStorage.setItem(F,JSON.stringify(D.value))});return G.set(z,D),X(),D}if(G.has(z))return G.get(z);let E=new C(async()=>{return await M({qFIFO:w.fifo,qUnique:w.unique,importData:async(F)=>await f(F,J),importLib:async(F)=>{let O=await y(F);return(...S)=>O.call(J,...S)},importWorker:async(F)=>await g(F,!0)})});return G.set(z,E),X(),E}catch(R){if(R.message==="cannot parse json")console.error({endpoint:B,error:R,message:"unable to parse json"});else if(R.message==="no_data")console.error({endpoint:B,error:R,data:"no_data",message:"`importData` point to a valid endpoint, but badly formed, default export must have `data` property"});else console.error({endpoint:B,error:R,404:"`importData` point to a invalid endpoint"});X();return}};var c=(z,J=[])=>{let X=new I(z);return J.push(X),X},p=(z,{isGlobal:J=!1,on:X,waitForOnViewToRender:Y=!0},Z,H=!1)=>{return new x({attr:z,documentScope:J?document:Z,onConnected:async({element:G,onDisconnected:Q,onViewPort:W,onAttributeChanged:B,lifecycleObserver:R})=>{let M=async()=>{for(let E in X){let{listener:F,options:O={}}=X[E],{onAdd:S=!1}=O;if(E!==U.namespace){G.addEventListener(E,F,S);continue}let k=[],D=[];await F.call(G,{$:(j)=>c(j,k),let_:(j)=>U.let(j,G,D),derived:(j)=>U.derived(j,G,D),onAttributeChanged:B,onDisconnected:Q}),Q(async()=>{let j=Math.max(k.length,D.length);for(let v=0;v<j;v++){let d=D[v];if(d)d.unRef();let s=k[v];if(s)s.remove$()}if(H)R.disconnect()})}Q(async()=>{for(let E in X){if(E===U.namespace)continue;try{let{listener:F,options:O={}}=X[E],{onRemove:S=!1}=O;G.removeEventListener(E,F,S)}catch(F){}}})};if(!Y){M();return}W({lifecyclesOnDisconnected:[Q],onExitViewCallback:async()=>{},onViewCallback:M})}}),{attr:z}};class u{constructor(z,J){this.element=z,new $(!0,async()=>{J(async()=>{this.eventRemover.forEach((Y)=>{Y(),this.eventRemover.delete(Y)});let X=this.effects;for(let Y=0;Y<X.length;Y++)X[Y].remove$()})})}element;effects=[];eventRemover=new Set;on=(z)=>{new $(!0,async()=>{let J=this.element;for(let X in z){let{listener:Y,options:Z={}}=z[X],{onAdd:H=!1,onRemove:G=!1}=Z;J.addEventListener(X,Y,H),this.eventRemover.add(()=>{J.removeEventListener(X,Y,G)})}})}}class U{static namespace="vorth";static pre="pre";static versionMin=0;static properties_={batch:{value:A.loadCount},versionMin:{value:U.versionMin,onCompare:(z)=>{if(z<JSON.parse(U.cacheDate))return;setTimeout(()=>{U.cacheDate=JSON.stringify(Date.now()),location.reload()},1e4)}}};static assignProperties=()=>{let z=U.namespace;new x({attr:"property",documentScope:window.document,onConnected:async({element:J,onAttributeChanged:X})=>{let Y=async()=>{let Z=U.properties_;for(let H in Z){let G=`${z}-${H}`;if(!(J instanceof HTMLMetaElement)||!J.hasAttribute("property")||!J.hasAttribute("content")||J.getAttribute("property")!==G)continue;let Q=J.getAttribute("content")??"";if(!Q)continue;try{let W=Z[H];if(W.value=JSON.parse(Q),W.onCompare)W.onCompare(Q)}catch(W){console.error({error:W,value:Q,propertyName:G,message:"somethings wrong while parsing and assigning vorth argument;",elementString:J.outerHTML})}}};X(Y),Y()}})};static cacheDateName=`${U.namespace}_now`;static cacheDate_;static set cacheDate(z){U.cacheDate_=z;let J=U.cacheDateName;sessionStorage.setItem(J,z)}static get cacheDate(){if(U.cacheDate_)return U.cacheDate_;let z=U.cacheDateName,J=sessionStorage.getItem(z);if(J)return U.cacheDate_=J,J;return J=JSON.stringify(Date.now()),U.cacheDate=J,J}static cachedWorker=new Map;static cachedLet=new Map;static importLifecycle=async(z)=>{let J=`${U.pathLifecycles}${z}.mjs`;try{let X=await import(`${J}?${U.cacheDateName}=${U.cacheDate}`);if(!("lifecycle"in X))throw Error("no_lifecycle");return X.lifecycle}catch(X){if(X.message==="no_lifecycle")console.error({endpoint:J,message:'vorth="endpoint" point to a valid `endpoint`, but the `endpoint` have no named export as `lifecycle`',error:X});else console.error({endpoint:J,404:"not found",message:'vorth="module-path" pointing to invalid endpoint',error:X});return!1}};static base="/";static storageKey=(z)=>`vorth-data-${z}`;static importData=async(z,J)=>await f(z,J);static for=async({dataName:z,childLifescycle:J,element:X,waitForOnViewToRender:Y=!0,afterLoopCallback:Z=void 0,vorth:H=void 0})=>{let G=X.firstElementChi;if(ld.cloneNode(!0),!(G instanceof HTMLElement))return;X.innerHTML="",G.setAttribute(U.namespace,Y?`${J};${U.pre}`:J);let Q=await f(z,H);new I(async()=>{let W=Q.value,B=X.children,R=Math.max(B.length,W.length);for(let M=0;M<R;M++){let E=W[M],F=B[M];if(E){if(F instanceof HTMLElement&&U.looped.has(F)){U.looped.get(F).signal.value=E;continue}let O=G.cloneNode(!0);if(!(O instanceof HTMLElement))continue;U.looped.set(O,{name:z,index:M,signal:new T(E)}),X.append(O)}else if(F)F.remove()}if(!Z)return;new $(!0,Z)})};static looped=new Map;static of=(z,J,X)=>{let Y=U.looped.get(J);return X.push(Y.signal),{get value(){return Y.signal.value},set value(Z){Y.signal.value=Z,Y.signal.call$()},get index(){return Y.index}}};static $=(z,J)=>{let X=new I(z);return J.push(X),X};static derived=(z,J,X)=>{let Y=!1;if("dataOnly"in z)Y=new C(z.dataOnly);else{let{attr:Z,data:H}=z;Y=new C(H,Z,{documentScope:J}),new I(async()=>{let G=Y.value;if(!J.hasAttribute(Z))return;try{T.domReflector(G,Z,J,Y)}catch(Q){console.error(Q)}})}return X.push(Y),Y};static let=(z,J,X)=>{let Y=!1;if("dataOnly"in z)Y=new T(z.dataOnly);else{let{attr:Z,data:H}=z;Y=new T(H,Z,{documentScope:J}),new I(async()=>{let G=Y.value;if(!J.hasAttribute(Z))return;try{T.domReflector(G,Z,J,Y)}catch(Q){console.error(Q)}})}return X.push(Y),Y};static lsCaller=(z,J,X,Y,Z,H)=>{let G=[],Q=[];U.vorthLifecycle(z,J,X,Y,Z,H,Q,G),Z(async()=>{let W=Math.max(Q.length,G.length);for(let B=0;B<W;B++){let R=G[B];if(R)R.unRef();let M=Q[B];if(M)M.remove$()}if(U.looped.has(J))U.looped.delete(J)})};static assignLifecycle=()=>{let z=U.namespace;new x({attr:z,documentScope:window.document,onConnected:async({element:J,html:X,onAttributeChanged:Y,onDisconnected:Z,onViewPort:H})=>{let[G,Q=""]=(J.getAttribute(z)??"").replace(/\s/g,"").split(";");if(!G)return;let W=()=>{U.lsCaller(G,J,X,Y,Z,H)};if(Q===U.pre){W();return}H({lifecyclesOnDisconnected:[Z],onExitViewCallback:async()=>{},onViewCallback:async({unobserveElement:B,removeOnExitViewCallback:R,removeOnViewCallback:M})=>{M(),R(),B(),W()}})}})};static triggerLifecycle=(z,J,X=!0)=>{let Y=J.cloneNode();if(!(Y instanceof HTMLElement))return;Y.setAttribute(U.namespace,X?z:`${z};${U.pre}`),J.outerHTML=Y.outerHTML};static vorthLifecycle=async(z,J,X,Y,Z,H,G,Q)=>{let W=await U.importLifecycle(z);if(!W)return;let B={element:J,html:X,onAttributeChanged:Y,onDisconnected:Z,onViewPort:H,on:new u(J,Z).on,attr:({on:R,waitForOnViewToRender:M=!0})=>p(K.attributeIndexGenerator(!0),{on:R,isGlobal:!1,waitForOnViewToRender:M},J,!0).attr,select:(R,M)=>p(R,M,J),qFIFO:w.fifo,qUnique:w.unique,importWorker:g,importLib:async(R)=>{let M=await y(R);if(M&&K.isAsync(M))return async(...E)=>await M(B,...E);return(...E)=>M(B,...E)},importData:async(R)=>await U.importData(R,B),$:(R)=>U.$(R,G),lifecycleAttr:m,for_:{data:async(R)=>await U.for({element:J,...R,vorth:B}),of:(R=void 0)=>{return U.of(R,J,Q)}},let_:(R)=>U.let(R,J,Q),derived:(R)=>U.derived(R,J,Q),triggerLifecycle:U.triggerLifecycle};await W(B)};static pathData="";static pathLibs="";static pathLifecycles="";static pathWorkers="";static _;constructor(){if(U._ instanceof U){K.warningSingleton(U);return}U._=this,U.base=new URL("./",import.meta.url).href,U.pathData=`${U.base}data/`,U.pathLibs=`${U.base}libs/`,U.pathLifecycles=`${U.base}lifecycles/`,U.pathWorkers=`${U.base}workers/`,U.assignProperties(),U.assignLifecycle()}}new U;
