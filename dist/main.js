!function(){"use strict";function e(e,n){const l=new t(e);let o;if(n){let t=-1;o=o=>{if(!n(e,o)){const n=a.time;if(n===t)throw new Error(`Conflicting value update: ${o} is not the same as ${e}`);t=n,e=o,l.next(o)}}}else o=l.next.bind(l);return[l.current.bind(l),o]}function n(e,n){const t=g(),l=d,o=null===f;t.owner=h,h=t,d=t,n=o?function(e,n){f=a,a.changes.reset(),a.updates.reset();try{return e(n)}finally{h=d=f=null}}(e,n):e(n),h=t.owner,d=l,C(t),w(t,e,n,!1),o&&function(e,n){if(a.changes.count>0||a.updates.count>0){a.time++;try{m(a)}finally{f=null,h=e,d=n}}}(h,l)}class t{constructor(e){this.value=e,this.pending=r,this.log=null}current(){return null!==d&&function(e){null===e.log&&(e.log={node1:null,node1slot:0,nodes:null,nodeslots:null});!function(e){let n,t=d,l=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=l,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[l],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(l));null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}(e.log)}(this),this.value}next(e){if(null!==f)if(this.pending!==r){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,a.changes.add(this);else null!==this.log?(this.pending=e,a.changes.add(this),function(){let e=h;a.updates.reset(),a.time++;try{m(a)}finally{f=d=null,h=e}}()):this.value=e;return e}}function l(){return{fn:null,age:-1,state:s,source1:null,source1slot:0,sources:null,sourceslots:null,owner:null,owned:null,value:void 0,context:void 0,cleanups:null,afters:null}}class o{constructor(){this.items=[],this.count=0}reset(){this.count=0}add(e){this.items[this.count++]=e}run(e){let n=this.items;for(let t=0;t<this.count;t++)e(n[t]),n[t]=null;this.count=0}}let r={},s=0,u=1,i=2,c=l(),a={time:0,changes:new o,updates:new o,disposes:new o},f=null,d=null,h=null,p=null;function g(){let e=p;return null===e?e=l():p=null,e}function w(e,n,t,l){let o,r=l||null===h||h===c?null:h,s=!e.noRecycle&&null===e.source1&&(null===e.owned&&null===e.cleanups||null!==r);if(s){if(p=e,e.owner=null,null!==r){if(null!==e.owned){if(null===r.owned)r.owned=e.owned;else for(o=0;o<e.owned.length;o++)r.owned.push(e.owned[o]);e.owned=null}if(null!==e.cleanups){if(null===r.cleanups)r.cleanups=e.cleanups;else for(o=0;o<e.cleanups.length;o++)r.cleanups.push(e.cleanups[o]);e.cleanups=null}}}else e.fn=n,e.value=t,e.age=a.time,null!==r&&(null===r.owned?r.owned=[e]:r.owned.push(e));return s}function m(e){let n=f,t=0;for(f=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(t>0&&e.time++,e.changes.run(y),e.updates.run(x),e.disposes.run(T),t++>1e5)throw new Error("Runaway clock detected");f=n}function y(e){e.value=e.pending,e.pending=r,e.log&&function(e){let n=e.node1,t=e.nodes;null!==n&&v(n);if(null!==t)for(let e=0,n=t.length;e<n;e++)v(t[e])}(e.log)}function v(e){let n=a.time;e.age<n&&(e.age=n,e.state=u,a.updates.add(e),null!==e.owned&&function e(n){for(let t=0;t<n.length;t++){let l=n[t];l.age=a.time,l.state=s,null!==l.owned&&e(l.owned)}}(e.owned))}function x(e){if(e.state===u){let n=h,t=d;h=d=e,e.state=i,b(e,!1),e.value=e.fn(e.value),e.state=s,C(e),h=n,d=t}}function C(e){let n=e.afters;null!==n&&(Promise.resolve().then(()=>{for(let e=0;e<n.length;e++)n[e]()}),e.afters=null)}function b(e,n){let t,l,o=e.source1,r=e.sources,s=e.sourceslots,u=e.cleanups,i=e.owned;if(null!==u){for(t=0;t<u.length;t++)u[t](n);e.cleanups=null}if(null!==i){for(t=0;t<i.length;t++)T(i[t]);e.owned=null}if(null!==o&&(A(o,e.source1slot),e.source1=null),null!==r)for(t=0,l=r.length;t<l;t++)A(r.pop(),s.pop())}function A(e,n){let t,l,o=e.nodes,r=e.nodeslots;-1===n?e.node1=null:(t=o.pop(),l=r.pop(),n!==o.length&&(o[n]=t,r[n]=l,-1===l?t.source1slot=n:t.sourceslots[l]=n))}function T(e){e.fn=null,e.owner=null,e.afters=null,b(e,!0)}function k(e){const n=document.createElement("template");if(n.innerHTML=e,n.innerHTML!==e)throw new Error(`Template html does not match input:\n${n.innerHTML}\n${e}`);return n}function N(e,t,l,o){if(void 0===l||o||(o=[]),"function"==typeof t)n((n=o)=>E(e,t(),n,l));else{if(!Array.isArray(t)||!function e(n){for(let t=0,l=n.length;t<l;t++){const l=n[t];if(Array.isArray(l)&&e(l)||"function"==typeof l)return!0}return!1}(t))return E(e,t,o,l);n((n=o)=>E(e,t,n,l))}}function B(e,n,t){for(let l=0,o=n.length;l<o;l++)e.insertBefore(n[l],t)}function M(e,n,t,l){if(void 0===t)return e.textContent="";const o=l||document.createTextNode("");if(n.length){o!==n[0]&&e.replaceChild(o,n[0]);for(let t=n.length-1;t>0;t--)e.removeChild(n[t])}else e.insertBefore(o,t);return[o]}function E(e,t,l,o){if(t===l)return l;const r=typeof t,s=void 0!==o;if(e=s&&l[0]&&l[0].parentNode||e,"string"===r||"number"===r)if("number"===r&&(t=t.toString()),s){let n=l[0];n&&3===n.nodeType?n.data=t:n=document.createTextNode(t),l=M(e,l,o,n)}else l=""!==l&&"string"==typeof l?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===r)l=M(e,l,o);else if("function"===r)n(()=>l=E(e,t(),l,o));else if(Array.isArray(t)){const n=function e(n,t){for(let l=0,o=t.length;l<o;l++){let o,r=t[l];if(r instanceof Node)n.push(r);else if(null==r||!0===r||!1===r);else if(Array.isArray(r))e(n,r);else if("string"==(o=typeof r))n.push(document.createTextNode(r));else if("function"===o){const t=r();e(n,Array.isArray(t)?t:[t])}else n.push(document.createTextNode(r.toString()))}return n}([],t);if(0===n.length){if(l=M(e,l,o),s)return l}else Array.isArray(l)?0===l.length?B(e,n,o):H(e,l,n):null==l||""===l?B(e,n):H(e,s&&l||[e.firstChild],n);l=n}else if(t instanceof Node){if(Array.isArray(l)){if(s)return l=M(e,l,o,t);M(e,l,null,t)}else null==l||""===l?e.appendChild(t):e.replaceChild(t,e.firstChild);l=t}return l}var I=-1;function H(e,n,t){var l,o=t.length,r=0,s=n.length-1,u=0,i=o-1,c=n[r],a=t[u],f=n[s],d=t[i],h=f.nextSibling,p=!0;e:for(;p;){for(p=!1;a===c;){if(r++,++u>i||r>s)break e;a=t[u],c=n[r]}for(;d===f;){if(h=f,s--,u>--i||r>s)break e;d=t[i],f=n[s]}for(;a===f;){if(p=!0,e.insertBefore(f,c),s--,++u>i||r>s)break e;a=t[u],f=n[s]}for(;d===c;){if(p=!0,null===h?e.appendChild(c):e.insertBefore(c,h),h=c,r++,u>--i||r>s)break e;d=t[i],c=n[r]}}if(u>i){for(;r<=s;)e.removeChild(n[s]),s--;return}if(r>s){for(;u<=i;)e.insertBefore(t[u],h),u++;return}const g=new Array(i-u+1);for(let e=u;e<=i;e++)g[e]=I;const w=new Map;for(let e=u;e<=i;e++)w.set(t[e],e);let m=u+t.length-1-i,y=[];for(let e=r;e<=s;e++)w.has(n[e])?(g[w.get(n[e])]=e,m++):y.push(e);if(0!==m){var v,x=function(e,n){let t=[],l=[],o=-1,r=new Array(e.length);for(let s=n,u=e.length;s<u;s++){let n=e[s];if(n<0)continue;let u=S(t,n);-1!==u&&(r[s]=l[u]),u===o?(t[++o]=n,l[o]=s):n<t[u+1]&&(t[u+1]=n,l[u+1]=s)}for(let e=l[o];o>=0;e=r[e],o--)t[o]=e;return t}(g,u),C=[],b=n[r],A=x.length-1;for(let e=r;e<=s;e++)C[e]=b,b=b.nextSibling;for(let n=0;n<y.length;n++)e.removeChild(C[y[n]]);for(let n=i;n>=u;n--)x[A]===n?(h=C[g[x[A]]],A--):(v=g[n]===I?t[n]:C[g[n]],e.insertBefore(v,h),h=v)}else{if(c!==e.firstChild||f!==e.lastChild){for(l=r;l<=s;l++)e.removeChild(n[l]);for(;u<=i;)e.insertBefore(t[u],h),u++;return}for(e.textContent="";u<=i;)e.appendChild(t[u]),u++}}function S(e,n){var t=-1,l=e.length;if(l>0&&e[l-1]<=n)return l-1;for(;l-t>1;){var o=Math.floor((t+l)/2);e[o]>n?l=o:t=o}return t}const $=k('<div class="container"></div>'),q=k('<div class="dot"></div>'),F=()=>{const[t,l]=e(0),[o,r]=e(0),s=function(t,l,o){null===h&&console.warn("computations created without a root or parent will never be disposed");const[r,s]=e(l,o);return n(e=>(s(e=t(e)),e),l),r}(()=>{const e=t()/1e3%10;return 1+(e>5?10-e:e)/10}),u=Date.now(),i=setInterval(()=>r(o()%10+1),1e3);let c;const a=()=>{l(Date.now()-u),c=requestAnimationFrame(a)};return c=requestAnimationFrame(a),function(e){null===h?console.warn("cleanups created without a root or parent will never be run"):null===h.cleanups?h.cleanups=[e]:h.cleanups.push(e)}(()=>{clearInterval(i),cancelAnimationFrame(c)}),function(){const e=$.content.firstChild.cloneNode(!0);return n(()=>Object.assign(e.style,{transform:"scaleX("+s()/2.1+") scaleY(0.7) translateZ(0.1px)"})),N(e,L({x:0,y:0,s:1e3,seconds:o})),e}()},L=({x:t,y:l,s:o,seconds:r})=>o<=25?R({x:t-12.5,y:l-12.5,s:25,text:r}):(125===(o/=2)&&(r=(t=>{let l,o;const[r,s]=e(t()),u={current:null},i=()=>{cancelIdleCallback(l),clearTimeout(o),o=null,s(u.current)};return n(()=>{u.current=t(),cancelIdleCallback(l),o||(o=setTimeout(i,100*~~(4*Math.random()+1))),l=requestIdleCallback(i)}),r})(r)),[L({x:t,y:l-o/2,s:o,seconds:r}),L({x:t-o,y:l+o/2,s:o,seconds:r}),L({x:t+o,y:l+o/2,s:o,seconds:r})]),R=({x:t,y:l,s:o,text:r})=>{const[s,u]=e(!1),i=()=>u(!0),c=()=>u(!1);return function(){const e=q.content.firstChild.cloneNode(!0);return e.onmouseleave=c,e.onmouseenter=i,n(()=>Object.assign(e.style,{width:o+"px",height:o+"px",left:t+"px",top:l+"px",borderRadius:o/2+"px",lineHeight:o+"px",background:s()?"#ff0":"#61dafb"})),N(e,()=>s()?"**"+r()+"**":r()),e}()};!function(e,n){let t,l=0===e.length?null:function(){null===o||(null!==f?a.disposes.add(o):T(o))},o=null===l?c:g(),r=d,s=n||h;o!==s&&(o.owner=s),h=o;try{d=null,t=null===l?e():e(l)}finally{d=r,h=o.owner}C(o),null!==l&&w(o,null,void 0,!0)&&(o=null)}(()=>document.body.appendChild(F()))}();
