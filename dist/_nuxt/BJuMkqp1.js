import{ag as z,F as d,M as _,e as m,w as t,p as G,o as c,b as n,a as e,d as p,t as f,y as r,c as P,I as V,f as j,h as H,i as T,a8 as D,ah as F,a9 as M,aa as R,z as S,_ as A,B as E,n as W,ai as g,aj as b}from"./DOA2QYji.js";import{i as $}from"./DSRelh8B.js";const q={id:"container",class:"my-10 max-w-2xl mx-auto"},J=["src"],K={class:"flex flex-row mx-auto gap-2 mt-1.5"},Q=["href"],U=["href"],X={class:"text-base"},Y={key:1,class:"text-center"},to={__name:"[...all]",setup(Z){const s=z();d(()=>{console.log("Route accessed:",s.fullPath),console.log("Params:",s.params),console.log("Current component:",s.path)});const i=_(()=>{const o=s.params.all||[];return o.length>0?o[0]:void 0}),a=_(()=>$.find(o=>o.slug===i.value));return d(()=>{instructorFound.value||console.error("Instructor not found for slug:",i.value)}),(o,l)=>{const h=V,v=j,I=H,x=T,k=D,u=F,y=M,B=R,w=S,C=A,L=E,N=W,O=G;return c(),m(O,null,{default:t(()=>[n(x,{class:"ion-no-border border-b bg-white"},{default:t(()=>[n(I,null,{default:t(()=>[n(v,{slot:"start"},{default:t(()=>[n(h,{defaultHref:"/",text:""})]),_:1})]),_:1})]),_:1}),n(N,null,{default:t(()=>[e("div",q,[a.value?(c(),m(L,{key:0,type:"medium",class:"p-3 relative overflow-hidden"},{default:t(()=>[e("img",{src:a.value.photo?a.value.photo:"/images/default/image.jpg",alt:"Instructor's Photo",class:"mt-2 border border-opacity-50 border-stone-400 w-40 h-40 mx-auto block rounded-full object-cover relative z-10"},null,8,J),n(y,{class:"relative z-10"},{default:t(()=>[n(k,{class:"font-bold"},{default:t(()=>[p(f(a.value.fullName),1)]),_:1}),e("div",K,[e("div",null,[e("a",{href:a.value.website,target:"_blank"},[n(u,{md:"ioniconsGlobeOutline"in o?o.ioniconsGlobeOutline:r(g),ios:"ioniconsGlobeOutline"in o?o.ioniconsGlobeOutline:r(g),slot:"end",class:"text-xl"},null,8,["md","ios"])],8,Q)]),e("div",null,[e("a",{href:a.value.ig,target:"_blank"},[n(u,{md:"ioniconsLogoInstagram"in o?o.ioniconsLogoInstagram:r(b),ios:"ioniconsLogoInstagram"in o?o.ioniconsLogoInstagram:r(b),slot:"end",class:"text-xl"},null,8,["md","ios"])],8,U)])])]),_:1}),n(B,{class:"relative z-10"},{default:t(()=>[e("div",X,f(a.value.bio),1),l[0]||(l[0]=e("div",{class:"my-4"},null,-1))]),_:1}),n(C,{to:`/instructors/videos?instructor=${a.value.slug}`},{default:t(()=>[n(w,{expand:"block",color:"primary",class:"font-bold"},{default:t(()=>l[1]||(l[1]=[p("Watch Videos")])),_:1})]),_:1},8,["to"])]),_:1})):(c(),P("p",Y,"Instructor not found."))])]),_:1})]),_:1})}}};export{to as default};