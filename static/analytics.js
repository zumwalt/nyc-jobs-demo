var elasticAnalytics;!function(){"use strict";var e={d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t={};function n(){const e=function(e){const t=("; "+document.cookie).split("; EA_VID=");if(2===t.length)return t.pop().split(";").shift()}()||([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)})),t=new Date;return t.setHours(23,59,59,999),function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"/";var o="expires="+n.toUTCString();document.cookie=e+"="+t+"; "+o+"; path="+r}("EA_VID",e,t),e}e.d(t,{default:function(){return a}});const r={eventType:(e,t)=>({...t,event_type:e}),pageReferrer:(e,t)=>"pageview"==e&&document.referrer?{...t,referrer:document.referrer}:t,pageUrl:(e,t)=>"pageview"!=e?t:{...t,url:window.location.href},userUuid:(e,t)=>({...t,user_uuid:n()})},o=("data-dsn",document.currentScript.getAttribute("data-dsn"));const i=new class{constructor(e){let{endpointURL:t,dataProviders:n={}}=e;this.endpointURL=t,this.dataProviders={...r,...n}}trackEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=Object.values(this.dataProviders).reduce(((t,n)=>n(e,t)),t),r=JSON.stringify(n),o=`${this.endpointURL}/events`;if(null!=navigator.sendBeacon)navigator.sendBeacon(o,r);else{const e=new XMLHttpRequest;e.open("POST",o,!0),e.setRequestHeader("Content-Type","text/plain"),e.send(r)}}}({endpointURL:o});window.addEventListener("pageshow",(()=>{i.trackEvent("pageview")})),window.addEventListener("hashchange",(()=>{i.trackPageView("pageview")}));var a=i;elasticAnalytics=t.default}();