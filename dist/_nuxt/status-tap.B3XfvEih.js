import{a3 as r,a4 as i,a5 as c,a6 as d,a7 as l}from"./entry.DKfTwXN6.js";import"./swiper-vue.CWG--DMv.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const w=()=>{const e=window;e.addEventListener("statusTap",()=>{r(()=>{const o=e.innerWidth,s=e.innerHeight,n=document.elementFromPoint(o/2,s/2);if(!n)return;const t=i(n);t&&new Promise(a=>c(t,a)).then(()=>{d(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{w as startStatusTap};
