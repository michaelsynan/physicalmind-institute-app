import{ak as z,r as D,s as i,F as P,al as A,am as p,e as g,w as o,p as H,o as u,b as s,a,c as v,an as O,ao as $,d as b,t as c,a6 as F,x as G,h as R,i as Y,a8 as J,a9 as K,aa as Q,B as W,k as X,l as Z,m as ee,n as oe,q as se}from"./DOA2QYji.js";import{_ as te}from"./C70Evzbn.js";import{_ as ae}from"./t_f1h6QO.js";import{_ as ne}from"./DlAUqK2U.js";import"./tDQ6inmF.js";import"./DODPDuvB.js";import"./LsYmms5a.js";const le={class:"flex justify-center items-center mb-4 mt-2 mx-4"},re={key:0},ie={key:1},ue={class:"mb-4"},de={class:"mb-4"},ce={class:"mt-4"},me={key:2,class:"mt-4 text-red-500"},fe={__name:"login",setup(_e){const{signIn:I,signOut:pe}=z(),h=D(),n=i(!1),m=i(""),f=i(""),r=i(!1),l=i(""),x=i(!1),y=()=>{x.value=document.body.classList.contains("dark")};P(()=>{y();const t=new MutationObserver(e=>{e.forEach(_=>{_.type==="attributes"&&_.attributeName==="class"&&y()})});t.observe(document.body,{attributes:!0}),A(()=>{t.disconnect()}),h.value&&p("/")});const C=async()=>{n.value=!0,console.log("signUp function called from login.vue"),l.value="";const{error:t}=await se().auth.signUp({email:m.value,password:f.value});t?l.value=t.message:p("/login"),n.value=!1},U=async()=>{n.value=!0,console.log("login function called from login.vue"),l.value="";const{error:t}=await I(m.value,f.value);t?t.message==="Invalid login credentials"?l.value="Your email or password is incorrect. Please try again.":l.value=t.message:p("/"),n.value=!1};return(t,e)=>{const _=R,V=Y,S=J,j=K,w=te,k=ae,B=Q,M=W,N=X,E=Z,L=ee,T=oe,q=H;return u(),g(q,null,{default:o(()=>[s(V,{class:"ion-no-border border-b bg-white"},{default:o(()=>[s(_)]),_:1}),s(T,{class:"ion-padding"},{default:o(()=>[s(L,{class:"ion-justify-content-center"},{default:o(()=>[s(E,{class:"ion-justify-content-center"},{default:o(()=>[s(N,{"size-md":"8","size-lg":"6","size-xs":"12"},{default:o(()=>[s(M,{class:"max-w-lg mx-auto !border-2 p-4"},{default:o(()=>[s(j,{class:"text-center flex flex-col justify-between"},{default:o(()=>[s(S,{class:"flex flex-col justify-center"},{default:o(()=>[a("div",le,[x.value?(u(),v("div",re,e[4]||(e[4]=[a("img",{src:O,class:"max-w-xs w-2/3 mx-auto"},null,-1)]))):(u(),v("div",ie,e[5]||(e[5]=[a("img",{src:$,class:"max-w-xs w-2/3 mx-auto"},null,-1)])))])]),_:1})]),_:1}),s(B,null,{default:o(()=>[a("form",{onSubmit:e[3]||(e[3]=G(d=>r.value?C():U(),["prevent"])),class:"w-full max-w-sm mx-auto"},[a("div",ue,[e[6]||(e[6]=a("label",{for:"email",class:"block text-sm font-medium text-gray-700"},"Email",-1)),s(w,{color:"primary",type:"email",id:"email",placeholder:"Enter your email",modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=d=>m.value=d),required:"",class:"placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},null,8,["modelValue"])]),a("div",de,[e[7]||(e[7]=a("label",{for:"password",class:"block text-sm font-medium text-gray-700"},"Password",-1)),s(w,{color:"primary",variant:"outline",type:"password",id:"password",placeholder:"Enter your password",modelValue:f.value,"onUpdate:modelValue":e[1]||(e[1]=d=>f.value=d),required:"",class:"shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},null,8,["modelValue"])]),r.value?(u(),g(k,{key:1,type:"submit",disabled:n.value,class:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300",color:"primary"},{default:o(()=>[b(c(n.value?"Loading...":"Sign Up"),1)]),_:1},8,["disabled"])):(u(),g(k,{key:0,type:"submit",disabled:n.value,color:"primary",class:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium !text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-300"},{default:o(()=>[b(c(n.value?"Loading...":"Login"),1)]),_:1},8,["disabled"])),a("div",ce,[b(c(r.value?"Already have an account?":"Need an account?")+" ",1),a("span",{onClick:e[2]||(e[2]=d=>r.value=!r.value),class:"text-indigo-600 cursor-pointer"},c(r.value?"Login":"Sign up"),1)]),l.value?(u(),v("div",me,c(l.value),1)):F("",!0)],32)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},Ie=ne(fe,[["__scopeId","data-v-ea8d58e0"]]);export{Ie as default};