"use strict";var precacheConfig=[["/assets/api-outlined.svg","25444c516f08743d17d89a3f4d3ebea3"],["/assets/baseline-arrow-back.svg","350767b2639e97a0abe2538b3e573e3e"],["/assets/bx-log-out-circle.svg","e153c918e68bf06d3cafccefa3a0f0b0"],["/assets/dashboard-outlined.svg","499fa97b4c6f8f330bd3f4469a5ac610"],["/assets/document-text-outline.svg","1ed5e577c1c123802cd00d866ab3cee3"],["/assets/earth-outline.svg","8094adca1063767b938141b2f859ad45"],["/assets/ground.svg","0c51495c17e22de040503a1699072022"],["/assets/icon.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["/assets/logo.png","8cea19f63176c318e9d818423389250f"],["/assets/logoBlack.png","a55a6e083003af9e0b7aad0583b3bb15"],["/assets/more-vertical.svg","ecf0e927b1c8376dc8fc7f208ce99d92"],["/assets/outlets.svg","b57a9e02f2232bf8472fd6570b7828a4"],["/assets/outline-account-circle.svg","40007679fc942459e8b1a017dedef495"],["/assets/output.svg","0eeb68e741665b39526c8aa032e5fcef"],["/assets/round-close.svg","b52cebbc14d2ced5adf8d7846f83eeb1"],["/assets/round-menu.svg","e70dcd67367449beebd541ccf5870b1f"],["/assets/settings.svg","37ec971a07d25e4e4446779c796a35bf"],["/assets/user-outlined.svg","0eb71a7d902569ffbcf4b47ae8b0c99a"],["/bundle.f4f46.js","0c36556bbba4aecc95121ddc98015003"],["/favicon.ico","94eae66bebbd6bbfe48a669f245048ac"],["/index.html","2377eb2fe4e7ff86854eee21dc4e1339"],["/manifest.json","310a916537fc6f66deb88310b13a2759"],["/style.2069c.css","3881605e5dd867242d97e9d659309b2d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,s){var a=new URL(e);return s&&a.pathname.match(s)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],s=new URL(t,self.location),a=createCacheKey(s,hashParamName,n,!1);return[s.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var s=new Request(n,{credentials:"same-origin"});return fetch(s).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});